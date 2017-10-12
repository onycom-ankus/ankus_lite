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

import com.ankus.core.exception.FileSystemException;
import com.ankus.model.rest.FileInfo;
import com.ankus.provider.fs.FileSystemProvider;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.util.Assert;

import java.io.*;
import java.util.List;
import java.util.Map;

public class LoalFileSystemProvider implements FileSystemProvider<Object> {

    @Override
    public List<FileInfo> list(String path, boolean directoryOnly) {
        return null;
    }

    @Override
    public List<FileInfo> list(String path) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean exists(String path) {
        return new File(path).exists();
    }

    @Override
    public int getCount(String path, boolean directoryOnly) {
        File file = new File(path);
        if (file.isFile()) {
            return 1;
        }

        try {
            if (directoryOnly) {
                return new File(path).list(new FilenameFilter() {
                    @Override
                    public boolean accept(File file, String name) {
                        return !file.isFile();
                    }
                }).length;
            } else {
                return new File(path).list().length;
            }
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 경로를 접근할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public FileInfo getFileInfo(String path) {
        File file = new File(path);
        return null;
    }

    @Override
    public InputStream getContent(String path) {
        File file = new File(path);
        if (!file.isFile()) {
            String message = MessageFormatter.format("'{}'은 디렉토리입니다.", path).getMessage();
            throw new FileSystemException(message);
        }
        try {
            return new FileInputStream(file);
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 경로를 접근할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public boolean delete(String path) {
        Assert.hasLength(path, "삭제할 파일 또는 디렉토리 'path'을 입력해 주십시오.");

        File file = new File(path);
        if (!file.isFile()) {
            String message = MessageFormatter.format("'{}'은 디렉토리입니다.", path).getMessage();
            throw new FileSystemException(message);
        }

        try {
            return new File(path).delete();
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 파일을 삭제할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public List<String> delete(List<String> paths) {
        return null;
    }

    @Override
    public List<String> delete(String[] paths) {
        return null;
    }

    @Override
    public DataOutput create(String fileName) {
        return null;
    }

    @Override
    public boolean rename(String from, String name) {
        return false;
    }

    @Override
    public boolean move(String file, String to) {
        return false;
    }

    @Override
    public List<String> move(List<String> files, String to) {
        return null;
    }

    @Override
    public boolean copy(String file, String to) {
        return false;
    }

    @Override
    public boolean mkdir(String path) {
        File file = new File(path);
        if (file.isFile()) {
            String message = MessageFormatter.format("'{}'은 파일 입니다.", path).getMessage();
            throw new FileSystemException(message);
        }

        try {
            return new File(path).mkdir();
        } catch (Exception ex) {
            String message = MessageFormatter.format("'{}' 디렉토리를 생성할 수 없습니다.", path).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    @Override
    public List<String> copy(List<String> files, String to) {
        return null;
    }

    @Override
    public boolean isMatch(String path, String antPathPattern) {
        return false;
    }

    @Override
    public boolean save(InputStream is, String path) {
        return false;
    }

    @Override
    public boolean save(String path, byte[] content) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public boolean save2(String path, byte[] content, boolean isfirst) {
        return false;  //To change body of implemented methods use File | Settings | File Templates.
    }
    
    @Override
    public Object getNativeFileSystem() {
        throw new UnsupportedOperationException();
    }

    @Override
    public Map<String, Object> getFileSystemStatus(String type) {
        return null;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public long getSize(String path, boolean directoryOnly) {
        return 0;  //To change body of implemented methods use File | Settings | File Templates.
    }

    @Override
    public byte[] load(String path, String filename) {
        return new byte[0];  //To change body of implemented methods use File | Settings | File Templates.
    }

	@Override
	public byte[] load(String path, long offset, int len) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String readlines(String path, int linecnt) {
		// TODO Auto-generated method stub
		return null;
	}

}
