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
package com.ankus.el;

import com.ankus.core.exception.SystemException;

/**
 * 파일 시스템을 처리할 수 없는 경우 던지는 예외.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class ELEvaluationException extends SystemException {

    private static final long serialVersionUID = 1;

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public ELEvaluationException(String message) {
        super(message);
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public ELEvaluationException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * 기본 생성자.
     *
     * @param cause 예외 원인
     */
    public ELEvaluationException(Throwable cause) {
        super(cause);
    }

}