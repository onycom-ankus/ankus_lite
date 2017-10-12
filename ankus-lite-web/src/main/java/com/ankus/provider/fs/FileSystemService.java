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
package com.ankus.provider.fs;

import com.ankus.model.rest.Context;
import com.ankus.model.rest.FileInfo;
import com.ankus.model.rest.FileSystemCommand;
import com.ankus.model.rest.Response;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Apaceh Hadoop HDFS File System Service Interface.
 *
 * @author Byoung Gon, Kim
 * @since 0.4
 */
public interface FileSystemService {

    /**
     * 사용자 디렉토리를 초기화한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     */
    void initializeUser(Context context, FileSystemCommand command);

    /**
     * 디렉토리 목록을 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 목록
     */
    List<FileInfo> getDirectories(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 생성한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 생성 여부
     */
    boolean createDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 삭제한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 삭제 여부
     */
    boolean deleteDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리명을 변경한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리명 변경 여부
     */
    boolean renameDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 이동한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 이동 여부
     */
    boolean moveDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리를 복사한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 복사 여부
     */
    boolean copyDirectory(Context context, FileSystemCommand command);

    /**
     * 디렉토리의 정보를 확인한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리 정보 확인 여부
     */
    FileInfo getFileInfo(Context context, FileSystemCommand command);

    /**
     * 파일 목록을 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 파일 목록
     */
    List<FileInfo> getFiles(Context context, FileSystemCommand command);

    /**
     * 파일명을 변경한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 변경 여부
     */
    boolean renameFile(Context context, FileSystemCommand command);

    /**
     * 파일을 복사한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 실패한 파일 목록
     */
    List<String> copyFiles(Context context, FileSystemCommand command);

    /**
     * 파일을 이동한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 실패한 파일 목록
     */
    List<String> moveFiles(Context context, FileSystemCommand command);

    /**
     * 파일을 삭제한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 실패한 파일 목록
     */
    List<String> deleteFiles(Context context, FileSystemCommand command);

    /**
     * 파일 정보를 확인한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 확인 여부
     */
    FileInfo infoFile(Context context, FileSystemCommand command);

    /**
     * 파일을 저장한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 파일 업로드 여부
     */
    boolean save(Context context, FileSystemCommand command);

    /**
     * 지정한 경로의 파일을 로딩한다. 이 메소드는 큰 파일 또는 동시에 다수의 사용자가 호출하는 경우 많는 양의 Heap을 소비할 수 있다.
     *
     * @param path     로딩할 파일이 있는 경로
     * @param filename 로딩할 파일의 파일명
     * @return 파일의 바이트 배열
     */
	byte[] load(Context context, FileSystemCommand command);

    /**
     * 파일 시스템의 상태 정보를 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return Key Value 형식의 파일 시스템의 상태 정보
     */
    Map<String, Object> getFileSystemStatus(Context context, FileSystemCommand command);

    /**
     * 디렉토리의 파일 용량을 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리의 파일 용량
     */
    long getSize(Context context, FileSystemCommand command);

    /**
     * 디렉토리의 파일 갯수를 반환한다.
     *
     * @param context File System Context Object
     * @param command File System Command
     * @return 디렉토리의 파일 갯수
     */
    int getCount(Context context, FileSystemCommand command);

    
    Response getCheckWorkHistoyDB( String DBNAME, String DBTYPE,
    		String DB_ADDRESS,
    		String DB_PORT,
    		String ID,
    		String PW) ;
    
    Response getCheckWorkHistoyTABLE( String DBNAME,
    		String DBTYPE,
    		String TABLENAME,
    		String db_address,
    		String db_port,
    		String id,
    		String pw) ;
    
    Response getImport(String WORK_NAME) ;
    
    Response getProgressRate( String WORK_NAME);
    
    Response getWorkNameParameter(String WORK_NAME);
    
    Response work_name_list();
    
    Response getDBlist(String db_address, String DBTYPE, String db_port, String id, String pw);
    
    Response getTableList(String db_address, String DBTYPE, String db_port,String id, String pw,String dbname);
    
    Response getGetFields(String db_address, String DBTYPE, String db_port, String id, String pw, String dbname,	String tablename);
    
    Response sqlhead(String db_address,String DBTYPE, String db_port, String id, String pw,String dbname, String tablename,String query);
    
    Response sqlrun(String db_address, String DBTYPE, 	String db_port, String id,	String pw,String dbname,String tablename,String query);
			
	Response workdashboard_list(long parseLong, String START, String END, String STATUS, String WORKNAME);
	
	Response kill_work(String WORK_NAME);

	Response DirectoryFile_Exit(String path);

	Response insert_db_work(String ENGINE_ID, String ENGINE_NAME,
			String WORK_NAME, String DATABASE_TYPE, String DATABASE_ADDRESS,
			String DATABASE_PORT, String DBid, String DBPassword,
			String SQLSTATEMENT, String HDFSPATH, String DATABASE_NAME,
			String TABLE_NAME, String FILE_MODE, String USER_NAME,
			String DELIMTER);

 }
