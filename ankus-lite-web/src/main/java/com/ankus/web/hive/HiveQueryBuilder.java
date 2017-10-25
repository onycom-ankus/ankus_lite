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
package com.ankus.web.hive;

import com.google.common.base.Joiner;
import org.codehaus.jackson.map.ObjectMapper;
import com.ankus.model.hive.Column;
import com.ankus.model.hive.Table;
import com.ankus.util.ResourceUtils;
import com.ankus.util.StringUtils;
import org.springframework.core.io.FileSystemResource;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

/**
 * Hive Query를 구성하는 Builder.
 * Hive Query Builder는 JSON으로 정의한 메타정보를 기반으로 다음의 SQL Query를 생성한다.
 * <p/>
 * <pre>
 * CREATE TABLE page_view(viewTime INT, userid BIGINT,
 *      page_url STRING, referrer_url STRING,
 *      ip STRING COMMENT 'IP Address of the User',
 *      country STRING COMMENT 'country of origination')
 *  COMMENT 'This is the staging page view table'
 *  PARTITIONED BY (ver timestamp)
 *  ROW FORMAT DELIMITED FIELDS TERMINATED BY '\054'
 *  STORED AS TEXTFILE
 *  LOCATION '<hdfs_location>';
 *  </pre>
 *
 * @author Byoung Gon, Kim
 * @version 0.3
 */
public class HiveQueryBuilder {

    private static String CREATE_TABLE_1 = "CREATE TABLE {}";
    private static String CREATE_TABLE_2 = "CREATE TABLE {}.{}";
    private static String COLUMN = "({})";
    private static String DELIMITER = "ROW FORMAT DELIMITED FIELDS TERMINATED BY '{}'";
    private static String PARTITION = "PARTITIONED BY ({})";
    private static String COLUMN_DETAIL = "{} {} COMMENT '{}'";
    private static String COMMENT = "COMMENT '{}'";
    private static String LOCATION = "LOCATION '{}'";

    private static List<Generator> generators = new LinkedList();

    static {
        generators.add(new TableGenerator());
        generators.add(new ColumnGenerator());
        generators.add(new CommentGenerator());
        generators.add(new PartitionGenerator());
        generators.add(new LocationGenerator());
    }

    private Table table;

    public static void main(String[] args) throws IOException {
        String json = ResourceUtils.getResourceTextContents(new FileSystemResource("/Users/cloudine/projects/ankus/trunk/ankus-web-services/src/main/resources/hive.json"));
        String hiveQuery = new HiveQueryBuilder().bind(json).generate();
        System.out.println(hiveQuery);
    }

    public HiveQueryBuilder bind(String json) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        this.table = mapper.readValue(json, Table.class);
        return this;
    }

    public String generate(Table table) {
        this.table = table;
        return generate();
    }

    public String generate() {
        Iterator<Generator> iterator = generators.iterator();
        List<String> queries = new ArrayList<String>();
        while (iterator.hasNext()) {
            Generator generator = iterator.next();
            queries.add(generator.generate(this.table));
        }
        return Joiner.on("\n").join(queries);
    }

    public static String format(String pattern, String... args) {
        return org.slf4j.helpers.MessageFormatter.arrayFormat(pattern, args).getMessage();
    }

    interface Generator {
        String generate(Table table);
    }

    static class TableGenerator implements HiveQueryBuilder.Generator {
        @Override
        public String generate(Table table) {
            if (!StringUtils.isEmpty(table.getTableName())) {
                if (!StringUtils.isEmpty(table.getDatabaseName())) {
                    return format(CREATE_TABLE_2, table.getDatabaseName(), table.getTableName());
                } else {
                    return format(CREATE_TABLE_1, table.getTableName());
                }
            }
            return "";
        }
    }

    static class CommentGenerator implements HiveQueryBuilder.Generator {
        @Override
        public String generate(Table table) {
            if (!StringUtils.isEmpty(table.getComment())) {
                return format(COMMENT, table.getComment());
            }
            return "";
        }
    }

    static class PartitionGenerator implements HiveQueryBuilder.Generator {
        @Override
        public String generate(Table table) {
            List<Column> partitions = table.getPartitions();
            List<String> partitionQueries = new ArrayList<String>();
            if (partitions != null && partitions.size() > 0) {
                for (Column partition : partitions) {
                    String name = partition.getName();
                    String type = partition.getType();
                    String comment = partition.getComment();
                    if (!StringUtils.isEmpty(comment)) {
                        partitionQueries.add(format(COLUMN_DETAIL, name, type, comment));
                    } else {
                        partitionQueries.add(format(COLUMN_DETAIL, name, type, ""));
                    }
                }
            }

            if (partitionQueries.size() > 0) {
                return format(PARTITION, Joiner.on(", ").join(partitionQueries));
            }
            return "";
        }
    }

    static class ColumnGenerator implements HiveQueryBuilder.Generator {
        @Override
        public String generate(Table table) {
            List<Column> columns = table.getColumns();
            List<String> columnQueries = new ArrayList<String>();
            if (columns != null && columns.size() > 0) {
                for (Column column : columns) {
                    String name = column.getName();
                    String type = column.getType();
                    String comment = column.getComment();
                    if (!StringUtils.isEmpty(comment)) {
                        columnQueries.add(format(COLUMN_DETAIL, name, type, comment));
                    } else {
                        columnQueries.add(format(COLUMN_DETAIL, name, type, ""));
                    }
                }
            }

            if (columnQueries.size() > 0) {
                return format(COLUMN, Joiner.on(", ").join(columnQueries));
            }
            return "";
        }
    }

    static class LocationGenerator implements HiveQueryBuilder.Generator {
        @Override
        public String generate(Table table) {
            if (!StringUtils.isEmpty(table.getLocation())) {
                return format(LOCATION, table.getLocation());
            }
            return "";
        }
    }
}