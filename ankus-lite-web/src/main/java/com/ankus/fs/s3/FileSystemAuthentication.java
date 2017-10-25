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

import java.util.Properties;

/**
 * S3 Authentication 정보를 유지하는 Single Authentication.
 *
 * @author Byoung Gon, Kim
 * @since 0.3
 */
public class FileSystemAuthentication {

    static ThreadLocal<Properties> threadLocal = new ThreadLocal<Properties>();

    /**
     * 기본 생성자. 직접 호출이 불가하다.
     */
    private FileSystemAuthentication() {
    }

    public static void setProperties(Properties properties) {
        threadLocal.set(properties);
    }

    public static void remove() {
        threadLocal.remove();
    }

    public static Properties getProperties() {
        return threadLocal.get();
    }

    public static String getAccessKey() {
        return getProperties().getProperty("s3.accessKey");
    }

    public static String getSecretKey() {
        return getProperties().getProperty("s3.secretKey");
    }

    public static String getProxyAddress() {
        return getProperties().getProperty("network.proxy.host");
    }

    public static String getProxyPort() {
        return getProperties().getProperty("network.proxy.port");
    }

    public static boolean isTestEnvironment() {
        try {
            return Boolean.parseBoolean(getProperties().getProperty("test.env"));
        } catch (Exception ex) {
            return false;
        }
    }
}
