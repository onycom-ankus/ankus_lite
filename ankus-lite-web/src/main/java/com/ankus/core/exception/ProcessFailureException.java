/**
 * ankus Project
 *
 * Copyright (C) 2011-2013 Cloudine.
 *
 * This file is part of ankus Project.
 */
package com.ankus.core.exception;

/**
 * @author Edward KIM
 * @since 0.1
 */
public class ProcessFailureException extends SystemException {

    /**
     * Serialization UID
     */
    private static final long serialVersionUID = 1;

    /**
     * 종료 코드
     */
    private final int exitCode;

    /**
     * 로그 메시지
     */
    private final String logSnippet;

    /**
     * 기본 생성자.
     *
     * @param exitCode   종료 코드
     * @param logSnippet 로그 메시지
     */
    public ProcessFailureException(int exitCode, String logSnippet) {
        super("Process를 실행할 수 없습니다. 프로세스의 종료 코드는 '" + exitCode + "'입니다. 로그 : " + logSnippet);
        this.exitCode = exitCode;
        this.logSnippet = logSnippet;
    }

    /**
     * 종료 코드를 반환한다.
     *
     * @return 종료 코드
     */
    public int getExitCode() {
        return exitCode;
    }

    /**
     * 로그 메시지를 반환한다.
     *
     * @return 로그 메시지
     */
    public String getLogSnippet() {
        return this.logSnippet;
    }

}
