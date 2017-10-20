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

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import java.io.*;

/**
 * JAXB 처리 유틸리티 클래스. 이 유틸리티 클래스는 JAXB의 Mashaller와 Unmashaller에 대한 처리 유틸리티를 제공한다.
 * 이 클래스는 기본적으로 JAX-WS 2.0을 기반으로 작성되었기 때문에 일부분은 JAX-RPC 환경에서 정상적으로 동작하지 않을 수 있다.
 *
 * @author Edward KIM
 * @since 0.1
 */
public class JaxbUtils {

    /**
     * 해당 패키지에 대한 JAXB Mashaller를 반환한다. JAXB Mashaller는 XML 스키마 객체를 XML 파일로 저장한다.
     * <p>
     * <pre>
     * Marshaller marshaller = JaxbUtils.createMarshaller("com.ankus.domain.request");
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     * <br/>
     * <b>Marshaller와 Unmarshaller는 재사용이 가능하지만 Thread-Safe하지는 않다.</b>
     *
     * @param packageName 패키지명
     * @return {@link javax.xml.bind.Marshaller} 인스턴스
     * @throws javax.xml.bind.JAXBException Marshaller를 생성할 수 없는 경우(예; 패키지명 오류)
     * @see "http://www.docjar.com/docs/api/javax/xml/bind/JAXBContext.html"
     */
    public static Marshaller createMarshaller(String packageName) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(packageName);
        return context.createMarshaller();
    }

    /**
     * 해당 패키지에 대한 JAXM Unmarshaller를 반환한다. JAXB Unmashaller는 XML 파일을 XML 스키마 객체로 로딩한다.
     * <p>
     * <pre>
     * Unmarshaller unmarshaller = JaxbUtils.createUnmarshaller("com.ankus.domain.request");
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     * <br/>
     * <b>Marshaller와 Unmarshaller는 재사용이 가능하지만 Thread-Safe하지는 않다.</b>
     *
     * @param packageName 패키지명
     * @return {@link javax.xml.bind.Unmarshaller} 인스턴스
     * @throws javax.xml.bind.JAXBException Unmarshaller를 생성할 수 없는 경우(예; 패키지명 오류)
     * @see "http://www.docjar.com/docs/api/javax/xml/bind/JAXBContext.html"
     */
    public static Unmarshaller createUnmarshaller(String packageName) throws JAXBException {
        JAXBContext context = JAXBContext.newInstance(packageName);
        return context.createUnmarshaller();
    }

    /**
     * JAXB DOM Object를 XML 파일로 마샬링 한다.
     * <p>
     * <pre>
     * Marshaller marshaller = JaxbUtils.createMarshaller("com.ankus.domain.request");
     * Request requst = ...;
     * JaxbUtils.marshal(marshaller, request, "/home/tester/test.xml");
     * </pre>
     * </p>
     *
     * @param marshaller {@link javax.xml.bind.Marshaller} 인스턴스
     * @param object     XML의 JAXB DOM Object
     * @param filename   저장할 XML 파일명
     * @throws javax.xml.bind.JAXBException  마샬링 할 수 없는 경우
     * @throws java.io.FileNotFoundException 해당 파일이 존재하지 않는 경우(예; 디렉토리)
     */
    public static void marshal(Marshaller marshaller, Object object, String filename) throws JAXBException, FileNotFoundException {
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(filename);
            marshaller.marshal(object, fileOutputStream);
        } finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 해당 패키지에 대한 JAXB DOM Object를 XML 파일로 마샬링한다. 이 메소드는 XML에 대해서 UTF-8로 인코딩을 하며 XML의 Validation을 수행한다.
     * <p>
     * <pre>
     * Request requst = ...;
     * JaxbUtils.marshal(request, "com.ankus.domain.request", "/home/tester/test.xml", "/home/tester/test.xsd");
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param object      XML의 JAXB DOM Object
     * @param packageName 패키지명
     * @param filename    저장할 XML 파일명
     * @param schemaFile  저장할 XML 파일에 대한 스키마 파일
     * @throws javax.xml.bind.JAXBException  마샬링 할 수 없는 경우
     * @throws java.io.FileNotFoundException 해당 파일이 존재하지 않는 경우(예; 디렉토리)
     */
    public static void marshal(Object object, String packageName, String filename, String schemaFile) throws JAXBException, FileNotFoundException {
        JAXBContext jaxbContext = JAXBContext.newInstance(packageName);
        Marshaller marshaller = jaxbContext.createMarshaller();
        marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
        marshaller.setProperty(Marshaller.JAXB_ENCODING, "UTF-8");
        marshaller.setProperty(Marshaller.JAXB_SCHEMA_LOCATION, "http://www.w3.org/2001/XMLSchema-instance");
        marshaller.setProperty(Marshaller.JAXB_NO_NAMESPACE_SCHEMA_LOCATION, schemaFile);
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(filename);
            marshaller.marshal(object, fileOutputStream);
        } finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * 해당 패키지에 대한 JAXB DOM Object를 XML 파일로 마샬링한다.
     * <p>
     * <pre>
     * Request requst = ...;
     * JaxbUtils.marshal(request, "com.ankus.domain.request", "/home/tester/test.xml");
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param object      XML의 JAXB DOM Object
     * @param packageName 패키지명
     * @param filename    저장할 XML 파일명
     * @throws javax.xml.bind.JAXBException  마샬링 할 수 없는 경우
     * @throws java.io.FileNotFoundException 해당 파일이 존재하지 않는 경우(예; 디렉토리)
     */
    public static void marshal(Object object, String packageName, String filename) throws JAXBException, FileNotFoundException {
        JAXBContext jaxbContext = JAXBContext.newInstance(packageName);
        Marshaller marshaller = jaxbContext.createMarshaller();
        FileOutputStream fileOutputStream = null;
        try {
            fileOutputStream = new FileOutputStream(filename);
            marshaller.marshal(object, fileOutputStream);
        } finally {
            if (fileOutputStream != null) {
                try {
                    fileOutputStream.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }
        }
    }

    /**
     * JAXB DOM Object를 XML로 변환한다.
     * <p>
     * <pre>
     * Request request = ...; // Request XML에 대한 JAXB DOM Root Object
     * String xml = JaxbUtils.marshal("com.ankus.domain.request", request);
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param packageName 패키지명 (예; "<tt>com.ankus.sal.domain.request</tt>")
     * @param object      XML로 변환하고자 하는 JAXB DOM Object
     * @return String type의 XML데이터
     * @throws javax.xml.bind.JAXBException 마샬링 할 수 없는 경우
     * @throws java.io.IOException          XML 파일을 로딩할 수
     */
    public static String marshal(String packageName, Object object) throws JAXBException, IOException {
        Marshaller marshaller = null;
        StringWriter writer = null;
        try {
            marshaller = createMarshaller(packageName);
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            writer = new StringWriter();
            marshaller.marshal(object, writer);
            return writer.toString();
        } finally {
            if (writer != null) {
                writer.close();
            }
        }
    }

    /**
     * JAXB DOM Object를 XML로 변환한다.
     * <p>
     * <pre>
     * Request request = ...; // Request XML에 대한 JAXB DOM Root Object
     * String xml = JaxbUtils.marshal(marshaller, request);
     * </pre>
     * </p>
     *
     * @param marshaller JAXB Marshaller
     * @param object     XML로 변환하고자 하는 JAXB DOM Object
     * @return String type의 XML데이터
     * @throws javax.xml.bind.JAXBException 마샬링 할 수 없는 경우
     * @throws java.io.IOException          XML 파일을 로딩할 수
     */
    public static String marshal(Marshaller marshaller, Object object) throws JAXBException, IOException {
        StringWriter writer = null;
        try {
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, Boolean.TRUE);
            writer = new StringWriter();
            marshaller.marshal(object, writer);
            return writer.toString();
        } finally {
            if (writer != null) {
                writer.close();
            }
        }
    }

    /**
     * XML을 JAXB DOM Object로 변환한다.
     * <p>
     * <pre>
     * Request request = (Request) JaxbUtils.marshal("com.ankus.domain.request", "/home/tester/xml", "test.xml");
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param packageName 패키지명 (예; "<tt>com.ankus.sal.domain.request</tt>")
     * @param xmlFilePath XML의 절대 경로 (예; "<tt>/home/tester/xml</tt>")
     * @param xmlFileName XML 파일명 (예; "<tt>test.xml</tt>")
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(String packageName, String xmlFilePath, String xmlFileName) throws JAXBException {
        Unmarshaller unmarshaller = createUnmarshaller(packageName);
        return unmarshaller.unmarshal(new File(xmlFilePath + File.separator + xmlFileName));
    }

    /**
     * XML을 JAXB DOM Object로 변환한다.
     * <p>
     * <pre>
     * Request request = (Request) JaxbUtils.marshal(unmarshaller, "/home/tester/xml", "test.xml");
     * </pre>
     * </p>
     *
     * @param unmarshaller JAXB Unmarshaller
     * @param xmlFilePath  XML의 절대 경로 (예; "<tt>/home/tester/xml</tt>")
     * @param xmlFileName  XML 파일명 (예; "<tt>test.xml</tt>")
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(Unmarshaller unmarshaller, String xmlFilePath, String xmlFileName) throws JAXBException {
        return unmarshaller.unmarshal(new File(xmlFilePath + File.separator + xmlFileName));
    }

    /**
     * XML을 JAXB DOM Object로 변환한다.
     * <p>
     * <pre>
     * String xml = "&lt;Request&gt;...&lt;/Request&gt;";
     * Request request = (Request) JaxbUtils.marshal("com.ankus.domain.request", xml);
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param packageName 패키지명 (예; "<tt>com.ankus.sal.domain.request</tt>")
     * @param xmlData     문자열 형태의 XML 내용
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(String packageName, String xmlData) throws JAXBException {
        Unmarshaller unmarshaller = createUnmarshaller(packageName);
        StringReader reader = null;
        try {
            reader = new StringReader(xmlData.replace("&", "&amp;"));
            return unmarshaller.unmarshal(reader);
        } finally {
            if (reader != null) {
                reader.close();
            }
        }
    }

    /**
     * XML을 JAXB DOM Object로 변환한다.
     * <p>
     * <pre>
     * String xml = "&lt;Request&gt;...&lt;/Request&gt;";
     * Request request = (Request) JaxbUtils.marshal(unmarshaller, xml);
     * </pre>
     * </p>
     *
     * @param unmarshaller JAXB Unmarshaller
     * @param xmlData      문자열 형태의 XML 내용
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(Unmarshaller unmarshaller, String xmlData) throws JAXBException {
        StringReader reader = null;
        try {        	
            reader = new StringReader(xmlData.replace("&", "&amp;"));
            return unmarshaller.unmarshal(reader);
        } finally {
            if (reader != null) {
                reader.close();
            }
        }
    }

    /**
     * XML을 JAXB DOM Object로 변환한다.
     * <p>
     * <pre>
     * InputStream inputStream = ...; // XML을 읽기 위한 입력 스트림
     * Request request = (Request) JaxbUtils.marshal("com.ankus.domain.request", inputStream);
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param packageName 패키지명 (예; "<tt>com.ankus.sal.domain.request</tt>")
     * @param inputStream XML 문서를 읽기 위한 입력 스트림
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(String packageName, InputStream inputStream) throws JAXBException {
        Unmarshaller unmarshaller = createUnmarshaller(packageName);
        return unmarshaller.unmarshal(inputStream);
    }

    /**
     * XML을 JAXB DOM Object로 변환한다.
     * <p>
     * <pre>
     * InputStream inputStream = ...; // XML을 읽기 위한 입력 스트림
     * Request request = (Request) JaxbUtils.marshal(unmarshaller, inputStream);
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param unmarshaller JAXB Unmarshaller
     * @param inputStream  XML 문서를 읽기 위한 입력 스트림
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(Unmarshaller unmarshaller, InputStream inputStream) throws JAXBException {
        return unmarshaller.unmarshal(inputStream);
    }

    /**
     * XML을 JAXB DOM Object로 변환한다. 이 메소드는 JAX-WS를 기반으로 하고 있다.
     * <p>
     * <pre>
     * String xml = "&lt;Request&gt;...&lt;/Request&gt;";
     * StringReader reader = new StringReader(xml);
     * Request request = (Request) JaxbUtils.marshal("com.ankus.domain.request", reader);
     * </pre>
     * </p>
     * <b>이 메소드를 반복적으로 호출하면 성능 문제가 발생한다. {@link javax.xml.bind.JAXBContext#createMarshaller()} 및 {@link javax.xml.bind.JAXBContext#createUnmarshaller()} 메소는
     * 반복적으로 호출하는 경우 성능 문제를 발생하기 때문이다.</b>
     *
     * @param packageName 패키지명 (예; "<tt>com.ankus.sal.domain.request</tt>")
     * @param reader      XML 문서를 읽기 위한 Reader
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(String packageName, Reader reader) throws JAXBException {
        Unmarshaller unmarshaller = createUnmarshaller(packageName);
        return unmarshaller.unmarshal(reader);
    }

    /**
     * XML을 JAXB DOM Object로 변환한다. 이 메소드는 JAX-WS를 기반으로 하고 있다.
     * <p>
     * <pre>
     * String xml = "&lt;Request&gt;...&lt;/Request&gt;";
     * StringReader reader = new StringReader(xml);
     * Request request = (Request) JaxbUtils.marshal(marshaller, reader);
     * </pre>
     * </p>
     *
     * @param unmarshaller JAXB Unmarshaller
     * @param reader       XML 문서를 읽기 위한 Reader
     * @return Object XML의 JAXB DOM Object
     * @throws javax.xml.bind.JAXBException unmarshal할 수 없는 경우
     */
    public static Object unmarshal(Unmarshaller unmarshaller, Reader reader) throws JAXBException {
        return unmarshaller.unmarshal(reader);
    }

}