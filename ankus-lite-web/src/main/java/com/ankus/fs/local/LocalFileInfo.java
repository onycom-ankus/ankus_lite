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
package com.ankus.fs.local;

import com.ankus.model.rest.ExtJSTreeNode;
import com.ankus.model.rest.FileInfo;
import com.ankus.util.FileUtils;

import java.io.File;

public class LocalFileInfo extends ExtJSTreeNode implements FileInfo {

    private long modificationTime;

    private long length;

    private boolean file;

    private boolean directory;

    private String absolutePath;

    private String filename;

    public LocalFileInfo(File file) {
        this.file = file.isFile();
        this.directory = !this.file;
        this.filename = file.getName();
        this.absolutePath = file.getAbsolutePath();
        this.length = file.length();
        this.modificationTime = file.lastModified();

        this.setText(this.filename);
        this.setLeaf(this.file);
        this.setCls(directory ? "folder" : "file");
        this.setId(absolutePath);
    }

    @Override
    public String getFilename() {
        return filename;
    }

    @Override
    public String getFullyQualifiedPath() {
        return absolutePath;
    }

    @Override
    public long getLength() {
        return length;
    }

    @Override
    public String getPath() {
        return FileUtils.getPath(absolutePath);
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
        return "";
    }

    @Override
    public String getGroup() {
        return "";
    }

    @Override
    public long getBlockSize() {
        return 1;
    }

    @Override
    public int getReplication() {
        return 1;
    }

    @Override
    public long getModificationTime() {
        return modificationTime;
    }

    @Override
    public long getAccessTime() {
        return modificationTime;
    }

    @Override
    public String getPermission() {
        return "";
    }
}
