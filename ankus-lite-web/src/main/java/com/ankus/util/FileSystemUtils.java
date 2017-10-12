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
package com.ankus.util;

import org.apache.commons.io.IOUtils;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.FSDataInputStream;
import org.apache.hadoop.fs.FSDataOutputStream;
import org.apache.hadoop.fs.FileSystem;
import org.apache.hadoop.fs.Path;
import com.ankus.core.exception.FileSystemException;
import org.slf4j.helpers.MessageFormatter;
import org.springframework.util.FileCopyUtils;

import java.io.File;
import java.io.IOException;
import java.net.InetAddress;
import java.net.URI;
import java.net.UnknownHostException;

/**
 * File System Utility.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class FileSystemUtils {

    /**
     * 지정한 경로를 보정한다. <tt>hdfs://</tt> 또는 <tt>file:</tt> 으로 시작하지 않는 경우
     * 기본으로 로컬 파일 시스템으로 간주하고 <tt>file:</tt>을 붙인다.
     *
     * @param path 파일 또는 디렉토리의 경로
     * @return 보정한 디렉토리의 경로
     */
    public static String correctPath(String path) {
        if (path == null || path.length() < 1) {
            return null;
        }
        Path filePath = new Path(path);
        String scheme = filePath.toUri().getScheme();
        if (scheme == null) {
            return "file:" + path;
        }
        return path;
    }

    /**
     * 지정한 경로를 보정한다. <tt>hdfs://</tt> 또는 <tt>file:</tt> 으로 시작하지 않는 경우
     * 기본으로 로컬 파일 시스템으로 간주하고 <tt>file:</tt>을 붙인다.
     *
     * @param parent 부모 경로
     * @param child  자식 경로
     * @return 보정한 디렉토리의 경로
     */
    public static String correctPath(String parent, String child) {
        if (StringUtils.isEmpty(parent) || StringUtils.isEmpty(child)) {
            return null;
        }
        String path = parent + "/" + child;
        return correctPath(path);
    }

    /**
     * 지정한 경로를 보정한다. <tt>hdfs://</tt> 또는 <tt>file:</tt> 으로 시작하지 않는 경우
     * 기본으로 로컬 파일 시스템으로 간주하고 <tt>file:</tt>을 붙인다.
     *
     * @param parent   부모 경로
     * @param prefix   파일명의 prefix
     * @param filename 파일명
     * @return 보정한 디렉토리의 경로
     */
    public static String correctPath(String parent, String prefix, String filename) {
        if (StringUtils.isEmpty(parent) || StringUtils.isEmpty(prefix) || StringUtils.isEmpty(filename)) {
            return null;
        }
        String path = parent + "/" + prefix + "_" + filename;
        return correctPath(path);
    }

    /**
     * 지정한 경로가 파일 시스템의 경로인지 확인한다.
     *
     * @param path   경로
     * @param scheme 파일 시스템의 scheme(예; hdfs:// file:)
     */
    public static void checkScheme(String path, FileSystemScheme scheme) {
        if (path == null || path.length() < 1) {
            return;
        }
        if (!path.startsWith(scheme.getScheme())) {
            throw new FileSystemException(ExceptionUtils.getMessage("Invalid file system '{}' => Path '{}'", scheme.getScheme(), path));
        }
    }

    /**
     * 지정한 디렉토리가 로컬 경로인 경우 보정을 하고 경로를 생성한다.
     *
     * @param path 경로
     */
    public static void testCorrentAndCreateDir(String path) {
        String correctedPath = correctPath(path);
        testCreateDir(new Path(correctedPath));
    }

    /**
     * 지정한 디렉토리를 테스트하여 존재하지 않으면 생성한다.
     * 다만 존재하면서 디렉토리가 아닌 파일이라면 예외를 발생시킨다.
     *
     * @param path 경로
     * @throws com.ankus.core.exception.FileSystemException 디렉토리를 생성할 수 없거나, 존재하지만 디렉토리가 아니라 파일인 경우
     */
    public static void testCreateDir(Path path) {
        try {
            Configuration conf = new Configuration();
            FileSystem fs = FileSystem.get(conf);

//            FileSystem fs = path.getFileSystem(conf);

            System.out.println("--------New------------------");
            System.out.println("--------fs--------"+fs);
            System.out.println("--------fs getUri--------"+fs.getUri());
            System.out.println("--------fs getWorkingDirectory--------"+fs.getWorkingDirectory());
            System.out.println("--------fs getHomeDirectory--------"+fs.getHomeDirectory());

            System.out.println("--------path--------"+path);
            System.out.println("--------fs.exists(path)--------"+fs.exists(path));
            System.out.println("--------fs.mkdirs(path--------"+fs.mkdirs(path));

            if (fs.exists(path) && !fs.getFileStatus(path).isDir()) {
                throw new FileSystemException(ExceptionUtils.getMessage("'{}' is not directory.", path));
            }

            if (!fs.exists(path)) {
                if (!fs.mkdirs(path)) {
                    throw new FileSystemException(ExceptionUtils.getMessage("Cannot create '{}'", path));
                }
            }
        } catch (Exception ex) {
            String message = MessageFormatter.format("Cannot create '{}'", path.toString()).getMessage();
            throw new FileSystemException(message, ex);
        }
    }

    /**
     * 지정한 경로의 파일 시스템을 반환한다.
     *
     * @param path 파일 시스템을 얻을 경로
     * @return 파일 시스템
     */
    public static FileSystem getFileSystem(Path path) {
        try {
            Configuration conf = new Configuration();
            return path.getFileSystem(conf);
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot get file system of '{}'", path), ex);
        }
    }

    /**
     * 지정한 경로의 파일 시스템을 반환한다.
     *
     * @param path 파일 시스템을 얻을 경로
     * @return 파일 시스템
     */
    public static FileSystem getFileSystem(String path) {
        return getFileSystem(new Path(path));
    }

    /**
     * 두 입력 경로의 파일 시스템이 동일한지 확인한다.
     *
     * @param path1 경로1
     * @param path2 경로2
     */
    public static void validateSameFileSystem(String path1, String path2) {
        Path p1 = new Path(correctPath(path1));
        Path p2 = new Path(correctPath(path2));
        FileSystem fs1 = null;
        FileSystem fs2 = null;
        try {
            fs1 = p1.getFileSystem(new Configuration());
            fs2 = p2.getFileSystem(new Configuration());
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot access '{}' or '{}'.", p1, p2), ex);
        }

        if (!compareFs(fs1, fs2)) {
            throw new FileSystemException(ExceptionUtils.getMessage(
                "File system is not same : {}, {}", p1, p2
            ));
        }

        if (p1.equals(p2)) {
            throw new FileSystemException(ExceptionUtils.getMessage("Same path : {}, {}", p1, p2));
        }
    }

    /**
     * 두 파일 시스템에 대해서 URI의 scheme을 확인하여 동일한지 확인한다.
     *
     * @param fs1 파일시스템1
     * @param fs2 파일시스템2
     * @return 동일하다면 <tt>true</tt>
     */
    private static boolean compareFs(FileSystem fs1, FileSystem fs2) {
        URI uri1 = fs1.getUri();
        URI uri2 = fs2.getUri();
        if (uri1.getScheme() == null) {
            return false;
        }
        if (!uri1.getScheme().equals(uri2.getScheme())) {
            return false;
        }
        String srcHost = uri1.getHost();
        String dstHost = uri2.getHost();
        if ((srcHost != null) && (dstHost != null)) {
            try {
                srcHost = InetAddress.getByName(srcHost).getCanonicalHostName();
                dstHost = InetAddress.getByName(dstHost).getCanonicalHostName();
            } catch (UnknownHostException ue) {
                return false;
            }
            if (!srcHost.equals(dstHost)) {
                return false;
            }
        } else if (srcHost == null && dstHost != null) {
            return false;
        } else if (srcHost != null) {
            return false;
        }
        // 포트 확인
        return uri1.getPort() == uri2.getPort();
    }

    /**
     * 지정한 경로의 파일을 로딩한다. 지정한 경로에 파일이 존재하는 경우 해당 경로의 파일을 로딩한다.
     * 다만 경로에 파일명만 전달된 경우 현재 작업 디렉토리에서 파일을 찾는다.
     *
     * @param sourceFilePath 로딩할 파일의 경로
     * @return 파일의 내용
     * @throws com.ankus.core.exception.FileSystemException 파일을 로딩할 수 없는 경우
     */
    public static String load(String sourceFilePath) {
        String workingDirectory = System.getProperty("user.dir");
        try {
            if (new File(sourceFilePath).exists()) {
                String filePath = correctPath(sourceFilePath);
                return loadFromFile(filePath);
            } else {
                String filePath = new File(workingDirectory, sourceFilePath).getAbsolutePath();
                return loadFromFile(filePath);
            }
        } catch (IOException ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot load '{}'.", sourceFilePath), ex);
        }
    }

    /**
     * 지정한 경로의 파일을 로딩한다. 지정한 경로에 파일이 존재하는 경우 해당 경로의 파일을 로딩한다.
     * 다만 경로에 파일명만 전달된 경우 현재 작업 디렉토리에서 파일을 찾는다.
     *
     * @param sourceFilePath 로딩할 파일의 경로
     * @return 파일의 내용
     * @throws com.ankus.core.exception.FileSystemException 파일을 로딩할 수 없는 경우
     */
    public static byte[] loadBytes(String sourceFilePath) {
        String workingDirectory = System.getProperty("user.dir");
        try {
            if (new File(sourceFilePath).exists()) {
                String filePath = correctPath(sourceFilePath);
                return loadBytesFromFile(filePath);
            } else {
                String filePath = new File(workingDirectory, sourceFilePath).getAbsolutePath();
                return loadBytesFromFile(filePath);
            }
        } catch (IOException ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot load '{}'.", sourceFilePath), ex);
        }
    }

    /**
     * 지정한 경로의 파일을 로딩한다. 지정한 경로에 파일이 존재하는 경우 해당 경로의 파일을 로딩한다.
     * 다만 경로에 파일명만 전달된 경우 현재 작업 디렉토리에서 파일을 찾는다.
     *
     * @param sourceFilePath 로딩할 파일의 경로
     * @return 파일의 내용
     * @throws com.ankus.core.exception.FileSystemException 파일을 로딩할 수 없는 경우
     */
    public static String loadFromFile(String sourceFilePath) throws IOException {
        byte[] bytes = loadBytesFromFile(sourceFilePath);
        return new String(bytes);
    }

    /**
     * 지정한 경로의 파일을 로딩한다. 지정한 경로에 파일이 존재하는 경우 해당 경로의 파일을 로딩한다.
     * 다만 경로에 파일명만 전달된 경우 현재 작업 디렉토리에서 파일을 찾는다.
     *
     * @param sourceFilePath 로딩할 파일의 경로
     * @return 파일의 내용
     * @throws com.ankus.core.exception.FileSystemException 파일을 로딩할 수 없는 경우
     */
    public static byte[] loadBytesFromFile(String sourceFilePath) throws IOException {
        FileSystem fs = getFileSystem(sourceFilePath);
        FSDataInputStream is = fs.open(new Path(sourceFilePath));
        byte[] bytes = FileCopyUtils.copyToByteArray(is);
        IOUtils.closeQuietly(is);
        return bytes;
    }

    /**
     * 지정한 경로의 파일을 로딩한다. 지정한 경로에 파일이 존재하는 경우 해당 경로의 파일을 로딩한다.
     * 다만 경로에 파일명만 전달된 경우 현재 작업 디렉토리에서 파일을 찾는다.
     *
     * @param sourceFileSystem 파일 시스템
     * @param sourceFilePath   로딩할 파일의 경로
     * @return 파일의 내용
     * @throws com.ankus.core.exception.FileSystemException 파일을 로딩할 수 없는 경우
     */
    public static byte[] loadBytesFromFile(FileSystem sourceFileSystem, String sourceFilePath) throws IOException {
        FSDataInputStream is = sourceFileSystem.open(new Path(sourceFilePath));
        byte[] bytes = FileCopyUtils.copyToByteArray(is);
        IOUtils.closeQuietly(is);
        return bytes;
    }

    /**
     * 지정한 경로에 파일을 저장한다. 지정한 경로에 파일이 존재하지 않는 경우
     * 저장하는 파일의 경로는 현재 작업 디렉토리로 결정한다.
     * 예를 들어 <tt>path</tt> 변수에 파일명만 지정한다면 파일이 존재하지 않는다고 가정하므로 현재 작업 디렉토리에 해당 파일을 기록하게 된다.
     *
     * @param source         파일의 내용
     * @param targetFilePath 저장할 파일의 경로
     * @return 정상 저장 여부(<tt>true</tt> 면 정상적으로 저장)
     * @throws com.ankus.core.exception.FileSystemException 파일을 저장할 수 없는 경우
     */
    public static boolean save(byte[] source, String targetFilePath) {
        String workingDirectory = System.getProperty("user.dir");
        try {
            // 지정한 경로에 파일이 존재하지 않으면 현재 작업 디렉토리에 파일을 저장한다.
            if (!new File(targetFilePath).exists()) {
                String filePath = new File(workingDirectory, targetFilePath).getAbsolutePath();
                return saveToFile(source, filePath);
            } else {
                String filePath = new File(targetFilePath).getAbsolutePath();
                return saveToFile(source, filePath);
            }
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot save '{}'.", targetFilePath), ex);
        }
    }

    /**
     * 지정한 경로에 파일을 기록한다.
     *
     * @param source         파일의 내용
     * @param targetFilePath 저장할 파일의 경로
     * @return 정상 저장 여부(<tt>true</tt> 면 정상적으로 저장)
     */
    public static boolean saveToFile(byte[] source, String targetFilePath) {
        try {
            FileSystem fs = getFileSystem(targetFilePath);
            FSDataOutputStream fos = fs.create(new Path(targetFilePath));
            FileCopyUtils.copy(source, fos);
            IOUtils.closeQuietly(fos);
            return fs.exists(new Path(targetFilePath));
        } catch (Exception ex) {
            throw new FileSystemException(ExceptionUtils.getMessage("Cannot save '{}'.", targetFilePath), ex);
        }
    }

    /**
     * 지정한 경로에 파일을 기록한다.
     *
     * @param targetFileSystem 파일을 저장할 경로의 파일 시스템
     * @param source           파일의 내용
     * @param targetFilePath   저장할 파일의 경로
     * @return 정상 저장 여부(<tt>true</tt> 면 정상적으로 저장)
     * @throws java.io.IOException 파일을 저장할 수 없는 경우
     */
    public static boolean saveToFile(byte[] source, FileSystem targetFileSystem, String targetFilePath) throws IOException {
        FSDataOutputStream fos = targetFileSystem.create(new Path(targetFilePath));
        FileCopyUtils.copy(source, fos);
        IOUtils.closeQuietly(fos);
        return targetFileSystem.exists(new Path(targetFilePath));
    }

}
