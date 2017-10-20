/**
 * ankus Project
 *
 * Copyright (C) 2011-2013 Cloudine.
 *
 * This file is part of ankus Project.
 */
package com.ankus.core.exception;

/**
 * Default Service Exception
 *
 * @author Edward KIM
 * @since 0.1
 */
public class ServiceException extends RuntimeException {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    private String message = null;

    /**
     * 기본 생성자.
     */
    public ServiceException() {
        super();
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public ServiceException(String message) {
        super(message);
        this.message = message;
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public ServiceException(String message, Throwable cause) {
        super(message, cause);
        this.message = message;
    }

    /**
     * 기본 생성자.
     *
     * @param cause 예외 원인
     */
    public ServiceException(Throwable cause) {
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

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return message;
    }
}
