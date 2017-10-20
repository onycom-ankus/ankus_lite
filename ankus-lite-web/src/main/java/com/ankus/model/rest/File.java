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
package com.ankus.model.rest;

import org.codehaus.jackson.annotate.JsonAutoDetect;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

/**
 * Hadoop FileSystem의 File JAXB Object.
 *
 * @author Edward KIM
 * @since 0.1
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "", propOrder = {
	"id",
	"path",
	"name",
	"text",
	"length",
	"isdir",
	"leaf",
	"replication",
	"blocksize",
	"modificationTime",
	"accessTime",
	"permission",
	"owner",
	"group",
	"cls"
})
@XmlRootElement(name = "file")
@JsonAutoDetect(
        getterVisibility = JsonAutoDetect.Visibility.ANY,
        fieldVisibility = JsonAutoDetect.Visibility.NONE,
        setterVisibility = JsonAutoDetect.Visibility.ANY
)
public class File implements Serializable {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

	String id;

	String path;

	String name;

	String text;

	String length;

	boolean isdir;

	boolean leaf;

	short replication;

	String blocksize;

	String modificationTime;

	String accessTime;

	String permission;

	String owner;

	String group;

	String cls;

	public File() {
	}

	public String getId() {
		return id;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
		this.id = path;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
		this.text = name;
	}

	public String getText() {
		return text;
	}

	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}

	public boolean isIsdir() {
		return isdir;
	}

	public void setIsdir(boolean isdir) {
		this.isdir = isdir;
		this.leaf = !isdir;
	}

	public boolean isLeaf() {
		return leaf;
	}

	public short getReplication() {
		return replication;
	}

	public void setReplication(short replication) {
		this.replication = replication;
	}

	public String getBlocksize() {
		return blocksize;
	}

	public void setBlocksize(String blocksize) {
		this.blocksize = blocksize;
	}

	public String getModificationTime() {
		return modificationTime;
	}

	public void setModificationTime(String modificationTime) {
		this.modificationTime = modificationTime;
	}

	public String getAccessTime() {
		return accessTime;
	}

	public void setAccessTime(String accessTime) {
		this.accessTime = accessTime;
	}

	public String getPermission() {
		return permission;
	}

	public void setPermission(String permission) {
		this.permission = permission;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getCls() {
		return cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

    public void setId(String id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    @Override
	public String toString() {
		return "File{" +
			"id='" + id + '\'' +
			", path='" + path + '\'' +
			", name='" + name + '\'' +
			", text='" + text + '\'' +
			", length=" + length +
			", isdir=" + isdir +
			", leaf=" + leaf +
			", replication=" + replication +
			", blocksize=" + blocksize +
			", modificationTime=" + modificationTime +
			", accessTime=" + accessTime +
			", permission='" + permission + '\'' +
			", owner='" + owner + '\'' +
			", group='" + group + '\'' +
			", cls='" + cls + '\'' +
			'}';
	}
}
