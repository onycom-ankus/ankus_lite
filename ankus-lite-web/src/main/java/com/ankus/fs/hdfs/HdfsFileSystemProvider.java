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

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang.SystemUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.*;
import org.apache.hadoop.fs.permission.AclEntry;
import org.apache.hadoop.fs.permission.FsAction;
import org.apache.hadoop.fs.permission.FsPermission;
import org.apache.hadoop.hdfs.DFSClient;
import org.apache.hadoop.hdfs.protocol.FSConstants;
import org.apache.hadoop.util.StringUtils;
import com.ankus.core.exception.FileSystemException;
import com.ankus.model.rest.Authority;
import com.ankus.model.rest.Context;
import com.ankus.model.rest.FileInfo;
import com.ankus.model.rest.HadoopCluster;
import com.ankus.provider.fs.FileSystemProvider;
import com.ankus.provider.locale.ResourceBundleRetreiver;
import com.ankus.util.FileUtils;
import com.ankus.util.HdfsUtils;
import org.springframework.util.AntPathMatcher;
import org.springframework.util.FileCopyUtils;
import org.springframework.util.PathMatcher;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.util.*;

import static org.apache.hadoop.util.StringUtils.byteDesc;
import static org.apache.hadoop.util.StringUtils.formatPercent;
import static com.ankus.model.rest.Context.AUTORITY;
import static com.ankus.model.rest.Context.HADOOP_CLUSTER;

/**
 * Hadoop HDFS File System Provider.
 * 사용자의 요청마다 생성되는 File System Provider는 다수의 Hadoop Cluster를 지원하기 위해서
 * Workflow Engine에 File System과 관련된 정보를 전달한다. Workflow Engine은 Hadoop Cluster 정보를 받아서
 * File System Provider를 생성한 후 File System 관련 작업을 수행하게 된다.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsFileSystemProvider implements FileSystemProvider<org.apache.hadoop.fs.FileSystem> {

    /**
     * HDFS File System
     */
    private org.apache.hadoop.fs.FileSystem fs;

    /**
     * User Authority
     */
    private Authority authority;

    /**
     * Apache Ant Path Pattern Matcher
     */
    private final static PathMatcher antPathMatcher = new AntPathMatcher();

    private ResourceBundleRetreiver bundle;

    /**
     * 기본 생성자.
     */
    private HdfsFileSystemProvider() {
        // Nothing
    }

    /**
     * 기본 생성자.
     *
     * @param context File System Context
     */
    public HdfsFileSystemProvider(Context context) {
        HadoopCluster hadoopCluster = (HadoopCluster) context.getObject(HADOOP_CLUSTER);
        this.authority = (Authority) context.getObject(AUTORITY);
        
//        System.out.printf("HdfsFileSystemProvider====>[%s]\n", this.authority.getName());
        System.out.printf("HdfsFileSystemProvider====>[%s|%s]\n", this.authority.getUsername(),this.authority.toString());
        
        this.bundle = (ResourceBundleRetreiver) context.getObject(ResourceBundleRetreiver.KEY);
        try {
        	if(this.authority.getSecurityLevel()==com.ankus.model.rest.SecurityLevel.SUPER)
        	{
                System.out.printf("Admin Level access...[%s:%s]\n", hadoopCluster.getHdfsUrl(), this.authority.getUsername());
        		this.fs = FileSystem.get(HdfsHelper.getConfiguration(hadoopCluster));
        	}
        	else
        	{
                System.out.printf("User Level access...[%s:%s]\n", hadoopCluster.getHdfsUrl(), this.authority.getUsername());
        		this.fs = FileSystem.get(HdfsHelper.getConfiguration(hadoopCluster)); 
        		Path home = new Path("/user/"+this.authority.getUsername());
                System.out.printf("User Home check...[%s]\n", home);
        		if(!this.fs.exists(home))
        		{
                    System.out.printf("User Home path not exist...[%s]\n", home);
        			this.fs.mkdirs(home);
        			
        			for(int i=0; i<10; i++) // path create waiting...
        			{
        				if(this.fs.exists(home)) break;
        				Thread.sleep(200);
        			}
        			this.fs.setOwner(home, this.authority.getUsername(), "user");
        			this.fs.setPermission(home, FsPermission.valueOf("drwx------"));
        		}
        		this.fs.close(); 
        		this.fs = FileSystem.get(new java.net.URI(hadoopCluster.getHdfsUrl()), HdfsHelper.getConfiguration(hadoopCluster), this.authority.getUsername());
        		
        	}
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_ACCESS_FS", hadoopCluster.getHdfsUrl()), ex);
            throw new FileSystemException(String.format("We couldn\'t access the HDFS file sytem ($s)", hadoopCluster.getHdfsUrl()), ex);
        }
    }

    @Override
    public List<FileInfo> list(String path, boolean directoryOnly) {
        List<FileInfo> fileInfos = new ArrayList<FileInfo>();

        Configuration c = fs.getConf();
//        c.set("dfs.permissions.superusergroup", "supergroup");
//        fs.setConf(c);
        
        System.out.printf("path====>[%s][%s]\n", path, c.get("fs.default.name"));
        
        try {
        	
        	String homepath = fs.getHomeDirectory().toString();
        	int hp = homepath.indexOf("/user/");
        	if(hp>0) homepath = homepath.substring(hp);
        	Path home = new Path(homepath);
        	String group="", user="";
        	if(fs.exists(home))
        	{
        		group = fs.getFileStatus(home).getGroup();
        		user = fs.getFileStatus(home).getOwner();
        	}
        	
        	
            FileStatus[] files = null;
            if (directoryOnly) {
                files = fs.listStatus(new Path(path), new HdfsDirectoryPathFilter(fs, user, group));
            } else {
                files = fs.listStatus(new Path(path), new HdfsDirectoryPathFilter(fs, user, group, false));
            }
            
//            System.out.printf("filescnt__====>[%d]\n", files.length);
            
            for (FileStatus file : files) {

//                System.out.printf("file====>[%s]\n", file.getPath());
            	
                fileInfos.add(new HdfsFileInfo(file));
            }
//            System.out.printf("filereadok====>[%d]\n", files.length);
            
            
            return fileInfos;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_GET_LIST", path), ex);
            throw new FileSystemException(String.format("We weren\'t able to get directories and files from the path \"%s\"", path), ex);
        }
    }

    @Override
    public List<FileInfo> list(String path) {
        List<FileInfo> fileInfos = new ArrayList<FileInfo>();
        try {
            FileStatus[] files = fs.listStatus(new Path(path), new PathFilter() {
                @Override
                public boolean accept(Path path) {
                    try {
                        return fs.isFile(path);
                    } catch (IOException e) {
                        // Hadoop FileSystem Access Error
                    }
                    return false;
                }
            });

            for (FileStatus file : files) {
                fileInfos.add(new HdfsFileInfo(file));
            }
            return fileInfos;
        } catch (Exception ex) {
            throw new FileSystemException(String.format("We weren\'t able to get directories and files from the path \"%s\"", path), ex);
        }
    }

    @Override
    public boolean exists(String path) {
        try {
            return fs.exists(new Path(path));
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_CHECK_EXIST", path), ex);
            throw new FileSystemException(String.format("We couldn\'t find the path \"%s\"", path), ex);
        }
    }

    @Override
    public int getCount(String path, boolean directoryOnly) {
        try {
            return this.list(path, directoryOnly).size();
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_GET_COUNTS", path), ex);
            throw new FileSystemException(String.format("The number of directories and files from the path \"%s\" is unavailable", path), ex);
        }
    }

    @Override
    public long getSize(String path, boolean directoryOnly) {
        long sumSize = 0;

        for (FileInfo fileInfo : this.list(path, directoryOnly)) {
//            sumSize += fileInfo.getBlockSize();
          sumSize += fileInfo.getLength();
        }

        return sumSize;
    }

    @Override
    public byte[] load(String path, String filename) {
        InputStream content = null;
        try {
            content = getContent(path);
            return FileCopyUtils.copyToByteArray(content);
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_LOAD_FILE", path), ex);
            throw new FileSystemException(String.format("We couldn\'t load the file \"%s\"", path), ex);
        } finally {
            IOUtils.closeQuietly(content);
        }
    }

    @Override
    public byte[] load(String path, long offset, int len) {
    	FSDataInputStream content = null;
        try {
            content = (FSDataInputStream) getContent(path);
            byte[] buff = new byte[len];
//            int read = content.read(buff, offset, len);
            
            content.readFully(offset, buff);
            long read = len;
            
//            int read = IOUtils.read(content, buff, offset, len);
            
            System.out.printf("load===========> buff=%d,%d, read=%d\n", len, buff.length, read);
            return read==len?buff:Arrays.copyOf(buff, (int)read);
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_LOAD_FILE", path), ex);
            throw new FileSystemException(String.format("We couldn\'t load the file \"%s\"", path), ex);
        } finally {
            IOUtils.closeQuietly(content);
        }
    }

    @Override
    public String readlines(String path, int linecnt) {
        InputStream content = null;
        try {
            content = getContent(path);
            
            BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(content));
            
            String line, lines = "";
            while ((line = bufferedReader.readLine()) != null) {
            	lines += line+"\n";
            	linecnt--;
            	if(linecnt<=0) break;
            }
            bufferedReader.close();
            return lines;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_LOAD_FILE", path), ex);
            throw new FileSystemException(String.format("We couldn\'t load the file \"%s\"", path), ex);
        } finally {
            IOUtils.closeQuietly(content);
        }
    }
    
    @Override
    public FileInfo getFileInfo(String path) {
        try {
            FileStatus fileStatus = fs.getFileStatus(new Path(path));
            HdfsFileInfo hdfsFileInfo = new HdfsFileInfo(fileStatus);

            // permission check...
            
/*        	String homepath = fs.getHomeDirectory().toString();
        	int hp = homepath.indexOf("/user/");
        	if(hp>0) homepath = homepath.substring(hp);
        	Path home = new Path(homepath);
        	String group="", owner="";
        	if(fs.exists(home))
        	{
        		group = fs.getFileStatus(home).getGroup();
        		owner = fs.getFileStatus(home).getOwner();
        	}
        	
        	if(group.isEmpty()) return true;
        	
        	if(fileStatus.getPermission().getOtherAction().implies(FsAction.READ)) return true;
        	if(fileStatus.getPermission().getGroupAction().implies(FsAction.READ) && fileStatus.getGroup().equals(group)) return true;
        	if(fileStatus.getPermission().getUserAction().implies(FsAction.READ) && fileStatus.getOwner().equals(owner)) return true;
*/            
            ContentSummary summary = fs.getContentSummary(new Path(path));
            hdfsFileInfo.setBlockSize(fileStatus.getBlockSize());
            hdfsFileInfo.setReplication(fileStatus.getReplication());
            hdfsFileInfo.setDirectoryCount(summary.getDirectoryCount());
            hdfsFileInfo.setFileCount(summary.getFileCount());
            hdfsFileInfo.setQuota(summary.getQuota());
            hdfsFileInfo.setSpaceQuota(summary.getSpaceQuota());
            hdfsFileInfo.setSpaceConsumed(StringUtils.byteDesc(summary.getSpaceConsumed()));
            hdfsFileInfo.setLength(summary.getLength());

            return hdfsFileInfo;
        } catch (Exception ex) {
        	
        	return null; // 권한 없으면 null
        			
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_GET_FILE_INFO", path), ex);
//            throw new FileSystemException(String.format("File and directory information from the path \"%s\" is unavailable", path), ex);
        }
    }

    @Override
    public InputStream getContent(String path) {
        if (!exists(path) || !getFileInfo(path).isFile()) {
//            throw new FileSystemException(bundle.message("S_FS", "NOT_EXISTS_AND_NOT_FILE", path));
        	throw new FileSystemException(String.format("The path \"%s\" doesn\'t exist or is not a file", path));
        }

        try {
            return HdfsUtils.getInputStream(fs, path);
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_OPEN_IS", path));
            throw new FileSystemException(String.format("We couldn\'t get the input string from the path \"%s\". Please check the file system", path));
        }
    }

    /**
     * HDFS의 파일 또는 디렉토리를 삭제한다.
     *
     * @param path HDFS의 파일 또는 디렉토리
     * @return 정상적으로 삭제된 경우 <tt>true</tt>, 그렇지 않은 경우는 <tt>false</tt>
     * @throws FileSystemException 파일 시스템에 접근할 수 없는 경우
     */
    @Override
    public boolean delete(String path) {
        try {
            boolean delete = fs.delete(new Path(path), true);
            return !this.exists(path) && delete;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_DELETE", path), ex);
        	throw new FileSystemException(String.format("You can\'t delete \"%s\"", path), ex);
        }
    }

    /**
     * 다수의 HDFS 파일 또는 디렉토리를 삭제한다.
     *
     * @param paths 삭제할 경로
     * @return 삭제되지 않은 파일 또는 디렉토리 목록
     */
    @Override
    public List<String> delete(List<String> paths) {
        List<String> deleted = new ArrayList<String>();
        for (String path : paths) {
            try {
                if (this.delete(path)) {
                    deleted.add(path);
                }
            } catch (Exception ex) {
            }
        }
        return deleted;
    }

    @Override
    public List<String> delete(String[] paths) {
        return delete(Arrays.asList(paths));
    }

    @Override
    public FSDataOutputStream create(String path) {
        if (exists(path)) {
//            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_CREATE", path));
        	throw new FileSystemException(String.format("\"%s\" already exists. A file or directory with the same name can\'t be moved to the same directory", path));
        }

        try {
            return fs.create(new Path(path));
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_CREATE", path), ex);
        	throw new FileSystemException(String.format("We couldn\'t create a file in \"%s\"", path), ex);
        }
    }

    @Override
    public boolean rename(String from, String to) {
        Path srcPath = new Path(from);
        Path dstPath = new Path(FileUtils.getPath(from), to);

        try {
            boolean result = fs.rename(srcPath, dstPath);
            if (!result) {
//                throw new FileSystemException(bundle.message("S_FS", "CANNOT_RENAME", srcPath.toString(), dstPath.toString()));
                throw new FileSystemException(String.format("\"%s\" has been changed to \"%s\"", srcPath.toString(), dstPath.toString()));
            }
            return result;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_RENAME", srcPath.toString(), dstPath.toString()));
        	throw new FileSystemException(String.format("\"%s\" has been changed to \"%s\"", srcPath.toString(), dstPath.toString()));
        }
    }

    /**
     * 파일 또는 디렉토리를 지정한 경로로 이동한다.
     * <p/>
     * <ul>
     * <li>대상 경로가 존재하지 않는다면 이름이 변경된다.</li>
     * <li>대상 경로가 존재하고 파일인 경우 이동하지 않는다(예외 발생).</li>
     * <li>대상 경로가 존재하고 디렉토리인 경우 대상 경로로 이동한다.</li>
     * </ul>
     *
     * @param from 이동할 파일 또는 디렉토리의 원본 경로
     * @param to   이동할 대상 경로
     * @return 정상적으로 이동한 경우 <tt>true</tt>, 그렇지 않은 경우 <tt>false</tt>
     */
    @Override
    public boolean move(String from, String to) {
        if (!exists(from)) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_MOVE", from));
            throw new FileSystemException(String.format("\"%s\" can\'t be moved to \"%s\"", from));
        }

        if (getFileInfo(to).isFile()) {
//            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_MOVE", to, from));
            throw new FileSystemException(String.format("The file already exists in \"%s\" so \"%s\" can\'t be moved", from, to));
        }

        // 파일을 옮기기 위해서 옮겨질 위치에 이미 동일한 파일이 있다면 건너뛴다.
        String target = to + SystemUtils.FILE_SEPARATOR + FileUtils.getFilename(from);
        if (exists(target)) {
//            throw new FileSystemException(bundle.message("S_FS", "ALREADY_EXISTS_NOT_MOVE", target));
            throw new FileSystemException(String.format("\"%s\" already exists, so it can\'t be moved. A file or directory with the same name can\'t be moved to the same directory", target));
        }

        try {
            Path srcPath = new Path(from);
            Path dstPath = new Path(to);

            return fs.rename(srcPath, dstPath);
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_MOVE", from, to), ex);
        	throw new FileSystemException(String.format("\"%s\" can\'t be moved to \"%s\"", from, to), ex);
        }
    }

    @Override
    public List<String> move(List<String> files, String to) {
        List<String> moved = new ArrayList<String>();
        for (String file : files) {
            boolean move = move(file, to);
            if (move) moved.add(file);
        }
        return moved;
    }

    @Override
    public boolean copy(String from, String to) {
        // 파일을 옮기기 위해서 옮겨질 위치에 이미 동일한 파일이 있다면 건너뛴다.
        String target = null;
        if ("/".equals(to)) {
            target = to + FileUtils.getFilename(from);
        } else {
            target = to + SystemUtils.FILE_SEPARATOR + FileUtils.getFilename(from);
        }

        if (exists(target))
//            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_COPY", target));
        	throw new FileSystemException(String.format("\"%s\" already exists so it can\'t be copied. A file or directory with the same name can\'t be moved to the same directory", target));

        try {
            if (fs.isFile(new Path(from))) {
                FSDataInputStream fis = fs.open(new Path(from));
                FSDataOutputStream fos = fs.create(new Path(target));

                org.springframework.util.FileCopyUtils.copy(fis, fos);

                IOUtils.closeQuietly(fos);
                IOUtils.closeQuietly(fis);
            } else {
                FileUtil.copy(fs, new Path(from), fs, new Path(to), false, new Configuration());
            }

            return true;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_COPY", from, to), ex);
            throw new FileSystemException(String.format("\"%s\" can\'t be copied to \"%s\"", from, to), ex);
        }
    }

    @Override
    public boolean mkdir(String path) {
        if (exists(path)) {
//            throw new FileSystemException(bundle.message("S_FS", "ALREADY_NOT_CREATE", path));
        	throw new FileSystemException(String.format("\"%s\" already exists. A file or directory with the same name can\'t be moved to the same directory", path));
        }

        try {
            return fs.mkdirs(new Path(path));
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_CREATE_DIR", path), ex);
        	throw new FileSystemException(String.format("The directory \"%s\" can\'t be created", path), ex);
        }
    }

    @Override
    public List<String> copy(List<String> files, String to) {
        List<String> copied = new ArrayList<String>();
        for (String file : files) {
            boolean result = copy(file, to);
            if (result) {
                copied.add(file);
            }
        }
        return copied;
    }

    @Override
    public boolean isMatch(String pathPattern, String path) {
        return antPathMatcher.match(pathPattern, path);
    }

    @Override
    public boolean save(String path, byte[] content) {
        ByteArrayInputStream bais = new ByteArrayInputStream(content);
        return save(bais, path);
    }

    @Override
    public boolean save2(String path, byte[] content, boolean isfirst) {
        ByteArrayInputStream bais = new ByteArrayInputStream(content);
        if(isfirst)
        {
        	return save(bais, path);
        }
        else
        {
			try {
	        	FSDataOutputStream out = fs.append(new Path(path));
				out.write(content);
				out.close();
				return true;
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				return false;
			}
        	
        	
        }
    }
    
    @Override
    public boolean save(InputStream is, String path) {
        OutputStream os = null;
        try {
        	System.out.println("HDFS FileSystem ------> : 3 Home=>"+fs.getHomeDirectory());
            if (fs.exists(new Path(path))) {
                return false;
            }
            System.out.println("HDFS FileSystem ------> : 4");
            os = fs.create(new Path(path));
            System.out.println("HDFS FileSystem ------> : 5");
            org.springframework.util.FileCopyUtils.copy(is, os);
            System.out.println("HDFS FileSystem ------> : 6");
            return true;
        } catch (Exception ex) {
            return false;
        } finally {
            try {
                if (os != null) os.close();
            } catch (Exception ex) {
                // Ignored
            }

            try {
                if (is != null) is.close();
            } catch (Exception ex) {
                // Ignored
            }
        }
    }

    @Override
    public org.apache.hadoop.fs.FileSystem getNativeFileSystem() {
        return fs;
    }

    @Override
    public Map<String, Object> getFileSystemStatus(String type) {
        Map<String, Object> map = new HashMap();
        DFSClient dfsClient = null;
        try {
            dfsClient = new DFSClient(fs.getConf());
            map.put("canonicalServiceName", fs.getCanonicalServiceName());
            map.put("defaultReplication", fs.getDefaultReplication());
            map.put("defaultBlockSize", fs.getDefaultBlockSize());
            map.put("workingDirectory", fs.getWorkingDirectory().toUri().getPath());
            map.put("homeDirectory", fs.getHomeDirectory().toUri().getPath());
            map.put("corruptBlocksCount", dfsClient.getCorruptBlocksCount());
            map.put("missingBlocksCount", dfsClient.getMissingBlocksCount());
            map.put("underReplicatedBlocksCount", dfsClient.getUnderReplicatedBlocksCount());
            map.put("capacity", dfsClient.getDiskStatus().getCapacity());
//          map.put("used", dfsClient.getDiskStatus().getDfsUsed());
          map.put("used", dfsClient.getDiskStatus().getUsed());
            map.put("remaining", dfsClient.getDiskStatus().getRemaining());
//            map.put("deadNodes", dfsClient.namenode.getDatanodeReport(FSConstants.DatanodeReportType.DEAD).length);
            map.put("deadNodes", dfsClient.getNamenode().getDatanodeReport(FSConstants.DatanodeReportType.DEAD).length);

            
//            map.put("liveNodes", dfsClient.namenode.getDatanodeReport(FSConstants.DatanodeReportType.LIVE).length);
          map.put("liveNodes", dfsClient.getNamenode().getDatanodeReport(FSConstants.DatanodeReportType.LIVE).length);

            
            map.put("humanCapacity", byteDesc(dfsClient.getDiskStatus().getCapacity()));
//          map.put("humanUsed", byteDesc(dfsClient.getDiskStatus().getDfsUsed()));
          map.put("humanUsed", byteDesc(dfsClient.getDiskStatus().getUsed()));
            map.put("humanProgressPercent", formatPercent((double) dfsClient.getDiskStatus().getRemaining() / (double) dfsClient.getDiskStatus().getCapacity(), 2));
            map.put("humanProgress", (float) dfsClient.getDiskStatus().getRemaining() / (float) dfsClient.getDiskStatus().getCapacity());
            map.put("humanRemaining", byteDesc(dfsClient.getDiskStatus().getRemaining()));
            map.put("humanDefaultBlockSize", byteDesc(fs.getDefaultBlockSize()));
            dfsClient.close();
            return map;
        } catch (Exception ex) {
//            throw new FileSystemException(bundle.message("S_FS", "CANNOT_ACCESS_FS_STATUS"), ex);
        	throw new FileSystemException(String.format("The status of the HDFS file system is unavailable"), ex);
        } finally {
            IOUtils.closeQuietly(dfsClient);
        }
    }
}
