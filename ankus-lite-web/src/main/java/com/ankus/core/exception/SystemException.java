/**
 * ankus Project
 *
 * Copyright (C) 2011-2013 Cloudine.
 *
 * This file is part of ankus Project.
 */
package com.ankus.core.exception;

/**
 * Default System Exception
 *
 * @author Edward KIM
 * @since 0.1
 */
public class SystemException extends RuntimeException {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * 기본 생성자.
     */
    public SystemException() {
        super();
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public SystemException(String message) {
        super(message);
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public SystemException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * 기본 생성자.
     *
     * @param cause 예외 원인
     */
    public SystemException(Throwable cause) {
        super(cause);
    }

    /**
     * Root Cause를 반환한다.
     *
     * @return Root Cause
     */
    public Throwable getRootCause() {
        return super.getCause();
    }
}
