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
package com.ankus.core.exception;

/**
 * Hadoop Manager 전체에서 사용하는 런타임 예외.
 *
 * @author Edward KIM
 * @since 0.2
 */
public class WorkflowException extends RuntimeException {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * 기본 생성자.
     */
    public WorkflowException() {
        super();
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public WorkflowException(String message) {
        super(message);
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public WorkflowException(String message, Throwable throwable) {
        super(message, throwable);
    }

    /**
     * 기본 생성자.
     */
    public WorkflowException(Throwable throwable) {
        super(throwable);
    }
}
