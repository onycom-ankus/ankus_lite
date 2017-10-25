/**
 * This file is part of ankus.
 *
 * ankus is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * ankus is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with ankus.  If not, see <http://www.gnu.org/licenses/>.
 */
package com.ankus.web.designer;

import com.google.common.base.Joiner;
import org.codehaus.jackson.map.ObjectMapper;
import com.ankus.core.exception.WorkflowException;
import com.ankus.model.opengraph.Opengraph;
import com.ankus.model.workflow.*;
import com.ankus.util.JaxbUtils;
import com.ankus.util.ResourceUtils;
import com.ankus.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.util.*;

import static org.apache.commons.lang.StringUtils.splitPreserveAllTokens;
import static com.ankus.util.StringUtils.isEmpty;
import static org.springframework.util.StringUtils.countOccurrencesOf;

/**
 * OpenGraph XML의 Marshal, Unmarshal 기능을 수행하는 Helper.
 *
 * @author Edward KIM
 * @since 0.2
 */
@Component
public class OpenGraphMarshaller {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(OpenGraphMarshaller.class);

    /**
     * OpenGraph XML의 JAXB Package.
     */
    public static String JAXB_PACKAGE = "com.ankus.model.opengraph";

    /**
     * Jackson JSON Object Mapper
     */
    private static ObjectMapper objectMapper = new ObjectMapper();

    /**
     * OpenGraph XML을 Workflow XML로 변환한다.
     *
     * @param xml OpenGraph XML
     * @return Workflow
     */
    public Workflow unmarshal(String xml) {
        try {
            Opengraph opengraph = (Opengraph) JaxbUtils.unmarshal(JAXB_PACKAGE, xml);
            List<Opengraph.Cell> cells = opengraph.getCell();
            Workflow workflow = new Workflow();
            Map openGraphCustomData = bind(opengraph, workflow);

            // Cell ID와 Cell의 매핑 정보를 구성한다.
            Map<String, Opengraph.Cell> cellMap = new HashMap<String, Opengraph.Cell>();
            for (Opengraph.Cell cell : cells) {
                cellMap.put(cell.getId(), cell);
            }

            // Node, Start, End를 구성한다.
            for (Opengraph.Cell cell : cells) {
                if (!isEmpty(cell.getData())) {
                    Map actionParams = objectMapper.readValue(unescape(cell.getData()), Map.class);
                    Map metadata = (Map) actionParams.get("metadata");
                    Map properties = (Map) actionParams.get("properties");
                    Map filteredProperties = (Map) actionParams.get("filteredProperties");
                    if ("START".equals(metadata.get("type"))) {
                        bindStart(cell, workflow);
                    } else if ("END".equals(metadata.get("type"))) {
                        bindEnd(cell, workflow);
                    } else if ("ETL".equals(metadata.get("type")) || "HADOOP".equals(metadata.get("type")) || "ALG".equals(metadata.get("type"))) {
                        ActionType actionType = bindAction(cell, cellMap, metadata, workflow);
                        if ("HADOOP_HIVE".equals(metadata.get("identifier"))) {
                            bindHive((String) openGraphCustomData.get("cluster"), metadata, properties, actionType);
                        } else if ("HADOOP_PIG".equals(metadata.get("identifier"))) {
                            bindPig((String) openGraphCustomData.get("cluster"), metadata, properties, actionType);
                        } else if ("HADOOP_MR".equals(metadata.get("identifier"))) {
                            bindMapReduce(cell, cellMap, (String) openGraphCustomData.get("cluster"), metadata, properties, actionType);
                        } else if ("HADOOP_JAVA".equals(metadata.get("identifier"))) {
                            bindJava(cell, cellMap, (String) openGraphCustomData.get("cluster"), metadata, properties, actionType);
                        }
                    } else if ("MAPREDUCE".equals(metadata.get("jobType"))) {
                        ActionType actionType = bindAction(cell, cellMap, metadata, workflow);
                        new MapReduceBinder(cell, cellMap, metadata, properties, filteredProperties, actionType).bind();
                    } else if ("OTHERS".equals(metadata.get("type"))) {
                        ActionType actionType = bindAction(cell, cellMap, metadata, workflow);
                        if ("HADOOP_SHELL".equals(metadata.get("identifier"))) {
                            new ShellBinder(cell, cellMap, metadata, properties, actionType).bind();
                        } else if ("HADOOP_PYTHON".equals(metadata.get("identifier"))) {
                            new ShellBinder(cell, cellMap, metadata, properties, actionType).bind();
                        }
                    }
                }
            }
            return workflow;
        } catch (Exception e) {
            throw new WorkflowException("Cannot unmarshal xml of OpenGraph. Invalid XML.", e);
        }
    }

    /**
     * Action을 바인딩한다.
     *
     * @param cell     OpenGraph Cell 정보
     * @param cellMap  Cell과 Cell ID 간 매핑 정보
     * @param metadata Cell의 메타데이터
     * @param workflow 워크플로우
     * @return Action 노드
     * @throws java.io.IOException JSON을 파싱할 수 없는 경우
     */

    public ActionType bindAction(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap, Map metadata, Workflow workflow) throws IOException {
        String[] nextNodes = splitPreserveAllTokens(cell.getTo(), ",");
        List<String> nexts = new ArrayList<String>();
        for (String nextNode : nextNodes) {
            Opengraph.Cell c = cellMap.get(nextNode);
            Map metadataMap = getMetadataMap(c);
            String type = (String) metadataMap.get("type");
            if (isEmpty(type) || "IN".equals(type) || "OUT".equals(type)) continue;
            nexts.add(c.getId());
        }

        ActionType action = new ActionType();
        action.setName(cell.getId());
        action.setDescription((String) metadata.get("name"));
        action.setTo(Joiner.on(",").join(nexts));
        workflow.getAction().add(action);
        return action;
    }

    /**
     * 입출력 경로를 바인딩한다.
     *
     * @param cell       OpenGraph Cell
     * @param cellMap    Cell ID와 Cell의 매핑 정보
     * @param properties Cell의 속성
     * @param actionType 액션
     * @throws java.io.IOException JSON을 파싱할 수 없는 경우
     */

    public void bindMapReduceInOut(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap, Map properties, ActionType actionType) throws IOException {
        // 이전 노드의 입력 경로를 설정한다.
        String[] previousNodes = splitPreserveAllTokens(cell.getFrom(), ",");
        List<String> inPaths = new LinkedList<String>();
        List<String> inQualifiers = new LinkedList<String>();
        List<String> inDelimiterValue = new LinkedList<String>();
        List<String> inColumnNames = new LinkedList<String>();
        List<String> inColumnTypes = new LinkedList<String>();

        Map metadata = getMetadataMap(cell);
        boolean isCheckColumns = (Boolean) metadata.get("isCheckColumns");

        for (String previous : previousNodes) {
            Opengraph.Cell c = cellMap.get(previous);
            Map metadataMap = getMetadataMap(c);
            Map propertiesMap = getPropertiesMap(c);
            String type = (String) metadataMap.get("type");
            boolean isInput = ((String) metadataMap.get("identifier")).endsWith("HDFS_IN");
            if ("IN".equals(type) && isInput) {
                String inputPathQualifiers = (String) propertiesMap.get("inputPathQualifiers");
                if (!StringUtils.isEmpty(inputPathQualifiers)) {
                    inQualifiers.add(inputPathQualifiers);
                } else {
                    inQualifiers.add("");
                }

                inPaths.add((String) propertiesMap.get("inputPaths"));
                inColumnNames.add((String) propertiesMap.get("columnNames"));
                inColumnTypes.add((String) propertiesMap.get("columnTypes"));
                inDelimiterValue.add(getDelimiter((String) propertiesMap.get("delimiterType"), (String) propertiesMap.get("delimiterValue")));
            } else if (!StringUtils.isEmpty((String) metadataMap.get("identifier"))
                    && "HADOOP_PIG".equals(((String) metadataMap.get("identifier")))) {
                inPaths.add((String) propertiesMap.get("outputPath"));
                inColumnNames.add((String) propertiesMap.get("columnNames"));
                inColumnTypes.add((String) propertiesMap.get("columnTypes"));
                inDelimiterValue.add(getDelimiter((String) propertiesMap.get("delimiterType"), (String) propertiesMap.get("delimiterValue")));
                String inputPathQualifiers = (String) propertiesMap.get("outputPathQualifier");
                if (!StringUtils.isEmpty(inputPathQualifiers)) {
                    inQualifiers.add(inputPathQualifiers);
                } else {
                    inQualifiers.add("");
                }
            }
        }

        Mapreduce mapreduce = actionType.getMapreduce().get(0);
        if (inPaths.size() > 0) {
            mapreduce.setInput(
                    bindInputPath(
                            Joiner.on(",").join(inPaths),
                            Joiner.on(",").join(inQualifiers),
                            Joiner.on("|").join(inColumnNames),
                            Joiner.on("|").join(inColumnTypes),
                            Joiner.on("~").join(inDelimiterValue)
                    ));
        }

        // 입력 파일의 구조가 동일하고 입력 파일이 하나 이상이라면 하나의 파라미터를 구성한다.
        if ((isCheckColumns && inPaths.size() > 1) || inPaths.size() == 1) {
            mapreduce.getVariables().getVariable().add(bindAVariable("columnSize", "" + splitPreserveAllTokens(inColumnNames.get(0), ",").length));
            mapreduce.getVariables().getVariable().add(bindAVariable("columnNames", inColumnNames.get(0)));
            mapreduce.getVariables().getVariable().add(bindAVariable("columnTypes", inColumnTypes.get(0)));
            mapreduce.getVariables().getVariable().add(bindAVariable("inputDelimiter", inDelimiterValue.get(0)));
        }

        // 입력 경로가 없는 경우 이전 노드가 존재하는 경우로써 이 경우 이전 노드의 값을 사용한다.
        if (inPaths.size() == 0) {
            mapreduce.getVariables().getVariable().add(bindAVariable("columnSize", "" + splitPreserveAllTokens((String) properties.get("prevColumnNames"), ",").length));
            mapreduce.getVariables().getVariable().add(bindAVariable("columnNames", (String) properties.get("prevColumnNames")));
            mapreduce.getVariables().getVariable().add(bindAVariable("columnTypes", (String) properties.get("prevColumnTypes")));
            mapreduce.getVariables().getVariable().add(bindAVariable("inputDelimiter", getDelimiter((String) properties.get("prevDelimiterValue"), (String) properties.get("prevDelimiterValue"))));
        }

        // 다음 노드의 출력 경로를 설정한다.
        String[] nextNodes = splitPreserveAllTokens(cell.getTo(), ",");
        for (String nextNode : nextNodes) {
            Opengraph.Cell c = cellMap.get(nextNode);
            Map metadataMap = getMetadataMap(c);
            Map propertiesMap = getPropertiesMap(c);
            String type = (String) metadataMap.get("type");
            boolean isOutput = ((String) metadataMap.get("identifier")).endsWith("HDFS_OUT");
            if ("OUT".equals(type) && isOutput) {
                String columnNames = (String) propertiesMap.get("columnNames");
                Output output = bindOutputPath((String) propertiesMap.get("outputPath"), (String) propertiesMap.get("outputPathQualifier"));
                output.getOutputPath().setColumnNames(columnNames);
                output.getOutputPath().setColumnSize(splitPreserveAllTokens(columnNames, ",").length + "");
                output.getOutputPath().setColumnTypes((String) propertiesMap.get("columnTypes"));
                output.getOutputPath().setDelimiter(getDelimiter((String) propertiesMap.get("delimiterType"), (String) propertiesMap.get("delimiterValue")));

                mapreduce.getVariables().getVariable().add(bindAVariable("outputDelimiter", getDelimiter((String) propertiesMap.get("delimiterType"), (String) propertiesMap.get("delimiterValue"))));
                mapreduce.setOutput(output);
                break;
            }
        }

        // 중간 노드의 경우 출력이 없을 수 있으므로 이 경우 메타를 설정할 필요가 있다.
        if (mapreduce.getOutput() == null) {
            mapreduce.getVariables().getVariable().add(bindAVariable("outputDelimiter", getDelimiter((String) properties.get("delimiterType"), (String) properties.get("delimiterValue"))));
        }
    }

    /**
     * 컬럼 구분자를 반환한다.
     *
     * @param delimiterType  UI에서 넘어온 컬럼 구분자 유형
     * @param delimiterValue UI에서 넘어온 컬럼 구분자
     * @return MapReduce로 전달할 컬럼 구분자.
     */
    private String getDelimiter(String delimiterType, String delimiterValue) {
        switch (delimiterType) {
            case "DEFAULT":
                return ",";
            case "TAB":
                return "\\t";
            case "SPACE":
                return "\\s";
        }
        return delimiterValue;
    }

    /**
     * 입출력 경로를 바인딩한다.
     *
     * @param cell       OpenGraph Cell
     * @param cellMap    Cell ID와 Cell의 매핑 정보
     * @param actionType 액션
     * @throws java.io.IOException JSON을 파싱할 수 없는 경우
     */
    public void bindPigInOut(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap, ActionType actionType) throws IOException {
        // 이전 노드의 입력 경로를 설정한다.
        String[] previousNodes = splitPreserveAllTokens(cell.getFrom(), ",");
        List<String> inPaths = new ArrayList<String>();
        List<String> inQualifiers = new ArrayList<String>();
        for (String previous : previousNodes) {
            Opengraph.Cell c = cellMap.get(previous);
            Map metadataMap = getMetadataMap(c);
            Map propertiesMap = getPropertiesMap(c);
            String type = (String) metadataMap.get("type");
            boolean isInput = ((String) metadataMap.get("identifier")).endsWith("HDFS_IN");
            if ("IN".equals(type) && isInput) {
                String inputPathQualifiers = (String) propertiesMap.get("inputPathQualifiers");
                String inputPaths = (String) propertiesMap.get("inputPaths");

                if (!StringUtils.isEmpty(inputPathQualifiers)) inQualifiers.add(inputPathQualifiers);
                inPaths.add(inputPaths);
            }
        }

        Pig pig = actionType.getPig().get(0);
        if (inPaths.size() > 0) {
            // FIXME 하나 이상의 경로를 지원해야 함.
            this.bindVariables(pig.getVariables(), "INPUT", Joiner.on(",").join(inPaths));
        }

        // 다음 노드의 출력 경로를 설정한다.
        String[] nextNodes = splitPreserveAllTokens(cell.getTo(), ",");
        for (String nextNode : nextNodes) {
            Opengraph.Cell c = cellMap.get(nextNode);
            Map metadataMap = getMetadataMap(c);
            Map propertiesMap = getPropertiesMap(c);
            String type = (String) metadataMap.get("type");
            boolean isOutput = ((String) metadataMap.get("identifier")).endsWith("HDFS_OUT");
            if ("OUT".equals(type) && isOutput) {
                String outputPath = (String) propertiesMap.get("outputPath");
                this.bindVariables(pig.getVariables(), "OUTPUT", outputPath);
                break;
            }
        }
    }

    /**
     * 입력 경로를 바인딩한다.
     *
     * @param inputPaths  Comma Separated Input Paths
     * @param qualifier   Qualifiers of Comma Separated Input Paths
     * @param columnNames 입력 파일의 컬렴명
     * @param columnTypes 입력 파일의 컬럼의 자료형
     * @param delimiter   입력 파일의 구분자
     * @return 입력 경로
     */
    private Input bindInputPath(String inputPaths, String qualifier, String columnNames, String columnTypes, String delimiter) {
        Input input = new Input();
        input.setInputPaths(new InputPaths()); // TODO excludeOnNotExist 설정 필요
        String[] inPath = splitPreserveAllTokens(inputPaths, ",");
        String[] qualifiers = splitPreserveAllTokens(qualifier, ",");
        String[] delimiters = splitPreserveAllTokens(delimiter, "~");
        String[] names = splitPreserveAllTokens(columnNames, "|");
        String[] types = splitPreserveAllTokens(columnTypes, "|");
        for (int i = 0; i < inPath.length; i++) {
            InputPath in = new InputPath();
            in.setQualifier(qualifiers[i]);
            in.setValue(inPath[i]);
            in.setColumnNames(names[i]);
            in.setColumnSize(splitPreserveAllTokens(names[i], ",").length + "");
            in.setColumnTypes(types[i]);
            in.setDelimiter(delimiters[i]);
            input.getInputPaths().getInputPath().add(in);
        }
        return input;
    }

    /**
     * 출력 경로를 바인딩한다.
     *
     * @param outputPath 출력 경로
     * @param qualifier  식별자
     * @return 출력 경로
     */
    private Output bindOutputPath(String outputPath, String qualifier) {
        Output output = new Output();
        OutputPath out = new OutputPath();
        if (!StringUtils.isEmpty(qualifier)) out.setQualifier(qualifier);
        out.setValue(outputPath);
        out.setDeleteOnExist(true); // TODO deleteOnExist 설정 필요
        output.setOutputPath(out);
        return output;
    }

    /**
     * OpenGraph의 Cell에 포함되어 있는 메타데이터를 반환한다.
     *
     * @param cell OpenGraph Cell
     * @return 메타데이터 맵
     * @throws java.io.IOException JSON을 파싱할 수 없는 경우
     */
    private Map getMetadataMap(Opengraph.Cell cell) throws IOException {
        String mdata = unescape(cell.getData());
        Map actionParams = objectMapper.readValue(mdata, Map.class);
        return (Map) actionParams.get("metadata");
    }

    /**
     * OpenGraph의 Cell에 포함되어 있는 프로퍼티를 반환한다.
     *
     * @param cell OpenGraph Cell
     * @return 프로퍼티 맵
     * @throws java.io.IOException JSON을 파싱할 수 없는 경우
     */
    private Map getPropertiesMap(Opengraph.Cell cell) throws IOException {
        String mdata = unescape(cell.getData());
        Map actionParams = objectMapper.readValue(mdata, Map.class);
        return (Map) actionParams.get("properties");
    }

    /**
     * MapReduce 정보를 바인딩한다.
     *
     * @param cell        OpenGraph Cell
     * @param cellMap     Cell ID와 Cell의 매핑 정보
     * @param clusterName MapReduce가 동작하는 Hadoop Cluster 명
     * @param metadata    메타데이터 맵
     * @param properties  프로퍼티 맵
     * @param actionType  액션
     */
    public void bindMapReduce(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap, String clusterName, Map metadata, Map properties, ActionType actionType) throws IOException {
        Mapreduce mapreduce = new Mapreduce();
        mapreduce.setVariables(new Variables());
        mapreduce.setConfiguration(new Configuration());
        actionType.getMapreduce().add(mapreduce);

        MRBinder binder = new MRBinder();
        binder.bindClassName(metadata, properties, mapreduce);
        binder.bindClasspaths(metadata, properties, mapreduce);
        binder.bindHadoopKeyValue(properties, mapreduce);
        binder.bindDependency(properties, mapreduce);
        binder.bindCommandLines(properties, mapreduce);

        binder.cleanupMapReduce(properties);
        bindVariables(properties, mapreduce.getVariables());
    }

    /**
     * Java 정보를 바인딩한다.
     *
     * @param cell        OpenGraph Cell
     * @param cellMap     Cell ID와 Cell의 매핑 정보
     * @param clusterName MapReduce가 동작하는 Hadoop Cluster 명
     * @param metadata    메타데이터 맵
     * @param properties  프로퍼티 맵
     * @param actionType  액션
     */
    public void bindJava(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap, String clusterName, Map metadata, Map properties, ActionType actionType) throws IOException {
        Java java = new Java();
        java.setArgs(new Args());
        actionType.getJava().add(java);

        JavaBinder binder = new JavaBinder();
        binder.bindClassName(metadata, properties, java);
        binder.bindClasspaths(metadata, properties, java);
        binder.bindDependency(properties, java);
        binder.bindVariables(properties, java.getArgs());
        binder.cleanupMapReduce(properties);
    }

    /**
     * Pig 정보를 바인딩한다.
     *
     * @param clusterName Pig가 동작하는 Hadoop Cluster 명
     * @param metadata    메타데이터 맵
     * @param properties  프로퍼티 맵
     * @param actionType  액션
     */
    public void bindPig(String clusterName, Map metadata, Map properties, ActionType actionType) {
        Pig pig = new Pig();
        pig.setVariables(new Variables());
        actionType.getPig().add(pig);
        if (!isEmpty(clusterName)) {
            ClusterName cn = new ClusterName();
            cn.setValue(clusterName.trim());
            pig.setClusterName(cn);
        }
        pig.setScript("" + properties.get("script"));
        cleanupPig(properties);
        bindVariables(properties, pig.getVariables());
    }

    /**
     * Hive 정보를 바인딩한다.
     *
     * @param clusterName Hive가 동작하는 Hadoop Cluster 명
     * @param metadata    메타데이터 맵
     * @param properties  프로퍼티 맵
     * @param actionType  액션
     */
    public void bindHive(String clusterName, Map metadata, Map properties, ActionType actionType) {
        Hive hive = new Hive();
        hive.setVariables(new Variables());
        actionType.getHive().add(hive);

        if (!isEmpty(clusterName)) {
            ClusterName cn = new ClusterName();
            cn.setValue(clusterName.trim());
            hive.setClusterName(cn);
        }

        hive.setScript("" + properties.get("script"));
        cleanupHive(properties);
        bindVariables(properties, hive.getVariables());
    }

    /**
     * MapReduce Binder.
     */
    class MRBinder {

        /**
         * MapReduce Driver를 바인딩한다.
         *
         * @param metadata   OpenGraph Cell의 메타데이터
         * @param properties OpenGraph Cell의 프로퍼티
         * @param mapreduce  MapReduce
         */

        public void bindClassName(Map metadata, Map properties, Mapreduce mapreduce) {
            String className = (String) metadata.get("className");
            if (!isEmpty(className)) {
                ClassName cn = new ClassName();
                cn.setValue(className.trim());
                mapreduce.setClassName(cn);
            } else if (!isEmpty((String) properties.get("driver"))) {
                String driver = (String) properties.get("driver");
                ClassName cn = new ClassName();
                cn.setValue(driver.trim());
                mapreduce.setClassName(cn);
            }
        }

        /**
         * Classpaths를 바인딩한다.
         *
         * @param metadata   OpenGraph Cell의 메타데이터
         * @param properties OpenGraph Cell의 프로퍼티
         * @param mapreduce  MapReduce
         */
        public void bindClasspaths(Map metadata, Map properties, Mapreduce mapreduce) {
            String classpaths = (String) properties.get("path");
            if (!isEmpty(classpaths)) {
                // libjars 바인딩
                mapreduce.setClasspaths(bindClasspaths(classpaths));
                properties.remove("path");
            }

            if (!isEmpty((String) properties.get("jar"))) {
                // Driver Jar 바인딩
                Jar jar = new Jar();
                String jarUrl = (String) properties.get("jar");
                jar.setValue(jarUrl.trim());
                mapreduce.setJar(jar);
            }
        }

        /**
         * Comma Separated Classpath 리스트를 Classpath로 구성한다.
         *
         * @param classpathsString Comma Separated Classpath 리스트
         * @return Classpath
         */
        public Classpaths bindClasspaths(String classpathsString) {
            Classpaths cpths = new Classpaths();
            List<Classpath> classpath = cpths.getClasspath();
            String[] classpaths = splitPreserveAllTokens(classpathsString, ",");
            for (String cpath : classpaths) {
                Classpath c = new Classpath();
                c.setValue(cpath);
                classpath.add(c);
            }
            return cpths;
        }

        /**
         * MapReduce 실행에 필요한 Dependency를 바인딩한다.
         *
         * @param properties OpenGraph Cell의 프로퍼티
         * @param mapreduce  MapReduce
         */
        public void bindDependency(Map properties, Mapreduce mapreduce) {
            String groupIdValue = (String) properties.get("groupId");
            String artifactIdValue = (String) properties.get("artifactId");
            String versionValue = (String) properties.get("version");

            if (!isEmpty(groupIdValue) && !isEmpty(artifactIdValue) && !isEmpty(versionValue)) {
                bindMapReduceDependency(groupIdValue.trim(), artifactIdValue.trim(), versionValue.trim(), mapreduce);
            }
        }

        /**
         * MapReduce 동작에 필요한 변수를 바인딩한다.
         *
         * @param properties OpenGraph Cell의 프로퍼티
         * @param mapreduce  MapReduce
         */
        public void bindHadoopKeyValue(Map properties, Mapreduce mapreduce) {
            String hadoopKeys = (String) properties.get("hadoopKeys");
            String hadoopValues = (String) properties.get("hadoopValues");

            Configuration conf = new Configuration();
            if (!isEmpty(hadoopKeys) && !isEmpty(hadoopValues)) {
                List<Variable> variables = bindVariable(hadoopKeys.trim(), hadoopValues.trim());
                conf.getVariable().addAll(variables);
            }

            if (!isEmpty((String) properties.get("input"))) {
                Variable var = new Variable();
                var.setName("mapred.input.dir");
                var.setValue((String) properties.get("input"));
                conf.getVariable().add(var);

                properties.remove("input");
            }

            if (!isEmpty((String) properties.get("output"))) {
                Variable var = new Variable();
                var.setName("mapred.output.dir");
                var.setValue((String) properties.get("output"));
                conf.getVariable().add(var);

                properties.remove("output");
            }

            if (conf.getVariable().size() > 0) {
                mapreduce.setConfiguration(conf);
            }
        }

        public void bindCommandLines(Map properties, Mapreduce mapreduce) {
            String command = (String) properties.get("commandlineValues");

            if (!isEmpty(command)) {
                String[] values = org.apache.commons.lang.StringUtils.splitPreserveAllTokens(command, ",");
                for (String value : values) {
                    Variable var = new Variable();
                    var.setValue(value);
                    mapreduce.getCommand().getVariable().add(var);
                }
                properties.remove("commandlineValues");
            }
        }

        /**
         * MapReduce 실행에 필요한 Dependency를 바인딩한다.
         *
         * @param groupIdValue    Comma Separated Group ID
         * @param artifactIdValue Comma Separated Artifact ID
         * @param versionValue    Comma Separated Version
         * @param mapreduce       MapReduce
         */
        public void bindMapReduceDependency(String groupIdValue, String artifactIdValue, String versionValue, Mapreduce mapreduce) {
            if (mapreduce.getClasspaths() == null) {
                mapreduce.setClasspaths(new Classpaths());
            }

            String[] groupIds = splitPreserveAllTokens(groupIdValue, ",");
            String[] artifactIds = splitPreserveAllTokens(artifactIdValue, ",");
            String[] versions = splitPreserveAllTokens(versionValue, ",");
            for (int i = 0; i < groupIds.length; i++) {
                String groupId = groupIds[i];
                String artifactId = artifactIds[i];
                String version = versions[i];
                Classpath classpath = new Classpath();
                classpath.setValue(Joiner.on(":").join(groupId.trim(), artifactId.trim(), version.trim()));
                mapreduce.getClasspaths().getClasspath().add(classpath);
            }
        }

        /**
         * 이미 사용한 값들은 모두 삭제한다.
         *
         * @param properties Key Value 액션 메타 데이터
         */
        public void cleanupMapReduce(Map properties) {
            String[] propertiesToRemove = new String[]{
                    "prevQualifier", "outputPathQualifier",
                    "prevColumnNames", "prevColumnKorNames", "prevColumnDescriptions", "prevColumnTypes",
                    "columnNames", "columnKorNames", "columnDescriptions", "columnTypes",
                    "delimiterType", "delimiterValue", "prevDelimiterValue",
                    "hadoopKeys", "hadoopValues",
                    "groupId", "artifactId", "version",
                    "jar", "driver",
                    "config", "path", "commandlineValues",
                    "metadata"
            };

            /**
             * 지정한 컬럼을 삭제한다. 삭제하지 않으면 모든 파라미터가 전부 등록정보로 넘어가게 된다.
             */
            for (String property : propertiesToRemove) {
                properties.remove(property);
            }
        }
    }

    /**
     * Java Binder.
     */
    class JavaBinder {

        /**
         * 변수를 바인딩한다.
         *
         * @param properties OpenGraph Cell의 프로퍼티
         * @param args       Arguments
         */
        private void bindVariables(Map properties, Args args) {
            String variableValues = (String) properties.get("variableValues");
            if (!StringUtils.isEmpty(variableValues) && org.apache.commons.lang.StringUtils.splitPreserveAllTokens(variableValues, ",").length > 0) {
                String[] values = org.apache.commons.lang.StringUtils.splitPreserveAllTokens(variableValues, ",");
                for (String value : values) {
                    Variable variable = new Variable();
                    variable.setValue(value);
                    args.getVariable().add(variable);
                }
            }
            properties.remove("variableValues");
            properties.remove("variableDescriptions");
        }

        /**
         * Java Driver를 바인딩한다.
         *
         * @param metadata   OpenGraph Cell의 메타데이터
         * @param properties OpenGraph Cell의 프로퍼티
         * @param java       Java
         */
        public void bindClassName(Map metadata, Map properties, Java java) {
            String className = (String) metadata.get("className");
            if (!isEmpty(className)) {
                ClassName cn = new ClassName();
                cn.setValue(className.trim());
                java.setClassName(cn);
            } else if (!isEmpty((String) properties.get("driver"))) {
                String driver = (String) properties.get("driver");
                ClassName cn = new ClassName();
                cn.setValue(driver.trim());
                java.setClassName(cn);
            }
        }

        /**
         * Classpaths를 바인딩한다.
         *
         * @param metadata   OpenGraph Cell의 메타데이터
         * @param properties OpenGraph Cell의 프로퍼티
         * @param java       Java
         */
        public void bindClasspaths(Map metadata, Map properties, Java java) {
            String classpaths = (String) properties.get("input");
            if (!isEmpty(classpaths)) {
                java.setClasspaths(bindClasspaths(classpaths));
            }

            if (!isEmpty((String) properties.get("jar"))) {
                Jar jar = new Jar();
                String jarUrl = (String) properties.get("jar");
                jar.setValue(jarUrl.trim());
                java.setJar(jar);
            }
        }

        /**
         * Comma Separated Classpath 리스트를 Classpath로 구성한다.
         *
         * @param classpathsString Comma Separated Classpath 리스트
         * @return Classpath
         */
        public Classpaths bindClasspaths(String classpathsString) {
            Classpaths cpths = new Classpaths();
            List<Classpath> classpath = cpths.getClasspath();
            String[] classpaths = splitPreserveAllTokens(classpathsString, ",");
            for (String cpath : classpaths) {
                Classpath c = new Classpath();
                c.setValue(cpath);
                classpath.add(c);
            }
            return cpths;
        }

        /**
         * Java 실행에 필요한 Dependency를 바인딩한다.
         *
         * @param properties OpenGraph Cell의 프로퍼티
         * @param java       Java
         */
        public void bindDependency(Map properties, Java java) {
            String groupIdValue = (String) properties.get("groupId");
            String artifactIdValue = (String) properties.get("artifactId");
            String versionValue = (String) properties.get("version");

            if (!isEmpty(groupIdValue) && !isEmpty(artifactIdValue) && !isEmpty(versionValue)) {
                bindJavaDependency(groupIdValue.trim(), artifactIdValue.trim(), versionValue.trim(), java);
            }
        }

        /**
         * MapReduce 실행에 필요한 Dependency를 바인딩한다.
         *
         * @param groupIdValue    Comma Separated Group ID
         * @param artifactIdValue Comma Separated Artifact ID
         * @param versionValue    Comma Separated Version
         * @param java            Java
         */
        public void bindJavaDependency(String groupIdValue, String artifactIdValue, String versionValue, Java java) {
            if (java.getClasspaths() == null) {
                java.setClasspaths(new Classpaths());
            }

            String[] groupIds = splitPreserveAllTokens(groupIdValue, ",");
            String[] artifactIds = splitPreserveAllTokens(artifactIdValue, ",");
            String[] versions = splitPreserveAllTokens(versionValue, ",");
            for (int i = 0; i < groupIds.length; i++) {
                String groupId = groupIds[i];
                String artifactId = artifactIds[i];
                String version = versions[i];
                Classpath classpath = new Classpath();
                classpath.setValue(Joiner.on(":").join(groupId.trim(), artifactId.trim(), version.trim()));
                java.getClasspaths().getClasspath().add(classpath);
            }
        }

        /**
         * 이미 사용한 값들은 모두 삭제한다.
         *
         * @param properties Key Value 액션 메타 데이터
         */
        public void cleanupMapReduce(Map properties) {
            String[] propertiesToRemove = new String[]{
                    "prevQualifier", "outputPathQualifier",
                    "prevColumnNames", "prevColumnKorNames", "prevColumnDescriptions", "prevColumnTypes",
                    "columnNames", "columnKorNames", "columnDescriptions", "columnTypes",
                    "delimiterType", "delimiterValue", "prevDelimiterValue",
                    "hadoopKeys", "hadoopValues",
                    "groupId", "artifactId", "version",
                    "jar", "driver",
                    "config",
                    "metadata"
            };

            /**
             * 지정한 컬럼을 삭제한다. 삭제하지 않으면 모든 파라미터가 전부 등록정보로 넘어가게 된다.
             */
            for (String property : propertiesToRemove) {
                properties.remove(property);
            }
        }
    }

    /**
     * MapReduce의 변수를 바인딩한다.
     *
     * @param properties OpenGraph Cell의 프로퍼티
     * @param variables  Variables
     */
    private void bindVariables(Map properties, Variables variables) {
        String variableNames = (String) properties.get("variableNames");
        String variableValues = (String) properties.get("variableValues");

        if (!StringUtils.isEmpty(variableNames) && org.apache.commons.lang.StringUtils.splitPreserveAllTokens(variableNames, ",").length > 0) {
            String[] keys = org.apache.commons.lang.StringUtils.splitPreserveAllTokens(variableNames, ",");
            String[] values = org.apache.commons.lang.StringUtils.splitPreserveAllTokens(variableValues, ",");

            for (int i = 0; i < keys.length; i++) {
                bindVariables(variables, keys[i].trim(), values[i].trim());
            }
        }

        properties.remove("variableNames");
        properties.remove("variableValues");
        properties.remove("variableDescriptions");

        Set keySet = properties.keySet();
        for (Object aKeySet : keySet) {
            String key = (String) aKeySet;
            String value = (String) properties.get(key);

            if (!StringUtils.isEmpty(value.trim())) {
                bindVariables(variables, key.trim(), value.trim());
            }
        }
    }

    /**
     * 이미 사용한 값들은 모두 삭제한다.
     *
     * @param properties Key Value 액션 메타 데이터
     */

    private void cleanupPig(Map properties) {
        String[] propertiesToRemove = new String[]{
                "prevQualifier", "outputPathQualifier",
                "prevColumnNames", "prevColumnKorNames", "prevColumnDescriptions", "prevColumnTypes",
                "columnNames", "columnKorNames", "columnDescriptions", "columnTypes",
                "delimiterType", "delimiterValue", "prevDelimiterValue",
                "hadoopKeys", "hadoopValues",
                "script",
                "config",
                "metadata"};

        /**
         * 지정한 컬럼을 삭제한다. 삭제하지 않으면 모든 파라미터가 전부 등록정보로 넘어가게 된다.
         */
        for (String property : propertiesToRemove) {
            properties.remove(property);
        }
    }

    /**
     * 이미 사용한 값들은 모두 삭제한다.
     *
     * @param properties Key Value 액션 메타 데이터
     */
    private void cleanupHive(Map properties) {
        String[] propertiesToRemove = new String[]{
                "prevQualifier", "outputPathQualifier",
                "prevColumnNames", "prevColumnKorNames", "prevColumnDescriptions", "prevColumnTypes",
                "columnNames", "columnKorNames", "columnDescriptions", "columnTypes",
                "delimiterType", "delimiterValue", "prevDelimiterValue",
                "hadoopKeys", "hadoopValues",
                "script",
                "config",
                "metadata"};

        /**
         * 지정한 컬럼을 삭제한다. 삭제하지 않으면 모든 파라미터가 전부 등록정보로 넘어가게 된다.
         */
        for (String property : propertiesToRemove) {
            properties.remove(property);
        }
    }

    /**
     * 시작을 바인딩한다.
     *
     * @param cell     OpenGraph Cell
     * @param workflow Workflow JAXB Object
     */
    public void bindStart(Opengraph.Cell cell, Workflow workflow) {
        NodeType start = new NodeType();
        start.setName(cell.getId());
        start.setDescription("Start");
        start.setTo(cell.getTo());
        workflow.setStart(start);
    }

    /**
     * 종료를 바인딩한다.
     *
     * @param cell     OpenGraph Cell
     * @param workflow Workflow JAXB Object
     */
    public void bindEnd(Opengraph.Cell cell, Workflow workflow) {
        BaseType end = new BaseType();
        end.setName(cell.getId());
        end.setDescription("End");
        workflow.setEnd(end);
    }

    /**
     * 변수를 바인딩한다.
     *
     * @param variables Variables
     * @param key       Key
     * @param value     Value
     */
    public void bindVariables(Variables variables, String key, String value) {
        Variable var = new Variable();
        var.setName(key);
        boolean isContain = variables.getVariable().contains(var);
        if (!isContain) {
            Variable variable = new Variable();
            variable.setName(key);
            variable.setValue(value);
            variables.getVariable().add(variable);
        }
    }

    /**
     * Configuration을 바인딩한다.
     *
     * @param key   Key
     * @param value Value
     * @return Configuration
     */
    public Configuration bindConfiguration(String key, String value) {
        Configuration configuration = new Configuration();
        configuration.getVariable().addAll(bindVariable(key, value));
        return configuration;
    }

    /**
     * Comma Separated Classpath 리스트를 Classpath로 구성한다.
     *
     * @param classpathsString Comma Separated Classpath 리스트
     * @return Classpath
     */
    public Classpaths bindClasspaths(String classpathsString) {
        Classpaths cpths = new Classpaths();
        List<Classpath> classpath = cpths.getClasspath();
        String[] classpaths = splitPreserveAllTokens(classpathsString, ",");
        for (String cpath : classpaths) {
            Classpath c = new Classpath();
            c.setValue(cpath);
            classpath.add(c);
        }
        return cpths;
    }

    /**
     * Action의 변수를 바인딩한다.
     *
     * @param key   Key
     * @param value Value
     * @return 변수 목록
     */
    public List<Variable> bindVariable(String key, String value) {
        String[] keys = splitPreserveAllTokens(key, ",");
        String[] values = splitPreserveAllTokens(value, ",");

        if (keys.length != values.length) {
            throw new WorkflowException("Invalid size values or keys.");
        }

        List<Variable> vars = new ArrayList<Variable>();
        for (int i = 0; i < keys.length; i++) {
            Variable variable = new Variable();
            variable.setName(keys[i]);
            variable.setValue(values[i]);
            vars.add(variable);
        }
        return vars;
    }

    /**
     * Action의 변수를 바인딩한다.
     *
     * @param key   Key
     * @param value Value
     * @return 변수
     */
    public Variable bindAVariable(String key, String value) {
        Variable variable = new Variable();
        variable.setName(key);
        variable.setValue(value);
        return variable;
    }

    /**
     * 워크플로우를 바인딩한다.
     *
     * @param opengraph 오픈그래프
     * @param workflow  워크플로우
     * @return OpenGraph 메타 데이터
     * @throws Exception 바인딩 에러 발생시
     */
    public Map bind(Opengraph opengraph, Workflow workflow) throws Exception {
        Map map = objectMapper.readValue(unescape(opengraph.getData()), Map.class);
        Map wf = (Map) map.get("workflow");
        workflow.setWorkflowName((String) wf.get("name"));
        Description description = new Description();
        description.setValue((String) wf.get("desc"));
        workflow.setDescription(description);
        bindGlobalVariables(workflow, (List) map.get("globalVariables"));
        return map;
    }

    /**
     * 글로별 변수를 바인딩한다.
     *
     * @param workflow        워크플로우
     * @param globalVariables 글로별 변수
     */
    private void bindGlobalVariables(Workflow workflow, List globalVariables) {
        for (Object var : globalVariables) {
            Map keyvalue = (Map) var;
            GlobalVariable globalVariable = new GlobalVariable();
            globalVariable.setName((String) keyvalue.get("name"));
            globalVariable.setValue((String) keyvalue.get("value"));

            if (workflow.getGlobalVariables() == null) {
                workflow.setGlobalVariables(new GlobalVariables());
            }
            workflow.getGlobalVariables().getGlobalVariable().add(globalVariable);
        }
    }

    /**
     * OpenGraph XML을 Workflow XML로 변환한다.
     *
     * @param xml OpenGraph XML
     * @return Workflow
     */
    public Workflow m1(String xml) {
        try {
            String unescape = unescape(xml);
            logger.info(unescape);
            Opengraph opengraph = (Opengraph) JaxbUtils.unmarshal(JAXB_PACKAGE, xml);
            List<Opengraph.Cell> cells = opengraph.getCell();
            Workflow workflow = new Workflow();
            for (Opengraph.Cell cell : cells) {
                String from = cell.getFromEdge();
                String to = cell.getToEdge();
                String id = cell.getId();
                String name = cell.getLabel();
                String shapeId = cell.getShapeId();
                String data = cell.getData();

                if (!isEmpty(name) && !(countOccurrencesOf(shapeId, "INOUT") > 0)) {
                    if ("Start".equals(name)) {
                        NodeType start = new NodeType();
                        start.setName("Start");
                        start.setTo(to);
                        workflow.setStart(start);
                    } else if ("End".equals(name)) {
                        BaseType end = new BaseType();
                        end.setName("End");
                        workflow.setEnd(end);
                    } else {
                        ActionType actionType = new ActionType();
                        actionType.setName(id);
                        actionType.setDescription(name);
                        actionType.setTo(to);
                        workflow.getAction().add(actionType);
                    }
                }
            }
            workflow.getWorkflowName();
        } catch (JAXBException e) {
            throw new WorkflowException("Cannot unmarshal xml of OpenGraph. Invalid XML.", e);
        }
        return null;
    }

    /**
     * 지정한 OpenGraph 리소스를 로딩하여 워크플로우로 변환한다.
     *
     * @param resource 리소스의 위치
     * @return Workflow
     */
    public Workflow unmarshalFromResource(String resource) {
        try {
            String xml = ResourceUtils.getResourceTextContents(resource);
            logger.debug("the XML of Resource '{}' is\n{}", resource, xml);
            return unmarshal(xml);
        } catch (IOException e) {
            throw new WorkflowException("Cannot load a xml of OpenGraph", e);
        }
    }

    /**
     * Escape 처리한 문자열을 unescape처리한다.
     *
     * @param string Escape 처리한 문자열
     * @return escape Unescape 처리한 문자열
     */
    public static String unescape(String string) {
        StringBuilder builder = new StringBuilder();
        builder.ensureCapacity(string.length());
        int lastPos = 0, pos = 0;
        char ch;
        while (lastPos < string.length()) {
            pos = string.indexOf("%", lastPos);
            if (pos == lastPos) {
                if (string.charAt(pos + 1) == 'u') {
                    ch = (char) Integer.parseInt(string
                            .substring(pos + 2, pos + 6), 16);
                    builder.append(ch);
                    lastPos = pos + 6;
                } else {
                    ch = (char) Integer.parseInt(string
                            .substring(pos + 1, pos + 3), 16);
                    builder.append(ch);
                    lastPos = pos + 3;
                }
            } else {
                if (pos == -1) {
                    builder.append(string.substring(lastPos));
                    lastPos = string.length();
                } else {
                    builder.append(string.substring(lastPos, pos));
                    lastPos = pos;
                }
            }
        }
        return builder.toString();
    }

    /**
     * 지정한 문자열을 escape 처리한다.
     *
     * @param string Escape 처리할 문자열
     * @return escape 처리한 문자열
     */
    public static String escape(String string) {
        int i;
        char j;
        StringBuilder builder = new StringBuilder();
        builder.ensureCapacity(string.length() * 6);
        for (i = 0; i < string.length(); i++) {
            j = string.charAt(i);
            if (Character.isDigit(j) || Character.isLowerCase(j) || Character.isUpperCase(j))
                builder.append(j);
            else if (j < 256) {
                builder.append("%");
                if (j < 16)
                    builder.append("0");
                builder.append(Integer.toString(j, 16));
            } else {
                builder.append("%u");
                builder.append(Integer.toString(j, 16));
            }
        }
        return builder.toString();
    }
}