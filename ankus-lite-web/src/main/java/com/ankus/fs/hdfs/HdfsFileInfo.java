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
import com.ankus.model.rest.ExtJSTreeNode;
import com.ankus.model.rest.FileInfo;
import com.ankus.util.FileUtils;
import com.ankus.util.StringUtils;

/**
 * HDFS File Info.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class HdfsFileInfo extends ExtJSTreeNode implements FileInfo {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String filename;

    private String fullyQualifiedPath;

    private String path;

    private long length;

    private boolean directory;

    private boolean file;

    private String owner;

    private String group;

    private long blockSize;

    private int replication;

    private long modificationTime;

    private long accessTime;

    private String permission;

    private long spaceQuota;

    private String spaceConsumed;

    private long quota;

    private long fileCount;

    private long directoryCount;

    /**
     * 기본 생성자.
     *
     * @param fileStatus HDFS File Status
     */
    public HdfsFileInfo(FileStatus fileStatus) {
    	
    	
        this.fullyQualifiedPath = fileStatus.getPath().toUri().getPath();
        
        System.out.printf("HdfsFileInfo====>[%s]\n", this.fullyQualifiedPath);
        
        int fp = this.fullyQualifiedPath.lastIndexOf("/");
        
        if(fp>=0)
        {
        	this.filename = this.fullyQualifiedPath.substring(fp+1);
            this.path = this.fullyQualifiedPath.substring(0, fp);
        }
        
//        this.filename = StringUtils.isEmpty(FileUtils.getFilename(fullyQualifiedPath)) ? FileUtils.getDirectoryName(fullyQualifiedPath) : FileUtils.getFilename(fullyQualifiedPath);
        this.length = fileStatus.getLen();
//        this.path = FileUtils.getPath(fullyQualifiedPath);
        this.directory = fileStatus.isDir();
        this.file = !fileStatus.isDir();
        this.owner = fileStatus.getOwner();
        this.group = fileStatus.getGroup();
        this.blockSize = fileStatus.getBlockSize();
        this.replication = fileStatus.getReplication();
        this.modificationTime = fileStatus.getModificationTime();
        this.accessTime = fileStatus.getAccessTime();
        this.setText(this.filename);
        this.setLeaf(file ? true : false);
        this.setCls(directory ? "folder" : "file");
        this.setId(fullyQualifiedPath);
        this.permission = fileStatus.getPermission().toString();
    }

    @Override
    public String getFilename() {
        return filename;
    }

    @Override
    public String getFullyQualifiedPath() {
        return fullyQualifiedPath;
    }

    @Override
    public long getLength() {
        return length;
    }

    @Override
    public String getPath() {
        return path;
    }

    @Override
    public boolean isFile() {
        return file;
    }

    @Override
    public boolean isDirectory() {
        return directory;
    }

    @Override
    public String getOwner() {
        return owner;
    }

    @Override
    public String getGroup() {
        return group;
    }

    @Override
    public long getBlockSize() {
        return blockSize;
    }

    @Override
    public int getReplication() {
        return replication;
    }

    @Override
    public long getModificationTime() {
        return modificationTime;
    }

    @Override
    public long getAccessTime() {
        return accessTime;
    }

    public String getPermission() {
        return permission;
    }

    public void setSpaceQuota(long spaceQuota) {
        this.spaceQuota = spaceQuota;
    }

    public long getSpaceQuota() {
        return spaceQuota;
    }

    public void setSpaceConsumed(String spaceConsumed) {
        this.spaceConsumed = spaceConsumed;
    }

    public String getSpaceConsumed() {
        return spaceConsumed;
    }

    public void setQuota(long quota) {
        this.quota = quota;
    }

    public long getQuota() {
        return quota;
    }

    public void setFileCount(long fileCount) {
        this.fileCount = fileCount;
    }

    public long getFileCount() {
        return fileCount;
    }

    public void setDirectoryCount(long directoryCount) {
        this.directoryCount = directoryCount;
    }

    public long getDirectoryCount() {
        return directoryCount;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public void setFullyQualifiedPath(String fullyQualifiedPath) {
        this.fullyQualifiedPath = fullyQualifiedPath;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public void setLength(long length) {
        this.length = length;
    }

    public void setDirectory(boolean directory) {
        this.directory = directory;
    }

    public void setFile(boolean file) {
        this.file = file;
    }

    public void setOwner(String owner) {
        this.owner = owner;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public void setBlockSize(long blockSize) {
        this.blockSize = blockSize;
    }

    public void setReplication(int replication) {
        this.replication = replication;
    }

    public void setModificationTime(long modificationTime) {
        this.modificationTime = modificationTime;
    }

    public void setAccessTime(long accessTime) {
        this.accessTime = accessTime;
    }

    public void setPermission(String permission) {
        this.permission = permission;
    }

}
