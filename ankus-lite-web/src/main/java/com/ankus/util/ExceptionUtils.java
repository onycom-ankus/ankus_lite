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

import org.slf4j.Logger;
import org.slf4j.helpers.MessageFormatter;

/**
 * Exception Utilty.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class ExceptionUtils {

    /**
     * 메시지 패턴과 파라미터를 기반으로 예외 메시지를 구성한다.
     *
     * @param message SLF4J 형식의 메시지 패턴
     * @param args    메시지 패턴의 인자와 매핑하는 파라미터값
     * @return 예외 메시지
     */
    public static String getMessage(String message, Object... args) {
        return MessageFormatter.arrayFormat(message, args).getMessage();
    }

    /**
     * 발생한 예외에 대해서 ROOT Cause를 반환한다.
     *
     * @param exception 발생한 Exception
     * @return ROOT Cause
     */
    public static Throwable getRootCause(Exception exception) {
        return org.apache.commons.lang.exception.ExceptionUtils.getRootCause(exception);
    }

    /**
     * 발생한 예외에 대해서 Full Stack Trace를 logger에 경로 레벨로 남긴다.
     *
     * @param exception Exception
     * @param logger    SLF4J Logger
     */
    public static void printFullStackTrace(Exception exception, Logger logger) {
        logger.warn(org.apache.commons.lang.exception.ExceptionUtils.getFullStackTrace(exception));
    }

    /**
     * 발생한 예외에 대해서 Full Stack Trace를 반환한다.
     *
     * @param exception Exception
     * @return Full Stack Trace
     */
    public static String getFullStackTrace(Exception exception) {
        return org.apache.commons.lang.exception.ExceptionUtils.getFullStackTrace(exception);
    }
}
