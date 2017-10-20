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
import org.apache.commons.lang.SystemUtils;
import com.ankus.core.exception.SystemException;

import java.io.File;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

/**
 * File Utility.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class FileUtils {

    public static long KB = 1024L;
    public static long MB = KB * KB;
    public static long GB = MB * KB;
    public static long TB = GB * KB;
    public static long PB = TB * KB;
    public static long ZB = PB * KB;

    /**
     * 지정한 파일의 최근 변경된 시간을 반환한다.
     *
     * @param filename 파일명
     * @return 변경된 시간. 만약에 파일이 존재하지 않거나 입출력 에러가 발생하면 0L을 반환한다.
     */
    public static long lastModified(final String filename) {
        return new File(filename).lastModified();
    }

    /**
     * 지정한 경로에서 파일명만 추출한다. 예) "mypath/myfile.txt" -> "myfile.txt".
     *
     * @param path 파일 경로(<tt>null</tt>이 될 수도 있음)
     * @return 추출된 파일명 또는 파일명이 없는 경우 <tt>null</tt>
     */
    public static String getFilename(String path) {
        return org.springframework.util.StringUtils.getFilename(path);
    }

    /**
     * 지정한 경로에서 파일의 확장자를 추출한다. 예) "mypath/myfile.txt" -> "txt".
     *
     * @param path 파일 경로(<tt>null</tt>이 될 수도 있음)
     * @return the extracted filename extension, or <tt>null</tt> if none
     */
    public static String getFilenameExtension(String path) {
        return org.springframework.util.StringUtils.getFilenameExtension(path);
    }

    /**
     * 지정한 경로에서 파일의 확장자를 제외한 경로를 반환한다. 예) "mypath/myfile.txt" -> "mypath/myfile".
     *
     * @param path 파일 경로(<tt>null</tt>이 될 수도 있음)
     * @return 확장자가 삭제된 파일의 경우 또는 파일이 없다면 <tt>null</tt>
     */
    public static String stripFilenameExtension(String path) {
        return org.springframework.util.StringUtils.stripFilenameExtension(path);
    }

    /**
     * Fully Qualified Path에서 마지막 Path Separator를 기준으로 좌측 경로를 반환한다.
     *
     * @param fullyQualifiedPath Fully Qualified Path
     * @return 마지막 Path Separator를 기준으로 좌측 경로
     */
    public static String getPath(String fullyQualifiedPath) {
        int sep = fullyQualifiedPath.lastIndexOf("\\"); // windows...
        if(sep<0) sep = fullyQualifiedPath.lastIndexOf("/"); // linux...
        if (sep != 0) {
            return fullyQualifiedPath.substring(0, sep);
        }
        return SystemUtils.FILE_SEPARATOR;
    }

    /**
     * Fully Qualified Path에서 마지막 Path Separator를 기준으로 우측 경로를 반환한다.
     *
     * @param fullyQualifiedPath Fully Qualified Path
     * @return 마지막 Path Separator를 기준으로 우측 경로
     */
    public static String getDirectoryName(String fullyQualifiedPath) {
        int sep = fullyQualifiedPath.lastIndexOf(SystemUtils.FILE_SEPARATOR);
        int length = fullyQualifiedPath.getBytes().length;
        return fullyQualifiedPath.substring(sep + 1, length);
    }

    /**
     * Fully Qualified Path에서 마지막 Path Separator를 기준으로 좌측 경로에 교체할 디렉토리 또는 파일명을 적용한다.
     *
     * @param fullyQualifiedPath Fully Qualified Path
     * @param replacement        교체할 파일명 또는 디렉토리명
     * @return 교체할 파일명 또는 디렉토리가 적용된 fully qualified path
     */
    public static String replaceLast(String fullyQualifiedPath, String replacement) {
        String path = getPath(fullyQualifiedPath);
        if (path.endsWith(SystemUtils.FILE_SEPARATOR)) {
            return path + replacement;
        }
        return path + SystemUtils.FILE_SEPARATOR + replacement;
    }

    /**
     * 지정한 URL에 대해서 Input Stream을 반환한다.
     *
     * @param url URL
     * @return Input Stream
     */
    public static InputStream openStream(String url) {
        String message = ExceptionUtils.getMessage("URL '{}' 리소스에 대해서 Input Stream을 얻을 수 없습니다.", url);
        try {
            return new URL(url).openStream();
        } catch (MalformedURLException ex) {
            if (ex.getMessage().contains("no protocol") && url.startsWith("/")) {
                try {
                    return new URL("file:" + url).openStream();
                } catch (Exception e) {
                    throw new SystemException(message, e);
                }
            }
            throw new SystemException(message, ex);
        } catch (Exception ex) {
            throw new SystemException(message, ex);
        }
    }

    /**
     * 지정한 URL에 대해서 리소스가 존재하는지 확인한다.
     *
     * @param url URL
     * @return 존재하는 경우 <tt>true</tt>
     */
    public static boolean isExist(String url) {
        String message = ExceptionUtils.getMessage("URL '{}' 리소스에 대해서 Input Stream을 얻을 수 없습니다.", url);
        InputStream inputStream = null;
        try {
            inputStream = new URL(url).openStream();
            return true;
        } catch (MalformedURLException ex) {
            if (ex.getMessage().contains("no protocol") && url.startsWith("/")) {
                try {
                    inputStream = new URL("file:" + url).openStream();
                    return true;
                } catch (Exception e) {
                    return false;
                }
            }
            return false;
        } catch (Exception ex) {
            return false;
        } finally {
            IOUtils.closeQuietly(inputStream);
        }
    }

}
