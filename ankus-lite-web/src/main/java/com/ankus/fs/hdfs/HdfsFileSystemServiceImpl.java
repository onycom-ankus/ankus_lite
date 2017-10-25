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
package com.ankus.fs.hdfs;
import java.io.InputStream;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang.StringUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import com.ankus.core.exception.FileSystemException;
import com.ankus.model.rest.AuditType;
import com.ankus.model.rest.Context;
import com.ankus.model.rest.DataBaseList;
import com.ankus.model.rest.FieldList;
import com.ankus.model.rest.FileInfo;
import com.ankus.model.rest.FileSystemCommand;
import com.ankus.model.rest.FileSystemType;
import com.ankus.model.rest.FileType;
import com.ankus.model.rest.PreviewSQLBody;
import com.ankus.model.rest.PreviewSQLHead;
import com.ankus.model.rest.ProcessRate;
import com.ankus.model.rest.Response;
import com.ankus.model.rest.TableList;
import com.ankus.model.rest.WorkDashBoard;
import com.ankus.model.rest.WorkName;
import com.ankus.model.rest.WorkNameParameter;
import com.ankus.provider.fs.FileSystemAuditService;
import com.ankus.provider.fs.FileSystemProvider;
import com.ankus.provider.fs.FileSystemService;
import com.ankus.provider.locale.ResourceBundleRetreiver;
import com.ankus.util.ExceptionUtils;
import com.ankus.util.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.AntPathMatcher;

/**
 * Apaceh Hadoop HDFS File System Service Implementation.
 *
 * @author Edward KIM
 * @since 0.4
 */
public class HdfsFileSystemServiceImpl implements FileSystemService 
															 {
	/*
	 * db config 정보
	 *  2016.01.06
	 *
	 *  by shm7255@onycom.com
	 */

	@Value("${jdbc.driver}")
	public String jdbc_driver;

	@Value("${jdbc.url}")
	public String jdbc_url;

	@Value("${jdbc.username}")
	public String jdbc_username;

	@Value("${jdbc.password}")
	public String jdbc_password;	
	
    /**
     * File System Audit Service
     */
    private FileSystemAuditService auditService;
    private Logger logger = LoggerFactory.getLogger(HdfsFileSystemServiceImpl.class);
    @Override
    public void initializeUser(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String userhome = command.getString("userhome");
        String username = command.getString("username");
        String path = userhome + "/" + username;
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            if (!provider.exists(userhome)) {
                provider.mkdir(userhome);
            }

            if (!provider.exists(path)) {
                provider.mkdir(userhome);
            }
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_INIT_USER", username, path), ex);
        	throw new FileSystemException(String.format("We coudn\'t initialize the home directory(\"%s\") of the \"%s\" user", path, username), ex);
        }
    }

    private ResourceBundleRetreiver getResourceBundle(Context context) {
        return (ResourceBundleRetreiver) context.getObject(ResourceBundleRetreiver.KEY);
    }

    @Override
    public List<FileInfo> getDirectories(Context context, FileSystemCommand command) {
    	logger.info("getDirectories Start");
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.list(command.getString("path"), command.getBoolean("directoryOnly"));
        } catch (Exception ex) {
        	logger.info("getDirectories:error" + ex.getMessage());
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_DIRECTORY_INFO"), ex);
        	throw new FileSystemException(String.format("The directory information is unavailable"), ex);
        }
    }

    @Override
    public boolean createDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("path");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean created = provider.mkdir(command.getString("path"));
            auditService.log(context, FileSystemType.HDFS, AuditType.CREATE, FileType.DIRECTORY, command.getString("path"), "", 0);
            return created;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_CREATE_DIRECTORY"), ex);
        	throw new FileSystemException(String.format("We couldn\'t create a directory"), ex);
        }
    }

    @Override
    public boolean deleteDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("path");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            long length = getFileInfo(context, command.getString("path")).getLength();
            boolean deleted = provider.delete(command.getString("path"));
            auditService.log(context, FileSystemType.HDFS, AuditType.DELETE, FileType.DIRECTORY, command.getString("path"), "", length);
            return deleted;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_DELETE_DIRECTORY"), ex);
        	throw new FileSystemException(String.format("We couldn\'t delete the directory"), ex);
        }
    }

    @Override
    public boolean renameDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("from");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean renamed = provider.rename(command.getString("from"), command.getString("to"));
            auditService.log(context, FileSystemType.HDFS, AuditType.RENAME, FileType.DIRECTORY, command.getString("from"), command.getString("to"), 0);
            return renamed;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_RENAME_DIRECTORY"), ex);
        	throw new FileSystemException(String.format("We couldn\'t change the directory name"), ex);
        }
    }

    @Override
    public boolean moveDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("to");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        for (String path : paths) {
            String pathToValid = command.getString("from");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
                throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            long length = getFileInfo(context, command.getString("from")).getLength();
            boolean moved = provider.rename(command.getString("from"), command.getString("to"));
            auditService.log(context, FileSystemType.HDFS, AuditType.MOVE, FileType.DIRECTORY, command.getString("from"), command.getString("to"), length);
            return moved;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_MOVE_DIRECTORY"), ex);
        	throw new FileSystemException(String.format("We couldn\'t move the directory"), ex);
        }
    }

    @Override
    public boolean copyDirectory(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("to");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean copied = provider.copy(command.getString("from"), command.getString("to"));
            auditService.log(context, FileSystemType.HDFS, AuditType.COPY, FileType.DIRECTORY, command.getString("from"), command.getString("to"), getFileInfo(context, command.getString("from")).getLength());
            return copied;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_COPY_DIRECTORY"), ex);
        	throw new FileSystemException(String.format("We couldn\'t copy the directory"), ex);
        }
    }

    @Override
    public FileInfo getFileInfo(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getFileInfo(command.getString("path"));
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_INFO"), ex);
        	throw new FileSystemException(String.format("The information of a file or directory is unavailable"), ex);
        }
    }

    /**
     * 디렉토리 정보를 확인한다.
     *
     * @param context File System Context Object
     * @param path    경로
     * @return 디렉토리 정보 확인 여부
     */
    private HdfsFileInfo getFileInfo(Context context, String path) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return (HdfsFileInfo) provider.getFileInfo(path);
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_DIRECTORY_INFO"), ex);
        	throw new FileSystemException(String.format("The directory information is unavailable."), ex);
        }
    }

    @Override
    public List<FileInfo> getFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.list(command.getString("path"));
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_LIST_FILES"), ex);
        	throw new FileSystemException(String.format("The file list is unavailable"), ex);
        }
    }

    @Override
    public boolean renameFile(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = FileUtils.getPath(command.getString("path"));
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task.", pathToValid));                
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            boolean renamed = provider.rename(command.getString("path"), command.getString("filename"));
            auditService.log(context, FileSystemType.HDFS, AuditType.RENAME, FileType.FILE, command.getString("path"), FileUtils.getPath(command.getString("path")) + "/" + command.getString("filename"), 0);
            return renamed;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_LIST_FILES"), ex);
        	throw new FileSystemException(String.format("The file list is unavailable."), ex);
        }
    }

    @Override
    public List<String> copyFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String destinationPath = command.getString("to");
            String pathToValid = FileUtils.getPath(destinationPath);
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            List<String> ps = (List<String>) command.getObject("from");
            List<String> copied = new ArrayList();
            for (String p : ps) {
                long length = getFileInfo(context, p).getLength();
                boolean isCopied = provider.copy(p, command.getString("to"));
                if (isCopied) {
                    copied.add(p);
                    auditService.log(context, FileSystemType.HDFS, AuditType.COPY, FileType.FILE, p, command.getString("to"), length);
                }
            }
            return copied;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_COPY_FILE"), ex);
        	throw new FileSystemException(String.format("We couldn\'t copy the file."), ex);
        }
    }

    @Override
    public List<String> moveFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("to");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        for (String path : paths) {
            String destinationPath = ((List<String>) command.getObject("from")).get(0);
            String pathToValid = FileUtils.getPath(destinationPath);
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            List<String> ps = (List<String>) command.getObject("from");
            List<String> moved = new ArrayList();
            for (String p : ps) {
                long length = getFileInfo(context, p).getLength();
                boolean isMoved = provider.move(p, command.getString("to"));
                if (isMoved) {
                    moved.add(p);
                    auditService.log(context, FileSystemType.HDFS, AuditType.MOVE, FileType.FILE, p, command.getString("to"), length);
                }
            }
            return moved;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_MOVE_FILE"), ex);
        	throw new FileSystemException(String.format("We couldn\'t move the file"), ex);        	
        }
    }

    @Override
    public List<String> deleteFiles(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        String first = ((List<String>) command.getObject("path")).get(0);
        for (String path : paths) {
            String pathToValid = FileUtils.getPath(first);            
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
            	throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            List<String> ps = (List<String>) command.getObject("path");
            List<String> deleted = new ArrayList();
            for (String p : ps) {
                long length = getFileInfo(context, p).getLength();
                boolean isDeleted = provider.delete(p);
                if (isDeleted) {
                    deleted.add(p);
                    auditService.log(context, FileSystemType.HDFS, AuditType.DELETE, FileType.FILE, p, "", length);
                }
            }
            return deleted;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_DELETE_FILE"), ex);
        	throw new FileSystemException(String.format("We couldn\'t delete the file"), ex);
        }
    }

    @Override
    public FileInfo infoFile(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getFileInfo(command.getString("path"));
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_FILE_INFO"), ex);
        	throw new FileSystemException(String.format("The file information is unavailable."), ex);
        }
    }

    @Override
    public boolean save(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        String[] paths = StringUtils.splitPreserveAllTokens(context.getString("hdfs.delete.forbidden.paths"), ",");
        AntPathMatcher antPathMatcher = new AntPathMatcher();
        for (String path : paths) {
            String pathToValid = command.getString("path");
            boolean isMatch = antPathMatcher.match(path, pathToValid);
            if (isMatch) {
//                throw new FileSystemException(bundle.message("S_FS_SERVICE", "INCLUDED_FOBIDDEN_RULES", pathToValid));
                throw new FileSystemException(String.format("\"%s\" is in the non-deletable paths list. We can\'t process the requested task", pathToValid));
            }
        }

        FileSystemProvider provider = getFileSystemProvider(context);

        boolean isfirst = (Boolean)command.getObject("isfirst");
        
    	System.out.println("HDFS FileSystem ------> : isfirst="+isfirst+"\n");
        
        if (provider.exists(command.getString("path")) && isfirst) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "ALREADY_EXISTS_FILE"));
        	throw new FileSystemException(String.format("The file already exists."));
        }

        try {
        	System.out.println("HDFS FileSystem ------> : new 1");
//            boolean saved = provider.save(command.getString("path"), (byte[]) command.getObject("content"));
        	
            boolean saved = provider.save2(command.getString("path"), (byte[]) command.getObject("content"), isfirst);
        	
            auditService.log(context, FileSystemType.HDFS, AuditType.UPLOAD, FileType.FILE, command.getString("path"), "", getFileInfo(context, command.getString("path")).getLength());
            return saved;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_UPLOAD"), ex);
        	throw new FileSystemException(String.format("Uploading the file has failed."), ex);
        }
    }

    @Override
    public byte[] load(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);

            Long offset = (Long)command.getObject("offset");
            Integer len = (Integer)command.getObject("len");
            Integer linecnt = (Integer)command.getObject("linecnt");
            
            System.out.println("HDFS load ------> : "+offset+","+len+","+linecnt);
            
            
            byte[] loaded = null;
            
            if(linecnt!=null)
            {
            	loaded = provider.readlines(command.getString("path"), linecnt).getBytes();
            }
            else if (offset!=null)
            {
            	loaded = provider.load(command.getString("path"), offset, len);
            }
            else loaded = provider.load(command.getString("path"), command.getString("filename"));
            auditService.log(context, FileSystemType.HDFS, AuditType.DOWNLOAD, FileType.FILE, command.getString("path"), "", getFileInfo(context, command.getString("path")).getLength());
            return loaded;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_DOWNLOAD"), ex);
            throw new FileSystemException(String.format("Loading the file has failed."), ex);
        }
    }
    
    @Override
    public Map<String, Object> getFileSystemStatus(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getFileSystemStatus(command.getString("status"));
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_GET_FS_INFO"), ex);
        	throw new FileSystemException(String.format("The status of the file system is unavailable."), ex);
        }
    }

    @Override
    public long getSize(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getSize(command.getString("path"), false);
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_CHECK_FILE_SIZE"), ex);
        	throw new FileSystemException(String.format("The file size is unavailable."), ex);
        }
    }

    @Override
    public int getCount(Context context, FileSystemCommand command) {
        ResourceBundleRetreiver bundle = getResourceBundle(context);
        try {
            FileSystemProvider provider = getFileSystemProvider(context);
            return provider.getCount(command.getString("path"), false);
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS_SERVICE", "CANNOT_CHECK_FOUND_COUNT"), ex);
        	throw new FileSystemException(String.format("A number of files is unavailable."), ex);
        }
    }

    /**
     * HDFS File System Provider를 생성한다.
     *
     * @param context File System Context
     * @return HDFS File System Provider
     */
    private FileSystemProvider getFileSystemProvider(Context context) {
        return new HdfsFileSystemProvider(context);
    }

    public void setFileSystemAuditService(FileSystemAuditService auditService) {
        this.auditService = auditService;
    }

	@Override
	public Response insert_db_work(
			String ENGINE_ID, 
			String ENGINE_NAME,
		//	String WORK_ID ,
			String WORK_NAME ,
    		String DATABASE_TYPE,
    		String DATABASE_ADDRESS,
    		String DATABASE_PORT ,
    		String DBid,
    		String DBPassword  ,
    		String SQLSTATEMENT ,
    		String HDFSPATH  ,
    		
    		String DATABASE_NAME ,
    		String TABLE_NAME ,
    		String FILE_MODE, 
    		String USER_NAME, 
    		String DELIMTER) {
		Response response = new Response();
		 try
		 {
		
			Connection conn = null;                                        // null로 초기화 한다.
			PreparedStatement pstmt = null;
			int last_work_id = 0;
			int last_proccess_id = 0;
			ResultSet rs  = null;
			
			List<WorkName> workName_list = new ArrayList<WorkName>();
			
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
			String sql = "";
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
						
			//DBWORK_HISTORY SETTING
			sql = "insert into DBWORK_HISTORY (ENGINE_ID, ENGINE_NAME, WORK_NAME, DATABASE_TYPE, DATABASE_ADDRESS, DATABASE_PORT, ID, PASSWORD, DATABASE_NAME, TABLE_NAME, USER) values(?,?,?,?,?,?,?,?,?,?,?)";        // sql 쿼리
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			pstmt = conn.prepareStatement(sql);                          					// prepareStatement에서 해당 sql을 미리 컴파일한다.
			pstmt.setString(1,ENGINE_ID);
			pstmt.setString(2,ENGINE_NAME);
			pstmt.setString(3,WORK_NAME);
			pstmt.setString(4,DATABASE_TYPE);
			pstmt.setString(5,DATABASE_ADDRESS);
			pstmt.setString(6,DATABASE_PORT);
			pstmt.setString(7,DBid);
			pstmt.setString(8,DBPassword);
			pstmt.setString(9,  DATABASE_NAME);
			pstmt.setString(10,  TABLE_NAME);
			pstmt.setString(11,  USER_NAME);
			pstmt.executeUpdate();                                        // 쿼리를 실행한다.
			
			pstmt.close();
			conn.close();
			
			sql = "SELECT  WORK_ID FROM DBWORK_HISTORY ORDER BY WORK_ID DESC LIMIT 1";
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			pstmt = conn.prepareStatement(sql); 
			rs  = pstmt.executeQuery();
		
			WorkName workName = new WorkName();
			while(rs.next())
			{
				last_work_id = rs.getInt("WORK_ID");
				workName.setWorkId(last_work_id+"");
				workName.setWorkName(WORK_NAME);				
			}
			pstmt.close();
			conn.close();
			
			sql = "INSERT INTO DBWORK_PROCESS (";
			sql += "STATUS, PROGRESS, TOTALCOUNT, SQLSTATEMENT, JOBTYPE, LOG,  HDFSPATH, FILEMODE, WORK_ID, DELIMITER) ";
			sql += "values(?, ?,?,?,?,?,?,?,?,?)";        // sql 쿼리
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			pstmt = conn.prepareStatement(sql);                          					// prepareStatement에서 해당 sql을 미리 컴파일한다.
		
			pstmt.setInt(1,0);//STATUS
			pstmt.setInt(2,0); //PROGRESS
			pstmt.setInt(3,0); //TOTALCOUNT
			pstmt.setString(4,SQLSTATEMENT);//SQLQUERY
			pstmt.setInt(5,1); //JOB TYPE
			pstmt.setString(6,"");//LOG
			
			String target_HDFS = HDFSPATH;
			
			pstmt.setString(7, target_HDFS);//HDFS PATH
			
			pstmt.setInt(8, Integer.parseInt(FILE_MODE));//FILEMODE
			pstmt.setInt(9, last_work_id);
			pstmt.setString(10 ,DELIMTER);//DELIMTER
			pstmt.executeUpdate();                                        // 쿼리를 실행한다.
									
			sql = "SELECT PROCESS_ID FROM DBWORK_PROCESS ORDER BY PROCESS_ID DESC LIMIT 1";
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			pstmt = conn.prepareStatement(sql); 
			rs  = pstmt.executeQuery();
		
			
			while(rs.next())
			{
				last_proccess_id = rs.getInt("PROCESS_ID");
			}
			
			pstmt.close();
			conn.close();
			
			//DBWORK HISTORY UPDATE AT PROCESS_ID
			sql = "UPDATE DBWORK_HISTORY SET PROCESS_ID = ? WHERE WORK_ID = ?";
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			pstmt = conn.prepareStatement(sql);                          					// prepareStatement에서 해당 sql을 미리 컴파일한다.
			pstmt.setInt(1,  last_proccess_id);	//PROCESS ID
			pstmt.setInt(2,	last_work_id); 		//WORK_ID
			pstmt.executeUpdate();                                        // 쿼리를 실행한다. 
			
			if(pstmt != null) try{pstmt.close();}catch(SQLException sqle){}            // PreparedStatement 객체 해제
			if(conn != null) try{conn.close();}catch(SQLException sqle){}            // Connection 해제
			
			rs.close();
			
			workName_list.add(workName);
			response.getList().addAll(workName_list);
            response.setTotal(workName_list.size());
            
			response.setSuccess(true);	
			response.getError().setMessage("New work " + WORK_NAME  + " is Saved");
			
		 }
	
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
		
			response.setSuccess(false);
	        response.getError().setMessage(ex.getMessage());
	        if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
	        response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
	     
			
		}
		 return response;
	}

	public static boolean isInteger(String s) {
	    try { 
	        Integer.parseInt(s); 
	    } catch(NumberFormatException e) { 
	        return false; 
	    } catch(NullPointerException e) {
	        return false;
	    }
	    // only got here if we didn't return false
	    return true;
	}
	//CALL REMOTE DATBASE
	public  Response getCheckWorkHistoyDB( String DBNAME, String DBTYPE,
														    		String db_address,
														    		String db_port,
														    		String id,
														    		String pw) 
	{
		List<DataBaseList> db_list = new ArrayList<DataBaseList>();
		boolean included  = false;
		
		Response response = new Response();
		try 
		{
					
			Connection conn = null;			
			String address_part1 = db_address.substring(0, 1);			
			if(isInteger(address_part1))
			{
				if(DBTYPE.equals("MySQL") == true)
				{
					Class.forName("com.mysql.jdbc.Driver").newInstance();			
					conn =	DriverManager.getConnection("jdbc:mysql://" + db_address +":" + db_port , id , pw);
				}
				else if(DBTYPE.equals("MSSQL") == true)
				{
					Class.forName("net.sourceforge.jtds.jdbc.Driver");	
					conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" + db_address +":" + db_port , id , pw);
				}
			}
			else
			{
				InetAddress address = null;
			    try {
			      address = InetAddress.getByName(db_address);
			    } catch (UnknownHostException e) {
			      System.exit(2);
			    }
			    if(DBTYPE.equals("MySQL") == true)
				{
					Class.forName("com.mysql.jdbc.Driver").newInstance();			
					conn =	DriverManager.getConnection("jdbc:mysql://" + address.getHostAddress()  +":" + db_port , id , pw);
				}
				else if(DBTYPE.equals("MSSQL") == true)
				{
					Class.forName("net.sourceforge.jtds.jdbc.Driver");
					conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" + address.getHostAddress()  +":" + db_port , id , pw);
				}
			}			
			ResultSet rs = conn.getMetaData().getCatalogs();		
			while (rs.next()) 
			{
				DataBaseList db = new DataBaseList();
				
				if(DBNAME.equals(rs.getString("TABLE_CAT") )== true)
				{
					included = true;
				}
				db.setDatabaseName(rs.getString("TABLE_CAT"));
				db_list.add(db);
			}
			//데이터 베이스를 조회하여 해당 데이터 베이스가 존재 하지 않으면 아예 리스트를 삭제한다.
			//사이즈가 0으로 되어 웹에서 확인이 가능하다.
			if(included == false) db_list.clear();
			
			response.getList().addAll(db_list);
            response.setTotal(db_list.size());
            response.setSuccess(true);	
            rs.close();
            conn.close();
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
	}
	public Response getCheckWorkHistoyTABLE(
																		String DBNAME,
																		String DBTYPE,
																		String TABLENAME,
																		String db_address,
																		String db_port,
																		String id,
																		String pw)
		{
		
		List<TableList>  table_list = new ArrayList<TableList>();
		boolean included  = false;
		
		Response response = new Response();
		try 
		{
						
			Connection conn = null;
			//Class.forName("com.mysql.jdbc.Driver").newInstance();
			//conn =	DriverManager.getConnection( "jdbc:mysql://" + db_address +"/"+ DBNAME, id , pw);
			ResultSet rs  = null;
			if(DBTYPE.equals("MySQL") == true)
			{
				Class.forName("com.mysql.jdbc.Driver").newInstance();			
				conn =	DriverManager.getConnection("jdbc:mysql://" + db_address +":" + db_port , id , pw);
				DatabaseMetaData md = conn.getMetaData();
				rs = md.getTables(null, null, "%", null);
				while (rs.next()) 
				{
					TableList table = new TableList();				
					if(TABLENAME.equals(rs.getString(3) )== true)
					{
						included = true;
					}
					table.setTableName(rs.getString(3));
					table_list.add(table);
				}
				if(included == false)
				{
					table_list.clear();
				}
			}
			else if(DBTYPE.equals("MSSQL") == true)
			{
				Class.forName("net.sourceforge.jtds.jdbc.Driver");	
				conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" + db_address +":" + db_port , id , pw);
				Statement statement = conn.createStatement(); 
				rs = statement.executeQuery("SELECT * FROM INFORMATION_SCHEMA.TABLES");		
				System.out.println("Table LIST");
				while(rs.next())
				{
					System.out.println(rs.getString(3));
				}
			}		
			
			response.getList().addAll(table_list);
			response.setTotal(table_list.size());
			response.setSuccess(true);	
			rs.close();
			conn.close();
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			response.setSuccess(false);
			response.getError().setMessage(ex.getMessage());
			
			if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
				response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
			}
			return response;
		}
	
	//public Response getImport(String WORK_NAME)
	public Response getImport(String WORK_ID)
	{
		Response response = new Response();
		Connection conn = null;                                        // null로 초기화 한다.
		PreparedStatement pstmt = null;
		String sql = "";
    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
    	String id = jdbc_username; //"root";                                                    // 사용자 계정
    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
		try
		{
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
				
			//UPDATE STATUS BY WORK_ID
			sql = "UPDATE DBWORK_PROCESS SET STATUS = 1 , PROGRESS = 0, TOTALCOUNT = 0 WHERE WORK_ID = ?";
			pstmt = conn.prepareStatement(sql);                          					// prepareStatement에서 해당 sql을 미리 컴파일한다.
			
			//pstmt.setInt(1,WORKID);//STATUS
			pstmt.setInt(1 , Integer.parseInt(WORK_ID)); //상태값 변
			
			pstmt.executeUpdate();                                        // 쿼리를 실행한다.
			response.setSuccess(true);
		}
		catch(Exception e)
		{
			System.out.println(e.toString());
			response.setSuccess(false);
		}
		return response;
	}
	
	//public Response getProgressRate(String WORK_NAME)
	public Response getProgressRate(String WORK_ID)
	{
		List<ProcessRate> ProcessRate_list = new ArrayList<ProcessRate>();
		
		Response response = new Response();
		Connection conn = null;                                        // null로 초기화 한다.
		PreparedStatement pstmt = null;
		int PROGRESS = 0;
		int TOTALCOUNT = 0;
		int STATUS = 0;
		try 
		{
		    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
		    	String id = jdbc_username; //"root";                                                    // 사용자 계정
		    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드

		    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
				conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
				
				ResultSet rs = null;
				String sql = "";
				sql = "SELECT PROGRESS, TOTALCOUNT, STATUS, LOG FROM DBWORK_PROCESS WHERE PROCESS_ID  ";
				//sql += "IN (SELECT PROCESS_ID FROM DBWORK_HISTORY WHERE WORK_NAME = ?)";
				sql += "IN (SELECT PROCESS_ID FROM DBWORK_HISTORY WHERE WORK_ID = ?)";
				
				pstmt = conn.prepareStatement(sql);						
					
				//pstmt.setString(1, WORK_NAME);
				pstmt.setInt(1, Integer.parseInt(WORK_ID));
				
				rs  = pstmt.executeQuery();
				while(rs.next())
				{
					ProcessRate pr = new ProcessRate();
					
					PROGRESS = rs.getInt("PROGRESS");
					TOTALCOUNT = rs.getInt("TOTALCOUNT");
					STATUS = rs.getInt("STATUS");
					
					pr.setStatus(STATUS);
					pr.setProgress(PROGRESS);
					pr.setTotalcount(TOTALCOUNT);
					pr.setLog(rs.getString("LOG"));
					ProcessRate_list.add(pr);
				}
				pstmt.close();
				conn.close();
				response.getList().addAll(ProcessRate_list);
	            response.setTotal(ProcessRate_list.size());
	            response.setSuccess(true);					
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
	}

	public Response getWorkNameParameter(String WORK_ID)
	{
		List<WorkNameParameter> WorkNameParameter_list = new ArrayList<WorkNameParameter>();		
		Response response = new Response();
		Connection conn = null;                                        // null로 초기화 한다.
		PreparedStatement pstmt = null;
		try 
		{
		    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
		    	String id = jdbc_username; //"root";                                                    // 사용자 계정
		    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
		    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
				conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
				Statement stmt = conn.createStatement();
				String sql = "";
				
				sql = "SELECT DATABASE_NAME, TABLE_NAME, ENGINE_ID, ENGINE_NAME, WORK_ID, WORK_NAME, DATABASE_TYPE, DATABASE_ADDRESS, DATABASE_PORT, ID, PASSWORD FROM DBWORK_HISTORY ";
				sql += "WHERE WORK_ID = " + WORK_ID;
				
				stmt.execute(sql);
				ResultSet rs_DBWORK_HISTORY = stmt.getResultSet();
								
				String ENGINE_NAME ="";
				String Engine_ID = "";
				String WORK_NAME = "";				
				WorkNameParameter workNameParam = new WorkNameParameter();
				if (rs_DBWORK_HISTORY.next()) 
				{	
					workNameParam.setDatabaseType(rs_DBWORK_HISTORY.getString("DATABASE_TYPE").trim());
					workNameParam.setDatabaseAddress(rs_DBWORK_HISTORY.getString("DATABASE_ADDRESS").trim());
					workNameParam.setDatabasePort(rs_DBWORK_HISTORY.getString("DATABASE_PORT").trim());
					workNameParam.setDatabaseId(rs_DBWORK_HISTORY.getString("ID").trim());
					workNameParam.setDatabasePassword(rs_DBWORK_HISTORY.getString("PASSWORD").trim());
					
					workNameParam.setDATABASE_NAME(rs_DBWORK_HISTORY.getString("DATABASE_NAME").trim());
					workNameParam.setTABLE_NAME(rs_DBWORK_HISTORY.getString("TABLE_NAME").trim());
					
					//WORK_ID = rs_DBWORK_HISTORY.getInt("WORK_ID");
					ENGINE_NAME = rs_DBWORK_HISTORY.getString("ENGINE_NAME");
					Engine_ID = rs_DBWORK_HISTORY.getInt("ENGINE_ID")+"";
				
					WorkNameParameter_list.add(workNameParam);
				}
				rs_DBWORK_HISTORY.close();				
				sql = "SELECT PROGRESS, TOTALCOUNT,  STATUS, SQLSTATEMENT, HDFSPATH FROM DBWORK_PROCESS ";
				sql += "WHERE WORK_ID = " + WORK_ID;
				stmt.execute(sql);
				
				ResultSet rs_DBWORK_PROCESS = stmt.getResultSet();
				
				rs_DBWORK_PROCESS = stmt.getResultSet();
				
				if(rs_DBWORK_PROCESS.next()) 
				{
					workNameParam.setSTATUS(rs_DBWORK_PROCESS.getInt("STATUS"));
					workNameParam.setPROGRESS(rs_DBWORK_PROCESS.getString("PROGRESS"));
					workNameParam.setSQLSTATEMENT(rs_DBWORK_PROCESS.getString("SQLSTATEMENT"));
					workNameParam.setHDFSPATH(rs_DBWORK_PROCESS.getString("HDFSPATH"));
					workNameParam.setTOTALCOUNT(rs_DBWORK_PROCESS.getString("TOTALCOUNT"));
					
					workNameParam.setENGINEID(Engine_ID);
					workNameParam.setENGINENAME(ENGINE_NAME);
					
				}
				response.getList().addAll(WorkNameParameter_list);
	            response.setTotal(WorkNameParameter_list.size());
	            response.setSuccess(true);	
	            stmt.close();
				conn.close();
				
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
	}
	
	public Response work_name_list(	)
	{
		List<WorkName> workName_list = new ArrayList<WorkName>();
		
		Response response = new Response();
		Connection conn = null;                                        // null로 초기화 한다.
		PreparedStatement pstmt = null;
		
		String s = System.getProperty("user.dir");

	    System.out.println("현재 디렉토리는 " + s + " 입니다");

		try 
		{
		    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
		    	String id = jdbc_username; //"root";                                                    // 사용자 계정
		    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
		    	
		    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
				conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.

				
				Statement stmt = conn.createStatement();
				String sql = "SELECT WORK_ID, WORK_NAME FROM DBWORK_HISTORY";
				
				stmt.execute(sql);
				
				ResultSet rs = stmt.getResultSet();
				
				while (rs.next()) 
				{
					System.out.println(rs.getString("WORK_NAME") );
					System.out.println(rs.getInt("WORK_ID") );
					
					WorkName workName = new WorkName();
					workName.setWorkName(rs.getString("WORK_NAME").trim());
					workName.setWorkId(rs.getInt("WORK_ID")+"");
					
					workName_list.add(workName);
				}
				response.getList().addAll(workName_list);
	            response.setTotal(workName_list.size());
	            response.setSuccess(true);		
	            
	            stmt.close();
	            conn.close();
	            
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
	}
	
    public Response getDBlist(String db_address, String DBTYPE, String db_port, String id, String pw)
    {
    	List<DataBaseList> db_list = new ArrayList<DataBaseList>();
		
		Response response = new Response();
		try 
		{
			Connection conn = null;
			
			String address_part1 = db_address.substring(0, 1);
			
			if(isInteger(address_part1))
			{
				//conn =	DriverManager.getConnection("jdbc:mysql://" + db_address +":" + db_port , id , pw);
				if(DBTYPE.equals("MySQL") == true)
				{
					Class.forName("com.mysql.jdbc.Driver").newInstance();			
					conn =	DriverManager.getConnection("jdbc:mysql://" + db_address  +":" + db_port , id , pw);
				}
				else if(DBTYPE.equals("MSSQL") == true)
				{
					Class.forName("net.sourceforge.jtds.jdbc.Driver");
					conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" +db_address +":" + db_port , id , pw);
				}
			}
			else
			{
				try
				{
					InetAddress address = InetAddress.getByName(db_address);
					//conn =	DriverManager.getConnection("jdbc:mysql://" + address.getHostAddress() +":" + db_port , id , pw);
					if(DBTYPE.equals("MySQL") == true)
					{
						Class.forName("com.mysql.jdbc.Driver").newInstance();			
						conn =	DriverManager.getConnection("jdbc:mysql://" + address.getHostAddress()   +":" + db_port , id , pw);
					}
					else if(DBTYPE.equals("MSSQL") == true)
					{
						Class.forName("net.sourceforge.jtds.jdbc.Driver");
						conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" +address.getHostAddress()  +":" + db_port , id , pw);
					}
					
				}
				catch(Exception ex)
				{
					System.out.println("SQLException: " + ex.getMessage());
					
					response.setSuccess(false);
		            response.getError().setMessage(ex.getMessage());
		           
		            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		        	return response;
				}
			
			}
			
			ResultSet rs = conn.getMetaData().getCatalogs();
		
			while (rs.next()) 
			{
				System.out.println(rs.getString("TABLE_CAT") );
				
				DataBaseList db = new DataBaseList();
				db.setDatabaseName(rs.getString("TABLE_CAT"));
				
				db_list.add(db);
			}
			response.getList().addAll(db_list);
            response.setTotal(db_list.size());
            response.setSuccess(true);	
            rs.close();
            conn.close();
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
    }
 
    public Response getTableList(String db_address, String DBTYPE, String db_port, String id, String pw,String dbname)
    {
    	List<TableList>  table_list = new ArrayList<TableList>();
		
		Response response = new Response();
		try 
		{
				Connection conn = null;
				//conn =	DriverManager.getConnection( "jdbc:mysql://" + db_address +"/"+ dbname, id , pw);
				ResultSet rs   = null;
				if(DBTYPE.equals("MySQL") == true)
				{
					Class.forName("com.mysql.jdbc.Driver").newInstance();			
					conn =	DriverManager.getConnection("jdbc:mysql://" + db_address  +":" + db_port + "/"+dbname, id , pw);
					DatabaseMetaData md = conn.getMetaData();
					rs = md.getTables(null, null, "%", null);
					while (rs.next()) 
					{
					  
					  	TableList table = new TableList();
						table.setTableName(rs.getString(3));
						
						table_list.add(table);
					}
				}
				else if(DBTYPE.equals("MSSQL") == true)
				{
					Class.forName("net.sourceforge.jtds.jdbc.Driver");	
					conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" + db_address  +":" + db_port + "/"+dbname , id , pw);
					Statement statement = conn.createStatement(); 
					rs = statement.executeQuery("SELECT * FROM INFORMATION_SCHEMA.TABLES");		
					while(rs.next())
					{
						TableList table = new TableList();
						table.setTableName(rs.getString(3));
						
						table_list.add(table);
					}
				}
				response.getList().addAll(table_list);
	            response.setTotal(table_list.size());
	            response.setSuccess(true);	
	            rs.close();
	            conn.close();
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
    }
    
    public Response getGetFields(String db_address, String DBTYPE, String db_port,  String id, String pw, String dbname,	String tablename)
    {
    	List<FieldList>  Field_list = new ArrayList<FieldList>();
		
		Response response = new Response();
		try 
		{
				Connection conn = null;						
				ResultSet results = null;
				if(DBTYPE.equals("MySQL") == true)
				{
					Class.forName("com.mysql.jdbc.Driver").newInstance();			
					conn =	DriverManager.getConnection("jdbc:mysql://" + db_address  +":" + db_port +"/" + dbname , id , pw);
					
					Statement statement = conn.createStatement(); 
					results = statement.executeQuery("SELECT * FROM " +tablename + " LIMIT 1");			
					
					// Get resultset metadata						
					ResultSetMetaData metadata = results.getMetaData();						
					int columnCount = metadata.getColumnCount();						
					for (int i=1; i<=columnCount; i++) {						
					  String columnName = metadata.getColumnName(i);
					  String columnType = metadata.getColumnTypeName(i);
					
					  System.out.println(columnName);				
					  
					  FieldList field = new FieldList();
					  field.setFieldName(columnName);
					  field.setFieldType(columnType);
					  Field_list.add(field);
					}
					
				}
				else if(DBTYPE.equals("MSSQL") == true)
				{
					Class.forName("net.sourceforge.jtds.jdbc.Driver");	
					conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" + db_address  +":" + db_port +"/" + dbname, id , pw);
					Statement statement = conn.createStatement();
		    		
					results = statement.executeQuery("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo'");
		    		while(results.next())
		    		{
		    			System.out.println(results.getString("TABLE_NAME") + ":" + results.getString("COLUMN_NAME"));
		    			FieldList field = new FieldList();
		    			field.setFieldName(results.getString("COLUMN_NAME"));
		    			field.setFieldType(results.getString("DATA_TYPE"));
		    			Field_list.add(field);
		    		}
				}		
				
				response.getList().addAll(Field_list);
	            response.setTotal(Field_list.size());
	            response.setSuccess(true);	
	            
	            results.close();
	            conn.close();
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
    }
    
    public Response sqlhead(String db_address, String DBTYPE, String db_port, String id, String pw,String dbname, String tablename,String query)
    {
    	List<PreviewSQLHead>  PreviewSQLHead_List = new ArrayList<PreviewSQLHead>();	
		Response response = new Response();
		try 
		{
				Class.forName("com.mysql.jdbc.Driver").newInstance();						
				Connection conn = null;			
				ResultSet rs  = null;
				//conn =	DriverManager.getConnection( "jdbc:mysql://" + db_address +"/"+ dbname, id, pw);						
				if(DBTYPE.equals("MySQL") == true)
				{
					Class.forName("com.mysql.jdbc.Driver").newInstance();			
					conn =	DriverManager.getConnection("jdbc:mysql://" + db_address  +":" + db_port  +"/" + dbname, id , pw);
					
					Statement statement = conn.createStatement(); 
					rs = statement.executeQuery(query);	
					
					ResultSetMetaData rsmd = rs.getMetaData();
					int columnsNumber = rsmd.getColumnCount();
					//get columns name
					for(int ci = 1; ci <= columnsNumber; ci ++)
					{
						PreviewSQLHead head = new PreviewSQLHead();
						head.setPreviewSQLHead(rsmd.getColumnName(ci));						
						PreviewSQLHead_List.add(head);
					}
				}
				else if(DBTYPE.equals("MSSQL") == true)
				{
					Class.forName("net.sourceforge.jtds.jdbc.Driver");	
					conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" + db_address  +":" + db_port +"/" + dbname , id , pw);
					
					Statement statement = conn.createStatement();		    		
		    		rs = statement.executeQuery("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo'");
		    		while(rs.next())
		    		{
		    			PreviewSQLHead head = new PreviewSQLHead();
						head.setPreviewSQLHead(rs.getString("COLUMN_NAME"));						
						PreviewSQLHead_List.add(head);
		    		}
				}			
				response.getList().addAll(PreviewSQLHead_List);
	            response.setTotal(PreviewSQLHead_List.size());
	            response.setSuccess(true);	
	            rs.close();
	            conn.close();
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
    }
    
    public Response sqlrun(String db_address, String DBTYPE, String db_port, 	String id,	String pw,String dbname,String tablename,String query)
    {
    	List<HashMap>  PreviewSQLBody_List = new ArrayList<HashMap>();
		List<PreviewSQLHead>  PreviewSQLHead_List = new ArrayList<PreviewSQLHead>();
		Response response = new Response();
		try 
		{
				Connection conn = null;						
				//conn =	DriverManager.getConnection( "jdbc:mysql://" + db_address +"/"+ dbname, id, pw);				
				ResultSet rs = null;
				if(DBTYPE.equals("MySQL") == true)
				{
					Class.forName("com.mysql.jdbc.Driver").newInstance();			
					conn =	DriverManager.getConnection("jdbc:mysql://" + db_address  +":" + db_port +"/" +dbname  , id , pw);
					Statement statement = conn.createStatement(); 
					//필드 정보만 획득.
					if(query.indexOf("limit 100") == -1)
					{
						query = query + " limit 100";
					}
					rs = statement.executeQuery(query);				
					ResultSetMetaData rsmd = rs.getMetaData();
					int columnsNumber = rsmd.getColumnCount();				
					HashMap<String, List> rtn_table  = new HashMap<String, List>();		
					
					//get columns name
					for(int ci = 1; ci <= columnsNumber; ci ++)
					{
						PreviewSQLHead head = new PreviewSQLHead();
						head.setPreviewSQLHead(rsmd.getColumnName(ci));						
						PreviewSQLHead_List.add(head);
					}						
					response.getMap().put("HEAD", PreviewSQLHead_List);
					
					//제한적 쿼리 실행.
					PreviewSQLBody body_sql = new PreviewSQLBody();
					int limit = 0;
					while(rs.next())
					{
						HashMap<String, String> field_map = new HashMap<String, String>();
						for(int columnIndex = 1; columnIndex <= columnsNumber; columnIndex++)
						{								
							field_map.put(rsmd.getColumnName(columnIndex), rs.getString(columnIndex));
						}	
						PreviewSQLBody_List.add(field_map);
						limit++;
						if(limit > 100)
						{
							break;
						}
					}
					response.getMap().put("BODY", PreviewSQLBody_List);
		            response.setTotal(PreviewSQLBody_List.size());
		            response.setSuccess(true);	
		            rs.close();
		            conn.close();
				}
				else if(DBTYPE.equals("MSSQL") == true)
				{
					Class.forName("net.sourceforge.jtds.jdbc.Driver");	
					conn =	DriverManager.getConnection("jdbc:jtds:sqlserver://" + db_address  +":" + db_port +"/" +dbname , id , pw);
				
					Statement statement = conn.createStatement();
					/*
					//필드 정보만 획득.
					rs = statement.executeQuery("SELECT TABLE_NAME, COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'dbo'");
					ResultSetMetaData rsmd = rs.getMetaData();    		
					int columnsNumber = rsmd.getColumnCount();
					
		    		HashMap<String, List> rtn_table  = new HashMap<String, List>();	
		    		while(rs.next())
		    		{
		    			System.out.println(rs.getString("TABLE_NAME") + ":" + rs.getString("COLUMN_NAME")+":" + rs.getString("DATA_TYPE"));
		    			PreviewSQLHead head = new PreviewSQLHead();
						head.setPreviewSQLHead(rs.getString("COLUMN_NAME"));						
						PreviewSQLHead_List.add(head);
		    		}
		    		response.getMap().put("HEAD", PreviewSQLHead_List);
		    		rs.close();
		    		
		    		//제한적 쿼리 실행.
		    		rs = statement.executeQuery(query);
					rsmd = rs.getMetaData();    	
					
		    		PreviewSQLBody body_sql = new PreviewSQLBody();
					int limit = 0;
					while(rs.next())
					{
						HashMap<String, String> field_map = new HashMap<String, String>();
						for(int columnIndex = 1; columnIndex <= columnsNumber; columnIndex++)
						{								
							System.out.println(rsmd.getColumnName(columnIndex)+":" + rs.getString(columnIndex));
							
							field_map.put(rsmd.getColumnName(columnIndex), rs.getString(columnIndex));
						}	
						PreviewSQLBody_List.add(field_map);
						limit++;
						if(limit > 100)
						{
							break;
						}
					}
					response.getMap().put("BODY", PreviewSQLBody_List);
		            response.setTotal(PreviewSQLBody_List.size());
		            response.setSuccess(true);	
		            rs.close();
		            conn.close();
		            */
					//필드 정보만 획득.
					if(query.indexOf("TOP 100") == -1)
					{
						query = query.replace("select", "select top 100 ");
					}
					
					rs = statement.executeQuery(query);				
					ResultSetMetaData rsmd = rs.getMetaData();
					int columnsNumber = rsmd.getColumnCount();				
					HashMap<String, List> rtn_table  = new HashMap<String, List>();		
					
					//get columns name
					for(int ci = 1; ci <= columnsNumber; ci ++)
					{
						PreviewSQLHead head = new PreviewSQLHead();
						head.setPreviewSQLHead(rsmd.getColumnName(ci));						
						PreviewSQLHead_List.add(head);
					}						
					response.getMap().put("HEAD", PreviewSQLHead_List);
					
					//제한적 쿼리 실행.
					PreviewSQLBody body_sql = new PreviewSQLBody();
					int limit = 0;
					while(rs.next())
					{
						HashMap<String, String> field_map = new HashMap<String, String>();
						for(int columnIndex = 1; columnIndex <= columnsNumber; columnIndex++)
						{								
							field_map.put(rsmd.getColumnName(columnIndex), rs.getString(columnIndex));
						}	
						PreviewSQLBody_List.add(field_map);
						limit++;
						if(limit > 100)
						{
							break;
						}
					}
					response.getMap().put("BODY", PreviewSQLBody_List);
		            response.setTotal(PreviewSQLBody_List.size());
		            response.setSuccess(true);	
		            rs.close();
		            conn.close();
				}
				
				
		}
		catch(Exception ex)
		{
			System.out.println("SQLException: " + ex.getMessage());
			
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
    }
    
    public Response workdashboard_list(long engineID, String START, 
			String END, String STATUS, String WORKNAME)
	{
		List<WorkDashBoard> worklist = new ArrayList<WorkDashBoard>();
		Response response = new Response();
		Connection conn = null;                                        // null로 초기화 한다.
		String fs_path = System.getProperty("user.dir");
		logger.info(fs_path);
		try 
		{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			
			//ResultSet rs = null;
			String sql = "";		
			Statement statement = conn.createStatement(); 
		
			sql = "SELECT  B.DATABASE_TYPE, B.DATABASE_ADDRESS, B.DATABASE_PORT,";
			sql +=" B.ID, B.PASSWORD, ";
			sql +=" A.START_TIME, A.END_TIME, A.STATUS, B.USER, B.WORK_ID,B.WORK_NAME,  A.PROGRESS, A.TOTALCOUNT,B.DATABASE_NAME,   B.TABLE_NAME,   A.SQLSTATEMENT,  A.HDFSPATH";
			sql += " FROM DBWORK_PROCESS A, DBWORK_HISTORY B";
			sql += " WHERE A.PROCESS_ID = B.PROCESS_ID";
			sql += " AND B.ENGINE_ID = " + (int) engineID ;
			
			if(START.length() > 0)
			{
				//sql += " AND A.START_TIME LIKE '%" + START +"%'" ;
				sql += " AND START_TIME >= '" + START + " 00:00:00'" ;
			}
			if(END.length() > 0)
			{
				//sql += " OR A.END_TIME LIKE '%" + END +"%'" ;
				sql += " AND END_TIME <= '" + END + " 24:00:00'";
			}
			if(STATUS.length() > 0)
			{
				if(STATUS.equals("RUNNING") == true)
				{
					sql += " AND A.STATUS =" + 2;
				}
				else if(STATUS.equals("SUCCESS") == true)
				{
					sql += " AND A.STATUS =" + 3;
				}
				else if(STATUS.equals("FAIL") == true)
				{
					sql += " AND A.STATUS =" + 4;
				}
				else if(STATUS.equals("KILL") == true)
				{
					sql += " AND A.STATUS =" + 5;
				}
			}
			if(WORKNAME.length() > 0)
			{
				sql += " AND B.WORK_NAME LIKE '%" + WORKNAME + "%'";
			}	
			System.out.println(sql);	
			ResultSet rs = statement.executeQuery(sql);
			while(rs.next())
			{
				WorkDashBoard work = new WorkDashBoard();		
				work.setDATABASE_TYPE(rs.getString("DATABASE_TYPE"));				
				work.setDATABASE_ADDRESS(rs.getString("DATABASE_ADDRESS"));				
				work.setDATABASE_PORT(rs.getString("DATABASE_PORT"));				
				work.setDATABASE_ID(rs.getString("ID"));				
				work.setDATABASE_PASSWORD(rs.getString("PASSWORD"));
				
				work.setWorkname(rs.getString("WORK_NAME"));
				work.setWorkid(rs.getInt("WORK_ID")+"");
				work.setDbname(rs.getString("DATABASE_NAME"));
				work.setTablename(rs.getString("TABLE_NAME"));
				work.setQuery(rs.getString("SQLSTATEMENT"));				
				work.setHdfs(rs.getString("HDFSPATH"));				
				work.setStart_time(rs.getString("START_TIME"));				
				work.setEnd_time(rs.getString("END_TIME"));				
				work.setUser(rs.getString("USER"));				
				switch(rs.getInt("STATUS"))
				{
					case 0:
					case 1:
						work.setStatus("RUNNING");
						break;
					case 2:
						work.setStatus("RUNNING");
						break;
					case 3:
						work.setStatus("SUCCESS");
						break;
					case 4:
						work.setStatus("FAIL");
						break;
					case 5:
						work.setStatus("KILL");
						break;
				}			
				
				int progress = rs.getInt("PROGRESS");
				int totalcount = rs.getInt("TOTALCOUNT");
				double rate =  ((double)progress / (double)totalcount )* 100;
				work.setProgress((long)rate);				
				worklist.add(work);
			}			
			
			response.getList().addAll(worklist);
            response.setTotal(worklist.size());
            response.setSuccess(true);	        
            
			rs.close();
			conn.close();      
		}
		catch(Exception ex)
		{
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
	}    
    public Response kill_work(String WORK_NAME)
	{
    	Response response = new Response();
		Connection conn = null;                                        // null로 초기화 한다.		
		PreparedStatement pstmt = null;
    	try 
		{
	    	String url = jdbc_url; //"jdbc:mysql://localhost:3306/";        // 사용하려는 데이터베이스명을 포함한 URL 기술
	    	String id = jdbc_username; //"root";                                                    // 사용자 계정
	    	String pw = jdbc_password; //"";                                                // 사용자 계정의 패스워드
	    	
	    	Class.forName(jdbc_driver/*"com.mysql.jdbc.Driver"*/);                       // 데이터베이스와 연동하기 위해 DriverManager에 등록한다.
			conn=DriverManager.getConnection(url,id,pw);              // DriverManager 객체로부터 Connection 객체를 얻어온다.
			//ResultSet rs = null;
			String sql = "";		
			Statement statement = conn.createStatement(); 		
			sql = "UPDATE DBWORK_PROCESS P ";			
			sql += 	"INNER JOIN DBWORK_HISTORY H ON H.PROCESS_ID = P.PROCESS_ID  SET P.STATUS = 5 ";
			sql += 	" WHERE H.WORK_NAME = '" + WORK_NAME + "' AND P.STATUS NOT IN (3)";				
			pstmt = conn.prepareStatement(sql); 		
			pstmt.executeUpdate(); 
			response.setSuccess(true);
		}
    	catch(Exception ex)
		{
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
	}

    public Response DirectoryFile_Exit(String strPath)
    {
    	
    	Response response = new Response();
    	try
    	{
    		FileSystem hdfs =null;
	    	Configuration conf = new Configuration();
			//conf.addResource(new Path("/Users/ankus/hadoop/conf/core-site.xml"));
		    //conf.addResource(new Path("/Users/ankus/hadoop/conf/hdfs-site.xml"));
			hdfs = FileSystem.get(conf);
			int importFileCount = 0;
    		FileStatus[] status = hdfs.listStatus(new Path(strPath));
			if(status == null)
			{
				response.setSuccess(true);//Path Not exist
				//response.getError().setMessage("-1");
				return response;
			}
			else
			{
				
				for (int i=0;i<status.length;i++)
	            {
					Path path = status[i].getPath();
					String filename = path.toString();
					String[] filepattern  = filename.split("/dbimport");
					if(filepattern.length > 0)
					{
						importFileCount++;
					}
	            }			
			
				if(importFileCount > 0)
				{
					response.setSuccess(false);//Importing Directory is not empty
					response.getError().setMessage("-2");
					return response;
				}
				else
				{
					response.setSuccess(true);//Path is empty
					//response.getError().setMessage("-1");
					return response;
				}
			}
			
    	}
    	catch(Exception ex)
		{
			response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
		}
		return response;
    }

}
