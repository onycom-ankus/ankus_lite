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

import com.ankus.model.opengraph.Opengraph;
import com.ankus.model.workflow.*;
import com.ankus.util.StringUtils;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * MapReduce Binder
 * <p/>
 * <pre>hadoop --config <> jar <jarname> <main class> -D mapred.child.java.opts=-Xmx1024M -libjars ${LIBJARS}</pre>
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class MapReduceBinder implements Binder<Mapreduce> {

    /**
     * OpenGraph Cell의 Filtered Properties
     */
    private Map filteredProperties;

    /**
     * OpenGraph Cell의 Action Type
     */
    private ActionType actionType;

    /**
     * Workflow의 MapReduce
     */
    private Mapreduce mapreduce = new Mapreduce();

    /**
     * 기본 생성자.
     *
     * @param cell               OpenGraph Cell
     * @param cellMap            OpenGraph Cell ID와 Cell Map
     * @param metadata           OpenGraph Cell의 Metadata
     * @param properties         OpenGraph Cell의 Properties
     * @param filteredProperties OpenGraph Cell의 Filtered Properties
     * @param actionType         OpenGraph Cell의 Action Type
     */
    public MapReduceBinder(Opengraph.Cell cell, Map<String, Opengraph.Cell> cellMap,
                           Map metadata, Map properties, Map filteredProperties, ActionType actionType) {
        this.filteredProperties = filteredProperties;
        this.actionType = actionType;
    }

    @Override
    public Mapreduce bind() {
        Map mr = (Map) filteredProperties.get("mapreduce");

        bindDriver(mr);
        bindJar(mr);
        bindHadoopConfiguration(mr);
        bindCommandline(mr);

        actionType.getMapreduce().add(mapreduce);
        return mapreduce;
    }

    private void bindJar(Map params) {
        if (!StringUtils.isEmpty((String) params.get("jar"))) {
            Jar jar = new Jar();
            jar.setValue((String) params.get("jar"));
            mapreduce.setJar(jar);
        }
    }

    private void bindDriver(Map params) {
        if (!StringUtils.isEmpty((String) params.get("driver"))) {
            ClassName value = new ClassName();
            value.setValue((String) params.get("driver"));
            mapreduce.setClassName(value);
        }
    }

    private void bindHadoopConfiguration(Map params) {
        if (params.get("confKey") != null && !StringUtils.isEmpty((String) params.get("confKey"))) {
            String[] keys = org.apache.commons.lang.StringUtils.splitPreserveAllTokens((String) params.get("confKey"), ",");
            String[] values = org.apache.commons.lang.StringUtils.splitPreserveAllTokens((String) params.get("confValue"), ",");
            Configuration configuration = new Configuration();

            for (int i = 0; i < keys.length; i++) {
                Variable var = new Variable();
                var.setName(keys[i]);
                var.setValue(values[i]);
                configuration.getVariable().add(var);
            }
            mapreduce.setConfiguration(configuration);
        }
    }

    private void bindCommandline(Map params) {
        List list = (List) params.get("params");
        Command command = new Command();

        for (Iterator iterator = list.iterator(); iterator.hasNext(); ) {
            String arg = (String) iterator.next();

            Variable variable = new Variable();
            variable.setValue(arg);
            command.getVariable().add(variable);
        }

        mapreduce.setCommand(command);
    }

    public void cleanup() {
    }
}
