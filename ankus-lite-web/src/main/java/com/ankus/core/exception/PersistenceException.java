/**
 * ankus Project
 *
 * Copyright (C) 2011-2013 Cloudine.
 *
 * This file is part of ankus Project.
 */
package com.ankus.core.exception;

/**
 * Persistence Exception
 *
 * @author Edward KIM
 * @since 0.3
 */
public class PersistenceException extends SystemException {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * 기본 생성자.
     */
    public PersistenceException() {
        super();
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public PersistenceException(String message) {
        super(message);
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public PersistenceException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * 기본 생성자.
     *
     * @param cause 예외 원인
     */
    public PersistenceException(Throwable cause) {
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
