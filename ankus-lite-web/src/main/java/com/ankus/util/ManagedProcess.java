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

import com.google.common.base.Joiner;
import com.ankus.core.exception.ProcessFailureException;
import org.slf4j.Logger;

import java.io.*;
import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * {@link Process}의 관리 기능을 제공하기 위한 Process.
 * 출력은 데드락을 방지하기 위해서 별도 쓰레드로 처리한다.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class ManagedProcess {

    /**
     * 프로세스의 작업 디렉토리
     */
    private final String workingDir;

    /**
     * 실행할 커맨드 라인 리스트
     */
    private final List<String> cmd;

    /**
     * Key Value 환경 변수 목록
     */
    private final Map<String, String> env;

    /**
     * Process Startup의 Count Down Latch
     */
    private final CountDownLatch startupLatch;

    /**
     * Process Complete의 Count Down Latch
     */
    private final CountDownLatch completeLatch;

    /**
     * Process ID
     */
    private volatile int processId;

    /**
     * 커맨드 라인에서 실행하는 프로세스
     */
    private volatile Process process;

    /**
     * SLF4J Logging
     */
    private Logger logger;

    /**
     * 기본 생성자.
     *
     * @param cmd        공백을 구분자로 갖는 커맨드 라인 문자열
     * @param env        Key Value 환경 변수
     * @param workingDir 작업 디렉토리
     * @param logger     로거
     */
    public ManagedProcess(final String cmd, final Map<String, String> env, final String workingDir, final Logger logger) {
        this.cmd = StringUtils.stringToCollection(cmd, " ");
        this.env = env;
        this.workingDir = workingDir;
        this.processId = -1;
        this.startupLatch = new CountDownLatch(1);
        this.completeLatch = new CountDownLatch(1);
        this.logger = logger;
    }

    /**
     * 기본 생성자.
     *
     * @param cmd        커맨드 라인 목록
     * @param env        Key Value 환경 변수
     * @param workingDir 작업 디렉토리
     * @param logger     로거
     */
    public ManagedProcess(final List<String> cmd, final Map<String, String> env, final String workingDir, final Logger logger) {
        this.cmd = cmd;
        this.env = env;
        this.workingDir = workingDir;
        this.processId = -1;
        this.startupLatch = new CountDownLatch(1);
        this.completeLatch = new CountDownLatch(1);
        this.logger = logger;
    }

    /**
     * 이 프로세스를 실행한다. 프로세스가 완료될 때까지 블로킹한다.
     */
    public void run() throws IOException {
        if (this.isStarted() || this.isComplete()) {
            throw new IllegalStateException("Process is started or completed.");
        }

        ProcessBuilder builder = new ProcessBuilder(cmd);
        builder.directory(new File(workingDir));
        builder.environment().putAll(env);
        this.process = builder.start();
        this.processId = processId(process);
        if (processId == 0) {
            logger.debug("Cannot get process's id.");
        } else {
            logger.debug("Process ID : " + processId);
        }

        this.startupLatch.countDown();

        LogGobbler outputGobbler = new LogGobbler(new InputStreamReader(process.getInputStream()), logger, 30);
        LogGobbler errorGobbler = new LogGobbler(new InputStreamReader(process.getErrorStream()), logger, 30);

        outputGobbler.start();
        errorGobbler.start();
        int exitCode = -1;
        try {
            exitCode = process.waitFor();
        } catch (InterruptedException e) {
            logger.info("Interrupted process", e);
        }

        completeLatch.countDown();
        if (exitCode != 0) {
            logger.warn("Exit code is '{}'", exitCode);
            throw new ProcessFailureException(exitCode, errorGobbler.getRecentLog());
        }

        // 종료하기 전에 모든 로그가 완료될때까지 대기한다.
        outputGobbler.awaitCompletion(5000);
        errorGobbler.awaitCompletion(5000);
    }

    /**
     * 프로세스의 종료를 대기한다.
     *
     * @throws InterruptedException 대기중에 쓰레드가 인터럽트에 걸리는 경우
     */
    public void awaitCompletion() throws InterruptedException {
        this.completeLatch.await();
    }

    /**
     * 프로세스 시작을 대기한다.
     *
     * @throws InterruptedException 대기중에 쓰레드가 인터럽트가 걸리는 경우
     */
    public void awaitStartup() throws InterruptedException {
        this.startupLatch.await();
    }

    /**
     * 실행중인 프로세스의 Process ID를 반환한다.
     *
     * @return Process ID 또는 알 수 없는 경우 -1
     */
    public int getProcessId() {
        checkStarted();
        return this.processId;
    }

    /**
     * 프로세스를 종료한다. 이 기능은 프로세스가 시작되지 않은 상태에서는 동작하지 않는다.
     *
     * @param time 대기 시간
     * @param unit 시간 단위
     * @return 지정한 지간에 프로세스가 종료된 경우 <tt>true</tt>
     */
    public boolean softKill(final long time, final TimeUnit unit)
        throws InterruptedException {
        checkStarted();
        if (processId != 0 && isStarted()) {
            try {
                Runtime.getRuntime().exec("kill " + processId);
                return completeLatch.await(time, unit);
            } catch (IOException e) {
                logger.error("Cannot kill", e);
            }
            return false;
        }
        return false;
    }

    /**
     * 쓰레드 덤프를 생성한다. 이 기능은 서버측의 콘솔 로그를 확인해야 한다.
     * 이 기능은 프로세스가 시작되지 않은 상태에서는 동작하지 않는다.
     *
     * @throws InterruptedException 현제 프로세스가 인터럽트가 걸린 경우
     */
    public void dumpThread() throws InterruptedException {
        checkStarted();
        if (processId != 0 && isStarted()) {
            try {
                Runtime.getRuntime().exec("kill -3" + processId);
            } catch (IOException e) {
                logger.error("Cannot dump", e);
            }
        }
    }

    /**
     * 강제로 프로세스를 종료한다. 이 기능은 프로세스가 시작되지 않은 상태에서는 동작하지 않는다.
     */
    public void hardKill() {
        checkStarted();
        if (isRunning()) {
            process.destroy();
        }
    }

    /**
     * 현재 실행중인 프로세스의 Process ID를 반환한다.
     *
     * @param process Process ID를 확인할 프로세스
     * @return Process ID
     */
    private int processId(final Process process) {
        int processId = 0;
        try {
            Field f = process.getClass().getDeclaredField("pid");
            f.setAccessible(true);

            processId = f.getInt(process);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return processId;
    }

    /**
     * 프로세스가 시작되었는지 확인하다.
     *
     * @return 프로세스가 시작되었다면 <tt>true</tt>
     */
    public boolean isStarted() {
        return startupLatch.getCount() == 0L;
    }

    /**
     * 프로세스가 종료되었는지 확인한다.
     *
     * @return 프로세스가 종료되었다면 <tt>true</tt>
     */
    public boolean isComplete() {
        return completeLatch.getCount() == 0L;
    }

    /**
     * 프로세스가 현재 실행중인지 확인한다.
     *
     * @return 프로세스가 현재 실행행중이라면 <tt>true</tt>
     */
    public boolean isRunning() {
        return isStarted() && !isComplete();
    }

    /**
     * 프로세스가 시작되었는지 확인한다.
     *
     * @throws IllegalStateException 쓰레드가 아직 시작하지 않은 경우
     */
    public void checkStarted() {
        if (!isStarted()) {
            throw new IllegalStateException("Not started");
        }
    }

    @Override
    public String toString() {
        return "Managed Process(cmd = " + Joiner.on(" ").join(cmd) + ", env = " + env + ", working = " + workingDir + ")";
    }

    private static class LogGobbler extends Thread {

        /**
         * 로그 메시지를 읽어들이는 Reader
         */
        private final BufferedReader inputReader;

        /**
         * SLF4J Logger
         */
        private final Logger logger;

        /**
         * 순환 버퍼
         */
        private final CircularBuffer<String> buffer;

        /**
         * 기본 생성자.
         *
         * @param inputReader Reader
         * @param logger      Log4J Logger
         * @param bufferLines Circular Buffer의 크기
         */
        public LogGobbler(final Reader inputReader, final Logger logger, final int bufferLines) {
            this.inputReader = new BufferedReader(inputReader);
            this.logger = logger;
            buffer = new CircularBuffer<String>(bufferLines);
        }

        @Override
        public void run() {
            try {
                // 실행중인 현재 쓰레드가 인터럽트가 걸리지 않은 경우에 대해서 로그의 입력 스트림을 읽어들인다.
                while (!Thread.currentThread().isInterrupted()) {
                    String line = inputReader.readLine();
                    if (line == null) {
                        return;
                    }

                    // 로그 메시지를 버퍼에 추가하고 로그를 남긴다.
                    buffer.append(line);
                    logger.info(line);
                }
            } catch (IOException e) {
                logger.error("Cannot read logging stream.", e);
            }
        }

        /**
         * 완료될떄 까지 대기한다.
         *
         * @param waitMs 대기시간(millis)
         */
        public void awaitCompletion(final long waitMs) {
            try {
                join(waitMs);
            } catch (InterruptedException e) {
                logger.info("Interrupted I/O thread.", e);
            }
        }

        /**
         * 최근 로그 메시지를 반환한다. 로그 메시지의 반환은 순환 버퍼의 내용을 기준으로한다.
         *
         * @return 최근 로그 메시지 문자열
         */
        public String getRecentLog() {
            return Joiner.on(System.getProperty("line.separator")).join(buffer);
        }
    }
}
