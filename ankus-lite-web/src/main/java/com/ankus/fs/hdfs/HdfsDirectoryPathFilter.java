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

import org.apache.hadoop.fs.FileStatus;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.fs.PathFilter;
import org.apache.hadoop.fs.permission.FsAction;
import com.ankus.core.exception.FileSystemException;
import org.slf4j.helpers.MessageFormatter;

import java.io.IOException;

/**
 * Hadoop HDFS의 디렉토리만 필터링하는 경로 필터.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsDirectoryPathFilter implements PathFilter {

    /**
     * Hadoop HDFS File System
     */
    private org.apache.hadoop.fs.FileSystem fs;

    private boolean isdirectorycheck = true;

    private String user = "";
    
    private String group = "";
    
    /**
     * 기본 생성자.
     *
     * @param fs Hadoop HDFS File System
     */
    public HdfsDirectoryPathFilter(org.apache.hadoop.fs.FileSystem fs, String user, String group) {
        this.fs = fs;
        this.user = user;
        this.group = group;
    }

    public HdfsDirectoryPathFilter(org.apache.hadoop.fs.FileSystem fs, String user, String group, boolean directorycheck) {
        this.fs = fs;
        this.isdirectorycheck = directorycheck;
        this.user = user;
        this.group = group;
    }
    
    @Override
    public boolean accept(Path path) {
        try {
        	
        	if(this.isdirectorycheck && fs.isFile(path)) return false;
        	
        	if(group.isEmpty()) return true;
        	
        	FileStatus f = fs.getFileStatus(path);
        	if(f.getPermission().getOtherAction().implies(FsAction.READ)) return true;
        	if(f.getPermission().getGroupAction().implies(FsAction.READ) && f.getGroup().equals(group)) return true;
        	if(f.getPermission().getUserAction().implies(FsAction.READ) && f.getOwner().equals(user)) return true;

            return false; //!fs.isFile(path);
        } catch (IOException e) {
            String message = MessageFormatter.format("Cannot access '{}'", path.toUri().getPath()).getMessage();
            throw new FileSystemException(message, e);
        }
    }

}
