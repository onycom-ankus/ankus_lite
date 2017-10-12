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
package com.ankus.provider.engine;

import org.apache.hcatalog.api.HCatAddPartitionDesc;
import org.apache.hcatalog.api.HCatClient;
import org.apache.hcatalog.api.HCatPartition;
import org.apache.hcatalog.api.HCatTable;
import org.apache.hcatalog.common.HCatException;
import org.apache.hcatalog.data.schema.HCatFieldSchema;
import com.ankus.model.hive.Column;
import com.ankus.model.hive.Database;
import com.ankus.model.hive.Table;
import com.ankus.model.rest.HiveServer;

import java.util.Collection;
import java.util.List;
import java.util.Map;

public interface HCatalogService {

    /**
     * Hive 데이터베이스를 생성한다.
     *
     * @param database Hive Database
     * @throws org.apache.hcatalog.common.HCatException 데이터베이스를 생성할 수 없는 경우
     */
    void createDatabase(Database database, HiveServer hiveServer) throws HCatException;

    /**
     * Hive 데이터베이스를 삭제한다.
     *
     * @param database Hive Database
     * @throws org.apache.hcatalog.common.HCatException 데이터베이스를 삭제할 수 없는 경우
     */
    void dropDatabase(HiveServer hiveServer, Database database) throws HCatException;

    /**
     * Hive 테이블을 생성한다.
     *
     * @param table Hive 테이블
     * @throws org.apache.hcatalog.common.HCatException 테이블을 생성할 수 없는 경우
     */
    void createTable(HiveServer hiveServer, Table table) throws HCatException;

    /**
     * Hive 테이블을 삭제한다.
     *
     * @param table Hive 테이블
     * @throws org.apache.hcatalog.common.HCatException 테이블을 삭제할 수 없는 경우
     */
    void dropTable(HiveServer hiveServer, Table table) throws HCatException;

    /**
     * 모든 데이터베이스를 반환한다.
     *
     * @param hiveServer Hive Server
     * @return 데이터베이스 목록
     */
    Collection<Database> getDatabases(HiveServer hiveServer) throws HCatException;

    /**
     * Hive Catalog Client를 반환한다.
     *
     * @param hiveServer Hive Server
     * @return Hive Catalog Client
     */
    HCatClient getClient(HiveServer hiveServer);

    /**
     * Hive Table 목록을 반환한다.
     *
     * @param hiveServer Hive Server
     * @return Hive Table 목록
     */
    Collection<Table> getTables(HiveServer hiveServer, String databaseName) throws HCatException;

    /**
     * Hive Table 목록을 반환한다.
     *
     * @return Hive Table 목록
     */
    Table getTable(HiveServer hiveServer, Table table) throws HCatException;

    /**
     * Hive Table 목록을 반환한다.
     *
     * @return HCatTable Table 목록
     */
    HCatTable getTable(HiveServer hiveServer, String databaseName, String tableName) throws HCatException;


    /**
     * Hive Table의 컬럼 목록을 반환한다.
     *
     * @param database Hive Database
     * @param table    Hive Table
     * @return Hive Table의 컬럼 목록
     */
    Collection<Column> getColumns(HiveServer hiveServer, String database, String table) throws HCatException;

    /**
     * Hive Table의 이름을 수정한다.
     *
     * @param database        Hive Database 이름
     * @param sourceTableName 이전 Hive Table 이름
     * @param targetTableName 새로운 Hive Table 이름
     * @throws org.apache.hcatalog.common.HCatException 테이블 이름을 수정할 수 없는 경우
     */
    void renameTable(HiveServer hiveServer, String database, String sourceTableName, String targetTableName) throws HCatException;

    /**
     * Hive Table에 파티션을 추가한다.
     *
     * @param hCatAddPartitionDescs Hive Table Partition Info List
     * @throws org.apache.hcatalog.common.HCatException Partition을 추가할 수 없는 경우
     */
    int addPartitions(HiveServer hiveServer, List<HCatAddPartitionDesc> hCatAddPartitionDescs) throws HCatException;

    /**
     * Hive Table의 파티션을 삭제한다.
     *
     * @param databaseName Hive Database 이름
     * @param tableName    이전 Hive Table 이름
     * @param partSpec     Partition Info
     * @param ifExists     Partition 존재 여부
     * @throws org.apache.hcatalog.common.HCatException Partition을 삭제할 수 없는 경우
     */
    void dropPartitions(HiveServer hiveServer, String databaseName, String tableName, Map<String, String> partSpec, boolean ifExists) throws HCatException;

    /**
     * Hive Table의 파티션을 추가한다.
     *
     * @param hCatAddPartitionDesc Hive 파티션 Info
     * @throws org.apache.hcatalog.common.HCatException 테이블 이름을 수정할 수 없는 경우
     */
    void addPartition(HiveServer hiveServer, HCatAddPartitionDesc hCatAddPartitionDesc) throws HCatException;

    /**
     * Hive Table을 업데이트한다.
     *
     * @param databaseName  Hive Database 이름
     * @param tableName     Hive Table 이름
     * @param columnSchemas Column Info
     * @throws org.apache.hcatalog.common.HCatException 테이블 이름을 수정할 수 없는 경우
     */
    void updateTableSchema(HiveServer hiveServer, String databaseName, String tableName, List<HCatFieldSchema> columnSchemas) throws HCatException;

    /**
     * Hive Partition들을 가져온다.
     *
     * @param databaseName Hive Database 이름
     * @param tableName    Hive Table 이름
     * @throws org.apache.hcatalog.common.HCatException Partition 을 수정할 수 없는 경우
     */
    Collection<Column> getPartitions(HiveServer hiveServer, String databaseName, String tableName) throws HCatException;

    List<HCatPartition> getPartitions(HiveServer hiveServer, String databaseName, String tableName, Map<String, String> partitionSpec) throws HCatException;

    /**
     * Hive Table을 업데이트한다.
     *
     * @param table 업데이트 할 테이블
     * @throws org.apache.hcatalog.common.HCatException 테이블을 업데이트 할 수 없는 경우
     */
    void updateTable(HiveServer hiveServer, Table table, List<HCatFieldSchema> colSchema) throws HCatException;


}

