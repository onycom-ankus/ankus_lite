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

import org.slf4j.helpers.MessageFormatter;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.util.ClassUtils;

import java.io.*;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;

/**
 * Resource Utilty. 이 유틸리티를 클래스를 이용해서 해당 리소스에 대한 URL 및 파일 정보를 얻어올 수 있다.
 * 이 유틸리티 클래스는 Spring Framework의 {@link org.springframework.util.ResourceUtils}를 독립 사용 가능하도록 한
 * 수정 버전이다.
 *
 * @author Edward KIM
 * @see {@link org.springframework.util.ResourceUtils}
 * @since 0.1
 */
public class ResourceUtils {

    /**
     * ClASSPATH에서 로딩을 지원하는 Pseudo URL prefix : "classpath:"
     */
    public static final String CLASSPATH_URL_PREFIX = "classpath:";

    /**
     * 파일 시스템에서 로딩을 지원하는 URL prefix : "file:"
     */
    public static final String FILE_URL_PREFIX = "file:";

    /**
     * 파일 시스템 내에 파일을 위한 URL protocol : "file"
     */
    public static final String URL_PROTOCOL_FILE = "file";

    /**
     * Jar 파일의 엔트리를 위한 URL protocol : "jar"
     */
    public static final String URL_PROTOCOL_JAR = "jar";

    /**
     * Zip 파일의 엔트리를 위한 URL protocol : "zip"
     */
    public static final String URL_PROTOCOL_ZIP = "zip";

    /**
     * JAR 파일 내의 파일 경로와 JAR URL 같의 seperator
     */
    public static final String JAR_URL_SEPARATOR = "!/";

    /**
     * 리소스를 로딩하는 리소스 로더(Spring Framework)
     */
    public static final ResourceLoader resourceLoader = new DefaultResourceLoader();

    /**
     * 지정한 리소스의 위치가 URL인지 아닌지 확인한다. 리소스 위치를 "classpath" 또는 표준 URL을 지정하도록 한다.
     *
     * @param resourceLocation 리소스 위치
     * @return URL이 맞으면 <tt>true</tt>
     * @see #CLASSPATH_URL_PREFIX
     * @see java.net.URL
     */
    public static boolean isUrl(String resourceLocation) {
        if (resourceLocation == null) {
            return false;
        }
        if (resourceLocation.startsWith(CLASSPATH_URL_PREFIX)) {
            return true;
        }
        try {
            new URL(resourceLocation);
            return true;
        } catch (MalformedURLException e) {
            return false;
        }
    }

    /**
     * 지정한 문자열 URL에 대해서 {@link java.net.URL}을 반환한다.
     *
     * @param resourceLocation 문자열 URL
     * @return 상응하는 {@link java.net.URL} 객체
     * @throws java.io.FileNotFoundException 파일을 찾을 수 없는 경우
     */
    public static URL getURL(String resourceLocation) throws FileNotFoundException {
        if (resourceLocation.startsWith(CLASSPATH_URL_PREFIX)) {
            String path = resourceLocation.substring(CLASSPATH_URL_PREFIX.length());
            URL url = ClassUtils.getDefaultClassLoader().getResource(path);
            if (url == null) {
                String description = "CLASSPATH 리소스 [" + path + "]";
                throw new FileNotFoundException(description + "을 URL에서 찾을 수 없습니다. 지정한 URL에 파일이 존재하는지 확인하십시오.");
            }
            return url;
        }
        try {
            // URL 시도
            return new URL(resourceLocation);
        } catch (MalformedURLException e) {
            // no URL -> 파일 경로로 취급
            try {
                return new URL(FILE_URL_PREFIX + resourceLocation);
            } catch (MalformedURLException mue) {
                throw new FileNotFoundException("리소스 위치 [" + resourceLocation + "]은 URL도 아니며 정상적인 파일 경로도 아닙니다.");
            }
        }
    }

    /**
     * 주어진 리소스의 위치를 파일 시스템의 {@link java.io.File}로 변환한다. 실제 파일이 존재하는지 검사하지 않는다.
     *
     * @param resourceLocation 리소스의 위치. 리소스의 위치를 지정할 때에는 "classpath:", "file:" 및 일반 파일 경로를 사용한다.
     * @return 상응하는 {@link java.io.File} 객체
     * @throws java.io.FileNotFoundException 파일을 찾을 수 없는 경우
     */
    public static File getFile(String resourceLocation) throws FileNotFoundException {
        if (resourceLocation.startsWith(CLASSPATH_URL_PREFIX)) {
            String path = resourceLocation.substring(CLASSPATH_URL_PREFIX.length());
            String description = "CLASSPATH 리소스 [" + path + "]";
            URL url = getDefaultClassLoader().getResource(path);
            if (url == null) {
                throw new FileNotFoundException(description + "은 절대 파일 경로가 아닙니다. 왜냐하면 파일 시스템에 존지하지 않기 때문입니다.");
            }
            return getFile(url, description);
        }
        try {
            // URL 시도
            return getFile(new URL(resourceLocation));
        } catch (MalformedURLException e) {
            // no URL -> 파일 경로로 취급
            return new File(resourceLocation);
        }
    }

    /**
     * 기본 클래스 로더를 반환한다. 이 메소드는 가장 먼저 이 클래스를 호출하는 쓰레드의 컨텍스트 클래스 로더를 찾고 만약에 쓰레드 컨텍스트 클래스 로더가 <tt>null</tt>이라면 이 클래스를 로딩한
     * 클래스 로더를 반환한다.
     *
     * @return 클래스 로더
     */
    private static ClassLoader getDefaultClassLoader() {
        ClassLoader cl = null;
        try {
            cl = Thread.currentThread().getContextClassLoader();
        } catch (Throwable e) {
            e.printStackTrace();
            System.out.println("Cannot access context loader of thread. Use system class loader");
        }
        if (cl == null) {
            // 쓰레드 컨텍스트 클래스 로더가 없음 -> 이 클래스의 클래스 로더를 그대로 사용함
            cl = ResourceUtils.class.getClassLoader();
        }
        return cl;
    }

    /**
     * 주어진 리소스의 위치를 파일 시스템의 {@link java.io.File}로 변환한다.
     *
     * @param resourceUrl 리소스의 위치
     * @return 상응하는 {@link java.io.File} 객체
     * @throws java.io.FileNotFoundException 파일을 찾을 수 없는 경우
     */
    public static File getFile(URL resourceUrl) throws FileNotFoundException {
        return getFile(resourceUrl, "URL");
    }

    /**
     * 주어진 리소스의 위치를 파일 시스템의 {@link java.io.File}로 변환한다.
     *
     * @param resourceUrl 리소스의 위치
     * @param description 원 리소스 위치에 대한 설명(예; 클래스 패스 위치)
     * @return 상응하는 {@link java.io.File} 객체
     * @throws java.io.FileNotFoundException 파일을 찾을 수 없는 경우
     */
    @SuppressWarnings({"deprecation"})
    public static File getFile(URL resourceUrl, String description) throws FileNotFoundException {
        if (!URL_PROTOCOL_FILE.equals(resourceUrl.getProtocol())) {
            String message = MessageFormatter.format("'{}' is not absolute path because does not exists.", description, resourceUrl).getMessage();
            throw new FileNotFoundException(message);
        }
        return new File(URLDecoder.decode(resourceUrl.getFile()));
    }

    /**
     * 지정한 URL이 Jar 파일 내에 있는 리소스 인지 확인한다. 즉, "jar", "zip"을 가지고 있는 프로토콜을 확인한다. "zip"은 WebLogic에서 사용하며 Jar 파일로 취급한다.
     *
     * @param url 검사할 URL
     * @return JAR 파일인지 여부
     */
    public static boolean isJarURL(URL url) {
        String protocol = url.getProtocol();
        return (URL_PROTOCOL_JAR.equals(protocol) || URL_PROTOCOL_ZIP.equals(protocol));
    }

    /**
     * 주어진 URL(Jar 파일내에 존재하는 리소스 또는 Jar 파일 그 자체)로 부터 실제 Jar 파일에 대한 URL을 추출한다(Jar 파일 그 자체 또는 Jar 파일 내의 리소스를 지정하게 된다).
     *
     * @param jarUrl 원 리소스 위치
     * @return 상응하는 {@link java.net.URL} 객체
     * @throws java.net.MalformedURLException URL 형식이 잘못된 경우
     */
    public static URL extractJarFileURL(URL jarUrl) throws MalformedURLException {
        String urlFile = jarUrl.getFile();
        int separatorIndex = urlFile.indexOf(JAR_URL_SEPARATOR);
        if (separatorIndex != -1) {
            String jarFile = urlFile.substring(0, separatorIndex);
            try {
                return new URL(jarFile);
            } catch (MalformedURLException e) {
                // 아마도 원 Jar URL 내의 프로토콜이 아닌 것 같음(예; "jar:C:/mypath/myjar.jar").
                // 파일 시스템에 있는 Jar 파일을 지정하는 것 같음
                if (!jarFile.startsWith("/")) {
                    jarFile = "/" + jarFile;
                }
                return new URL(FILE_URL_PREFIX + jarFile);
            }
        } else {
            return jarUrl;
        }
    }

    /**
     * 지정한 리소스에 대한 {@link org.springframework.core.io.Resource}를 반환한다.
     *
     * @param location 리소스 위치
     * @return {@link org.springframework.core.io.Resource}
     */
    public static Resource getResource(String location) {
        return resourceLoader.getResource(location);
    }

    /**
     * 지정한 리소스에 대한 {@link org.springframework.core.io.Resource}의 내용을 문자열로 반환한다.
     *
     * @param location 리소스 위치
     * @return {@link org.springframework.core.io.Resource}의 문자열 내용
     * @throws java.io.IOException 리소스를 로딩할 수 없는 경우
     */
    public static String getResourceTextContents(String location) throws IOException {
        Resource resource = resourceLoader.getResource(location);
        InputStream inputStream = resource.getInputStream();
        return getResourceTextContents(inputStream);
    }

    /**
     * 지정한 리소스에 대한 {@link org.springframework.core.io.Resource}의 내용을 문자열로 반환한다.
     *
     * @param inputStream 리소스 입력 스트림
     * @return {@link org.springframework.core.io.Resource}의 문자열 내용
     * @throws java.io.IOException 입력 스트림을 로딩할 수 없는 경우
     */
    public static String getResourceTextContents(InputStream inputStream) throws IOException {
        BufferedInputStream bis = new BufferedInputStream(inputStream);
        int size = bis.available();
        byte[] bytes = new byte[size];
        bis.read(bytes);
        return new String(bytes, "UTF-8");
    }

    /**
     * 지정한 리소스에 대한 {@link org.springframework.core.io.Resource}의 내용을 바이트 배열로 반환한다.
     *
     * @param location 리소스 위치
     * @return {@link org.springframework.core.io.Resource}의 바이트 배열 내용
     * @throws java.io.IOException 리소스를 로딩할 수 없는 경우
     */
    public static byte[] getResourceByteContents(String location) throws IOException {
        Resource resource = resourceLoader.getResource(location);
        return getResourceByteContents(resource);
    }

    /**
     * 지정한 리소스에 대한 {@link org.springframework.core.io.Resource}의 내용을 문자열로 반환한다.
     *
     * @param resource 리소스
     * @return {@link org.springframework.core.io.Resource}의 문자열 배열 내용
     * @throws java.io.IOException 리소스를 로딩할 수 없는 경우
     */
    public static String getResourceTextContents(Resource resource) throws IOException {
        byte[] resourceByteContents = getResourceByteContents(resource);
        return new String(resourceByteContents, "UTF-8");
    }

    /**
     * 지정한 리소스에 대한 {@link org.springframework.core.io.Resource}의 내용을 바이트 배열로 반환한다.
     *
     * @param resource 리소스
     * @return {@link org.springframework.core.io.Resource}의 바이트 배열 내용
     * @throws java.io.IOException 파일을 로딩할 수 없는 경우
     */
    public static byte[] getResourceByteContents(Resource resource) throws IOException {
        InputStream inputStream = resource.getInputStream();
        int size = inputStream.available();
        byte[] bytes = new byte[size];
        inputStream.read(bytes);
        return bytes;
    }
}
