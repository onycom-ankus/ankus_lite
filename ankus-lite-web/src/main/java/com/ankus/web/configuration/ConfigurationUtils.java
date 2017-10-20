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
package com.ankus.web.configuration;

import org.apache.hadoop.conf.Configuration;
import com.ankus.core.exception.WorkflowException;
import com.ankus.el.ELUtils;
import com.ankus.util.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.helpers.MessageFormatter;
import org.w3c.dom.*;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Hadoop Configuration Utility.
 *
 * @author Byoung Gon, Kim
 * @since 0.2
 */
public class ConfigurationUtils {

    /**
     * SLF4J Logging
     */
    private static Logger logger = LoggerFactory.getLogger(ConfigurationUtils.class);

    /**
     * {@link org.apache.hadoop.conf.Configuration}을 XML로 변환한다.
     *
     * @param conf {@link org.apache.hadoop.conf.Configuration}
     * @return XML
     */
    public static String configurationToXml(Configuration conf) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            conf.writeXml(baos);
            return new String(baos.toByteArray());
        } catch (Exception e) {
            throw new WorkflowException("Hadoop Configuration을 XML로 변환할 수 없습니다.", e);
        }
    }

    /**
     * XML을 {@link org.apache.hadoop.conf.Configuration}으로 변환한다.
     *
     * @param xml XML
     * @return {@link org.apache.hadoop.conf.Configuration}
     */
    public static Configuration xmlToConfiguration(String xml) {
        Configuration conf = new Configuration();
        conf.addResource(new ByteArrayInputStream(xml.getBytes()));
        return conf;
    }

    /**
     * XML을 {@link java.util.Map}으로 변환한다.
     *
     * @param xml XML
     * @return {@link java.util.Map}
     */
    public static Map<String, String> xmlToMap(String xml) {
        Map<String, String> params = new HashMap<String, String>();
        try {
            DocumentBuilderFactory docBuilderFactory = DocumentBuilderFactory.newInstance();
            // XML 내에 포함되어 있는 주석은 무시
            docBuilderFactory.setIgnoringComments(true);

            // XML 내에 include 허용
            docBuilderFactory.setNamespaceAware(true);
            try {
                docBuilderFactory.setXIncludeAware(true);
            } catch (UnsupportedOperationException e) {
                logger.error("XML Parser의 setXIncludeAware(true)로 설정할 수 없습니다." + docBuilderFactory + ":" + e, e);
            }

            DocumentBuilder builder = docBuilderFactory.newDocumentBuilder();
            Document doc = builder.parse(new ByteArrayInputStream(xml.getBytes()));
            Element root = null;

            if (root == null) {
                root = doc.getDocumentElement();
            }

            if (!"configuration".equals(root.getTagName())) {
                logger.error("최상위 노드가 <configuration>가 아닙니다.");
            }

            NodeList childNodes = root.getChildNodes();
            for (int index = 0; index < childNodes.getLength(); index++) {
                Node propNode = childNodes.item(index);
                if (!(propNode instanceof Element)) continue;
                Element prop = (Element) propNode;
                if (!"property".equals(prop.getTagName())) {
                    logger.error("<property>가 존재하지 않습니다.");
                }
                NodeList fields = prop.getChildNodes();
                String attr = null;
                String value = null;
                boolean finalParameter = false; // not supported
                for (int j = 0; j < fields.getLength(); j++) {
                    Node fieldNode = fields.item(j);
                    if (!(fieldNode instanceof Element)) continue;
                    Element field = (Element) fieldNode;
                    if ("name".equals(field.getTagName()) && field.hasChildNodes()) {
                        attr = ((Text) field.getFirstChild()).getData().trim();
                    }
                    if ("value".equals(field.getTagName()) && field.hasChildNodes()) {
                        value = ((Text) field.getFirstChild()).getData();
                    }
                    if ("final".equals(field.getTagName()) && field.hasChildNodes()) { // not supported
                        finalParameter = "true".equals(((Text) field.getFirstChild()).getData());
                    }
                    params.put(attr, value);
                }
            }
        } catch (Exception ex) {
            throw new WorkflowException("Hadoop Site XML 파일을 파싱할 수 없습니다.", ex);
        }
        return params;
    }

    /**
     * {@link java.util.Map}을 XML로 변환한다.
     *
     * @param params {@link java.util.Map}
     * @return XML
     */
    public static String mapToXML(Map<String, String> params) {
        StringBuilder builder = new StringBuilder();
        builder.append("<configuration>\n");

        Set<String> keySet = params.keySet();
        for (String key : keySet) {
            builder.append(MessageFormatter.format("<property><name>{}</name><value>{}</value></property>\n", key, params.get(key)).getMessage());
        }

        builder.append("</configuration>");
        return builder.toString();
    }

    /**
     * Key Value Parameter Map을 구성하는 Key가 지정한 Regular Expression 일치하는 경우 Map으로 구성하여 반환한다.
     *
     * @param params Key Value Parameter Map
     * @param regex  Regular Expression
     * @return Regular Expression에 일치하는 Key의 Map
     */
    public Map<String, String> getKeyValueByRegex(Map<String, String> params, String regex) {
        Pattern pattern = Pattern.compile(regex);

        Map<String, String> result = new HashMap<String, String>();
        Matcher m = null;

        Set<String> keySet = params.keySet();
        for (String name : keySet) {
            m = pattern.matcher(name);
            if (m.find()) {
                result.put(name, params.get(name));
            }
        }
        return result;
    }

    /**
     * Map을 Properties로 변환한다.
     *
     * @param params Map
     * @return Properties
     */
    public static Properties mapToProperties(Map<String, String> params) {
        Properties properties = new Properties();
        Set<Map.Entry<String, String>> keySet = params.entrySet();
        for (Map.Entry<String, String> entry : keySet) {
            if (!StringUtils.isEmpty(entry.getKey())) properties.put(entry.getKey(), entry.getValue());
        }
        return properties;
    }

    /**
     * Properties을 Map로 변환한다.
     *
     * @param props Properties
     * @return Map
     */
    public static Map<String, String> propertiesToMap(Properties props) {
        Map<String, String> map = new HashMap<String, String>();
        Enumeration<Object> enumeration = props.keys();
        while (enumeration.hasMoreElements()) {
            String name = (String) enumeration.nextElement();
            map.put(name, props.getProperty(name));
        }
        return map;
    }

    /**
     * Property의 <code>name</code>에 해당하는 값을 반환한다. 해당 속성값이 존재하지 않으면 <code>null</code>을 반환한다.
     * <code>name</code>에 해당하는 값은 변수의 expression을 처리를 통해서 값을 얻는다.
     *
     * @param props Property
     * @param name  Property 명
     * @return Property의 <code>name</code>에 해당하는 값, 존재하지 않는 경우 <code>null</code>
     */
    public static String getValue(Properties props, String name) {
        String property = props.getProperty(name);
        return ELUtils.resolve(props, property);
    }

    /**
     * Property의 <code>name</code>에 해당하는 값을 반환한다. 해당 속성값이 존재하지 않으면 <code>null</code>을 반환한다.
     *
     * @param props Property
     * @param name  Property 명
     * @return Property의 <code>name</code>에 해당하는 값, 존재하지 않는 경우 <code>null</code>
     */
    public static String getRawValue(Properties props, String name) {
        return props.getProperty(name);
    }

}
