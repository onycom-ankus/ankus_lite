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
package com.ankus.fs.s3;

import com.amazonaws.services.s3.model.S3Object;
import com.ankus.model.rest.FileInfo;
import com.ankus.util.FileUtils;

/**
 * Amazon S3 Directory Object.
 *
 * @author Soryoung KIM
 * @since 0.3
 */
public class S3DirectoryInfo implements FileInfo {

    /**
     *
     */
    private String fullyQualifiedPath;

    /**
     *
     */
    private String path;

    /**
     *
     */
    private long length;

    /**
     *
     */
    private long modificationTime;

    /**
     *
     */
    private long accesTime;

    /**
     *
     */
    private boolean directory = true;

    /**
     * 기본 생성자
     *
     * @param object Amazon S3 Object
     */
    public S3DirectoryInfo(S3Object object) {
        this.fullyQualifiedPath = object.getBucketName() + "/" + object.getKey();
        this.path = FileUtils.getPath(this.fullyQualifiedPath);
        this.length = object.getObjectMetadata().getContentLength();
        this.modificationTime = object.getObjectMetadata().getLastModified().getTime();
        this.accesTime = object.getObjectMetadata().getLastModified().getTime();
    }

    public S3DirectoryInfo(String path, String name) {
        String[] units = name.split("/");

        this.path = path + "/" + units[units.length - 1];
        this.fullyQualifiedPath = path + "/" + name;
    }

    public S3DirectoryInfo(String path, S3Object object) {
        this.path = path;
        this.fullyQualifiedPath = path;
        this.length = object.getObjectMetadata().getContentLength();
        this.modificationTime = object.getObjectMetadata().getLastModified().getTime();
        this.accesTime = object.getObjectMetadata().getLastModified().getTime();
    }

    @Override
    public String getFilename() {
        throw new UnsupportedOperationException();
    }

    @Override
    public String getFullyQualifiedPath() {
        return this.fullyQualifiedPath;
    }

    @Override
    public long getLength() {
        return this.length;
    }

    @Override
    public String getPath() {
        return this.path;
    }

    @Override
    public boolean isFile() {
        return !directory;
    }

    @Override
    public boolean isDirectory() {
        return directory;
    }

    @Override
    public String getOwner() {
        throw new UnsupportedOperationException();
    }

    @Override
    public String getGroup() {
        throw new UnsupportedOperationException();
    }

    @Override
    public long getBlockSize() {
        throw new UnsupportedOperationException();
    }

    @Override
    public int getReplication() {
        throw new UnsupportedOperationException();
    }

    @Override
    public long getModificationTime() {
        return this.modificationTime;
    }

    @Override
    public long getAccessTime() {
        return this.accesTime;
    }

    @Override
    public String getPermission() { //FIXME
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public String toString() {
        return "S3DirectoryInfo{" +
            ", fullyQualifiedPath='" + fullyQualifiedPath + '\'' +
            ", path='" + path + '\'' +
            ", length=" + length +
            ", modificationTime=" + modificationTime +
            ", accesTime=" + accesTime +
            ", directory=" + directory +
            '}';
    }
}
