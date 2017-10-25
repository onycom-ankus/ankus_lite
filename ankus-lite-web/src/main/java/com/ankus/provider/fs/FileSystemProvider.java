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
package com.ankus.provider.fs;

import com.ankus.model.rest.FileInfo;

import java.io.DataOutput;
import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * 파일 시스템에 접근할 수 있는 각종 기능을 제공하는 파일 시스템 프로바이더.
 *
 * @author Edward KIM, Soryoung KIM
 * @since 0.3
 */
public interface FileSystemProvider<T> {

    /**
     * 지정한 경로의 파일 및 디렉토리 목록을 반환한다.
     *
     * @param path          디렉토리
     * @param directoryOnly 디렉토리로 구성된 목록 구성시 <tt>true</tt>, 파일과 디렉토리를 모두 포함하는 경우 <tt>false</tt>
     * @return 파일 및 디렉토리 목록
     */
    List<FileInfo> list(String path, boolean directoryOnly);

    /**
     * 지정한 경로의 파일 목록을 반환한다.
     *
     * @param path 디렉토리
     * @return 파일 목록
     */
    List<FileInfo> list(String path);

    /**
     * 지정한 경로의 파일 또는 디렉토리가 존재하는지 확인한다.
     *
     * @param path 존재 유무를 확인할 경로
     * @return <tt>true</tt>인 경우 존재.
     */
    boolean exists(String path);

    /**
     * 지정한 경로의 파일 또는 디렉토리 개수를 반환한다.
     *
     * @param path          디렉토리
     * @param directoryOnly 디렉토리로 구성된 목록 구성시 <tt>true</tt>, 파일과 디렉토리를 모두 포함하는 경우 <tt>false</tt>
     * @return 파일 또는 디렉토리 개수
     */
    int getCount(String path, boolean directoryOnly);

    /**
     * 지정한 경로의 파일 정보를 반환한다.
     *
     * @param path 파일의 경로
     * @return 파일 정보
     */
    FileInfo getFileInfo(String path);

    /**
     * 지정한 파일의 내용을 반환한다.
     *
     * @param path 내용을 반환할 경로
     * @return 입력스트림
     */
    InputStream getContent(String path);

    /**
     * 지정한 경로를 삭제한다.
     *
     * @param path 삭제할 경로
     * @return 정상 삭제 여부
     */
    boolean delete(String path);

    /**
     * 지정한 경로를 삭제한다.
     *
     * @param paths 삭제할 경로
     * @return 삭제하지 못한 경로
     */
    List<String> delete(List<String> paths);

    /**
     * 지정한 경로를 삭제한다.
     *
     * @param paths 삭제할 경로
     * @return 삭제하지 못한 경로
     */
    List<String> delete(String[] paths);

    /**
     * 파일을 생성한다.
     *
     * @return 파일 출력을 위한 출력스트림
     */
    DataOutput create(String fileName);

    /**
     * 파일 또는 디렉토리의 이름을 변경한다.
     *
     * @param from 이름을 변경할 파일 또는 디렉토리
     * @param name 변경할 이름
     * @return 이름이 변경된 경우
     */
    boolean rename(String from, String name);

    /**
     * 지정한 파일 또는 디렉토리를 이동한다.
     *
     * @param file 이동할 파일
     * @param to   이동할 디렉토리
     * @return 정상적으로 이동한 경우 <tt>true</tt>
     */
    boolean move(String file, String to);

    /**
     * 파일 또는 디렉토리를 이동한다.
     *
     * @param files 이동할 파일 목록
     * @param to    이동할 디렉토리
     * @return 이동하지 못한 파일 목록
     */
    List<String> move(List<String> files, String to);

    /**
     * 지정한 파일을 디렉토리로 복사한다.
     *
     * @param file 복사할 파일
     * @param to   복사할 디렉토리
     * @return 정상적으로 복사한 경우 <tt>true</tt>
     */
    boolean copy(String file, String to);

    /**
     * 디렉토리를 생성한다.
     *
     * @param path 생성할 디렉토리
     * @return 정상적으로 생성된 경우 <tt>true</tt>
     */
    boolean mkdir(String path);

    /**
     * 지정한 파일 목록을 해당 디렉토리로 복사한다.
     *
     * @param files 복사할 파일 목록
     * @param to    복사할 디렉토리
     * @return 복사하지 못한 파일 목록
     */
    List<String> copy(List<String> files, String to);

    /**
     * Apache Ant Path Pattern와 일치하는지 여부를 확인한다.
     *
     * @param antPathPattern Apache Ant Path Pattern
     * @param path           Apache Ant Path Pattern 일치 여부를 확인할 경로
     * @return Apache Ant Path Pattern와 일치하는 경우 <tt>true</tt>
     */
    boolean isMatch(String path, String antPathPattern);

    /**
     * 파일을 저장한다.
     *
     * @param is   입력 스트림
     * @param path 저장할 경로
     */
    boolean save(InputStream is, String path);

    /**
     * 바이트 배열을 파일로 저장한다.
     *
     * @param path    저장할 경로
     * @param content 파일로 저장할 바이트 배열
     */
    boolean save(String path, byte[] content);

    /**
     * 바이트 배열을 파일로 저장한다.
     *
     * @param path    저장할 경로
     * @param content 파일로 저장할 바이트 배열
     */
    boolean save2(String path, byte[] content, boolean isfirst);
    
    /**
     * File System Provider의 파일 시스템 객체를 반환한다.
     *
     * @return Native File System Object
     */
    
    T getNativeFileSystem();

    /**
     * 파일 시스템의 상태 정보를 반환한다.
     *
     * @param type 파일 시스템의 구분 코드(FIXME)
     * @return Key Value 형식의 상태 정보
     */
    Map<String, Object> getFileSystemStatus(String type);

    /**
     * 지정한 경로의 파일 크기를 반환한다.
     *
     * @param path          디렉토리
     * @param directoryOnly 디렉토리로 구성된 목록 구성시 <tt>true</tt>, 파일과 디렉토리를 모두 포함하는 경우 <tt>false</tt>
     * @return 디렉토리 크기
     */
    long getSize(String path, boolean directoryOnly);

    /**
     * 지정한 경로의 파일을 로딩한다. 이 메소드는 큰 파일 또는 동시에 다수의 사용자가 호출하는 경우 많는 양의 Heap을 소비할 수 있다.
     *
     * @param path     로딩할 파일이 있는 경로
     * @param filename 로딩할 파일의 파일명
     * @return 파일의 바이트 배열
     */
    byte[] load(String path, String filename);

    /**
     * 지정한 경로의 파일을 로딩한다. 이 메소드는 큰 파일 또는 동시에 다수의 사용자가 호출하는 경우 많는 양의 Heap을 소비할 수 있다.
     *
     * @param path     로딩할 파일이 있는 경로
     * @param filename 로딩할 파일의 파일명
     * @return 파일을 지정 위치 읽기
     */
	byte[] load(String path, long offset, int len);

    /**
     * 지정한 경로의 파일을 로딩한다. 이 메소드는 큰 파일 또는 동시에 다수의 사용자가 호출하는 경우 많는 양의 Heap을 소비할 수 있다.
     *
     * @param path     로딩할 파일이 있는 경로
     * @param filename 로딩할 파일의 파일명
     * @return 파일을 라인수만큼 읽기
     */
	String readlines(String path, int linecnt);

}
