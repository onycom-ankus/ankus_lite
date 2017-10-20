/**
 * ankus Project
 *
 * Copyright (C) 2011-2013 Cloudine.
 *
 * This file is part of ankus Project.
 */
package com.ankus.core.exception;

/**
 * File System Exception
 *
 * @author Edward KIM
 * @since 0.1
 */
public class FileSystemException extends SystemException {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * 기본 생성자.
     */
    public FileSystemException() {
        super();
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     */
    public FileSystemException(String message) {
        super(message);
    }

    /**
     * 기본 생성자.
     *
     * @param message 예외 메시지
     * @param cause   예외 원인
     */
    public FileSystemException(String message, Throwable cause) {
        super(message, cause);
    }

    /**
     * 기본 생성자.
     *
     * @param cause 예외 원인
     */
    public FileSystemException(Throwable cause) {
        super(cause);
    }

}
