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

import com.amazonaws.services.s3.model.Bucket;
import com.ankus.model.rest.FileInfo;

/**
 * Amazon S3 Bucket.
 *
 * @author Soryoung KIM
 * @since 0.3
 */
public class S3BucketInfo implements FileInfo {

    /**
     *
     */
    private String filename;

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
    private String owner;

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
     * @param bucket S3 Bucket
     */
    public S3BucketInfo(Bucket bucket) {
        this.filename = bucket.getName();
        this.path = "/";
        this.fullyQualifiedPath = this.path + this.filename;
        this.owner = bucket.getOwner().getDisplayName();
        this.modificationTime = bucket.getCreationDate().getTime();
        this.accesTime = bucket.getCreationDate().getTime();
    }

    @Override
    public String getFilename() {
        return this.filename;
    }

    @Override
    public String getFullyQualifiedPath() {
        return this.fullyQualifiedPath;
    }

    @Override
    public long getLength() {
        throw new UnsupportedOperationException();
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
        return owner;
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
        return modificationTime;
    }

    @Override
    public long getAccessTime() {
        return accesTime;
    }

    @Override
    public String getPermission() { //FIXME
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public String toString() {
        return "S3BucketInfo{" +
            "filename='" + filename + '\'' +
            ", fullyQualifiedPath='" + fullyQualifiedPath + '\'' +
            ", path='" + path + '\'' +
            ", owner='" + owner + '\'' +
            ", modificationTime=" + modificationTime +
            ", accesTime=" + accesTime +
            ", directory=" + directory +
            '}';
    }
}
