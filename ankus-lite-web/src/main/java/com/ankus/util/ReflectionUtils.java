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

import org.apache.commons.beanutils.PropertyUtils;
import com.ankus.core.exception.WorkflowException;
import org.slf4j.helpers.MessageFormatter;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Collection;
import java.util.Set;

/**
 * Java Reflection Utilty. 이 유티릴티 클래스를 통해서 Java Reflection과 관련된 다양한 API를 손쉽게 사용할 수 있다.
 *
 * @author Byoung Gon, Kim
 * @version 0.1
 */
public class ReflectionUtils {

    /**
     * 지정한 이름으로 식별가능한 {@link Class}가 존재하고 로딩이 가능한지 여부를 결정한다. 클래스가 존재하지 않거나 로디잉 불간으하면 <tt>false</tt>를 반환한다.
     *
     * @param className   검사할 클래스명
     * @param classLoader 사용할 클래스 로더(<tt>null</tt>이 될 수 있음)
     * @return 지정한 클래스가 존재하는지 여부
     */
    public static boolean isPresent(String className, ClassLoader classLoader) {
        return org.springframework.util.ClassUtils.isPresent(className, classLoader);
    }

    /**
     * 원시 자료형("int" 같은) 및 배열 클래스명("String[]" 같은)의 Class 인스턴스도 반환할 수 있는 <tt>Class.forName()</tt>의 대체 메소드다. 이 메소드는 항싱 기본
     * 클래스 로더를 사용한다. 예를 들면 Thread Context Class Loader 또는 ClassUtils를 로딩한 Class Loader이다.
     *
     * @param className 클래스명
     * @return 지정한 클래스명의 Class 인스턴스
     * @throws com.ankus.core.exception.WorkflowException 클래스를 찾을 수 없는 경우
     * @see Class#forName(String, boolean, ClassLoader)
     * @see #getDefaultClassLoader()
     */
    public static Class forName(String className) throws WorkflowException {
        try {
            return org.springframework.util.ClassUtils.forName(className, Thread.currentThread().getContextClassLoader());
        } catch (ClassNotFoundException e) {
            String message = MessageFormatter.format("Cannot find '{}' in CLASSPATH", className).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    /**
     * 원시 자료형("int" 같은) 및 배열 클래스명("String[]" 같은)의 Class 인스턴스도 반환할 수 있는 <tt>Class.forName()</tt>의 대체 메소드다.
     *
     * @param className   클래스명
     * @param classLoader 사용할 클래스 로더(<tt>null</tt>이 될 수 있음)
     * @return 지정한 클래스명의 Class 인스턴스
     * @throws ClassNotFoundException 클래스를 찾을 수 없는 경우
     * @throws LinkageError           클래스 파일을 로딩할 수 없는 경우
     * @see Class#forName(String, boolean, ClassLoader)
     */
    public static Class forName(String className, ClassLoader classLoader) throws ClassNotFoundException, LinkageError {
        return org.springframework.util.ClassUtils.forName(className, classLoader);
    }

    /**
     * 지정한 클래스명을 Class 인스턴스로 결정한다. 이 메소드는 "int"와 같은 원시 자료형 및 "String[]"와 같은 배열 클래스명도 지원한다.
     * <p/><pre>
     * Class clazz = ReflectionUtils.resolveClassName("com.ankus.util.ReflectionUtils",
     * Thread.currentThread().getContextClassLoader());
     * String className = clazz.getName(); // Name is "com.ankus.util.ReflectionUtils"
     * </pre>
     *
     * @param className   클래스명
     * @param classLoader 사용할 클래스 로더(<tt>null</tt>이 될 수 있음)
     * @return 지정한 클래스명의 Class 인스턴스
     * @throws IllegalArgumentException 클래스명을 결정할 수 없는 경우(즉, 클래스 파일을 로딩할 수 없는 경우)
     * @see #forName(String, ClassLoader)
     */
    public static Class resolveClassName(String className, ClassLoader classLoader) throws IllegalArgumentException {
        return org.springframework.util.ClassUtils.resolveClassName(className, classLoader);
    }

    /**
     * 원시 자료형 클래스로 지정한 클래스를 결정한다.
     * <p/><pre>
     * Class clazz = ReflectionUtils.resolvePrimitiveClassName("int");
     * String className = clazz.getName(); // Name is "int"
     * </pre>
     *
     * @param name 원시 자료형 클래스명
     * @return 원시 자료혀 클래스 또는 원시 자료 클래스를 기술하지 않았다면 <tt>null</tt>
     */
    public static Class resolvePrimitiveClassName(String name) {
        return org.springframework.util.ClassUtils.resolvePrimitiveClassName(name);
    }

    /**
     * 패키지명을 포함하지 않은 클래스명을 반환한다.
     *
     * @param className 클래스명
     * @return 짧은 클래스명
     */
    public static String getShortName(String className) {
        return org.springframework.util.ClassUtils.getShortName(className);
    }

    /**
     * 패키지명을 포함하지 않은 클래스명을 반환한다.
     *
     * @param clazz 짧은 이름을 가져올 클래스
     * @return 패키지명이 포함되지 않은 클래스명
     */
    public static String getShortName(Class clazz) {
        return org.springframework.util.ClassUtils.getShortName(clazz);
    }

    /**
     * 자바 빈즈 표준에 따른 Property 형식으로 자바 클래스의 짧은 문자열 이름을 반환한다. 예를 들면 "FooBah"는 "fooBah", "X"는 "x"가 된다. 그러나 "URL"은 여전히 "URL"을
     * 반환한다.
     *
     * @param clazz 클래스
     * @return 자바 빈즈 표준에 따른 Property 형식으로 렌더링된 짧은 이름
     * @see java.beans.Introspector#decapitalize(String)
     */
    public static String getShortNameAsProperty(Class clazz) {
        return org.springframework.util.ClassUtils.getShortNameAsProperty(clazz);
    }

    /**
     * 지정한 클래스의 클래스 파일명을 결정한다. 예를 들면 "Foo"인 경우 "Foo.class"가 된다.
     *
     * @param clazz 클래스
     * @return ".class" 파일의 파일명
     */
    public static String getClassFileName(Class clazz) {
        return org.springframework.util.ClassUtils.getClassFileName(clazz);
    }

    /**
     * 지정한 클래스의 qualified name을 반환한다. "<tt>ClassUtils</tt>"의 경우 "com.ankus.manager.util.ClassUtils"를 반환한다.
     *
     * @param clazz 클래스
     * @return 클래스의 qualified name
     */
    public static String getQualifiedName(Class clazz) {
        return org.springframework.util.ClassUtils.getQualifiedName(clazz);
    }

    /**
     * 지정한 메소드의 qualified 명을 반환한다. 반환하는 이름은 qualified 인터페이스/클래스명 + "." + 메소드명으로 구성된다.
     *
     * @param method 메소드
     * @return qualified 메소드명
     */
    public static String getQualifiedMethodName(Method method) {
        return org.springframework.util.ClassUtils.getQualifiedMethodName(method);
    }

    /**
     * 해당 클래스에 지정한 signature를 가진 생성자가 존재하는지 여부를 결정한다. 이 메소드는 특별하게 <tt>NoSuchMethodException</tt>에 대해서
     * "<tt>false</tt>"로 반환한다.
     *
     * @param clazz      검사할 클래스
     * @param paramTypes 메소드이 파라미터 유형
     * @return 클래스에 해당 생성자가 존재하는지 여부
     */
    public static boolean hasConstructor(Class clazz, Class[] paramTypes) {
        return org.springframework.util.ClassUtils.hasConstructor(clazz, paramTypes);
    }

    /**
     * 해당 클래스에 지정한 signature를 가진 생성자가 존재하는지 여부를 결정한다. 존재한다면 생성자를 반환하고 그렇지 않다면 <tt>null</tt>을 반환한다. 이 메소드는 특별하게
     * <tt>NoSuchMethodException</tt>에 대해서 "<tt>null</tt>"로 반환한다.
     *
     * @param clazz      검사할 클래스
     * @param paramTypes 메소드이 파라미터 유형
     * @return 생성자가 존재하는 경우 생성자를, 존재하지 않는 경우 <tt>null</tt>
     */
    public static Constructor getConstructorIfAvailable(Class clazz, Class[] paramTypes) {
        return org.springframework.util.ClassUtils.getConstructorIfAvailable(clazz, paramTypes);
    }

    /**
     * 지정한 클래스에 해당 signature를 가진 메소드가 있는지 결정한다. 이 메소드는 특별하게 <tt>NoSuchMethodException</tt>에 대해서 "<tt>false</tt>"로
     * 반환한다.
     *
     * @param clazz      검사할 클래스
     * @param methodName 메소드명
     * @param paramTypes 메소드이 파라미터 유형
     * @return 클래스에 해당 메소드가 존재하는지 여부
     */
    public static boolean hasMethod(Class clazz, String methodName, Class[] paramTypes) {
        return org.springframework.util.ClassUtils.hasMethod(clazz, methodName, paramTypes);
    }

    /**
     * 지정한 클래스에 해당 signature를 가진 메소드가 있는지 결정한다. 가능하다면 메소드를 반환하고 그렇지 않다면 <tt>null</tt>을 반환한다. 이 메소드는 특별하게
     * <tt>NoSuchMethodException</tt>에 대해서 "<tt>null</tt>"로 반환한다.
     *
     * @param clazz      검사할 클래스
     * @param methodName 메소드명
     * @param paramTypes 메소드이 파라미터 유형
     * @return 메소드가 존재하는 경우 메소드를, 존재하지 않는 경우 <tt>null</tt>
     */
    public static Method getMethodIfAvailable(Class clazz, String methodName, Class[] paramTypes) {
        return org.springframework.util.ClassUtils.getMethodIfAvailable(clazz, methodName, paramTypes);
    }

    /**
     * 주어진 클래스 또는 부모 클래스에 대해서 지정한 메소드가 최소한 1개 이상 있는지 확인한다. 이 메소드는 non-public 메소드를 포함한다.
     *
     * @param clazz      검사할 클래스명
     * @param methodName 메소드명
     * @return 한 개 이상 포함하면 <tt>true</tt>
     */
    public static boolean hasAtLeastOneMethodWithName(Class clazz, String methodName) {
        return org.springframework.util.ClassUtils.hasAtLeastOneMethodWithName(clazz, methodName);
    }

    /**
     * 클래스의 static 메소드를 반환한다.
     *
     * @param methodName static 메소드명
     * @param clazz      메소드가 정의되어 있는 클래스
     * @param args       파라미터 유형
     * @return static 메소드가 존재하는 경우 static 메소드를, 존재하지 않는 경우 <tt>null</tt>
     * @throws IllegalArgumentException 메소드명이 비워있거나 클래스가 <tt>null</tt>인 경우
     */
    public static Method getStaticMethod(Class clazz, String methodName, Class[] args) {
        return org.springframework.util.ClassUtils.getStaticMethod(clazz, methodName, args);
    }

    /**
     * 지정한 클래스/인터페이스 배열의 이름을 문자열로 구성한다.
     *
     * @param classes 클래스 배열
     * @return "[com.foo.Bar, com.foo.Baz]" 형식의 문자열
     */
    public static String classNamesToString(Class[] classes) {
        return org.springframework.util.ClassUtils.classNamesToString(classes);
    }

    /**
     * Collection 내부에 있는 클래스/인터페이스에 대한 이름을 문자열로 반환한다.
     *
     * @param collection 클래스 객체의 Collection
     * @return "[com.foo.Bar, com.foo.Baz]" 형식의 문자열
     */
    public static String classNamesToString(Collection collection) {
        return org.springframework.util.ClassUtils.classNamesToString(collection);
    }

    /**
     * 지정한 인스턴스가 구현하고 있는 모든 인터페이스를 반환한다.
     *
     * @param instance 인스턴스
     * @return 구현하고 있는 모든 인터페이스
     */
    public static Class[] getAllInterfaces(Object instance) {
        return org.springframework.util.ClassUtils.getAllInterfaces(instance);
    }

    /**
     * 지정한 클래스의 모든 인터페이스를 반환한다.
     *
     * @param clazz 클래스
     * @return 클래스가 구현하고 있는 모든 인터페이스
     */
    public static Class[] getAllInterfacesForClass(Class clazz) {
        return org.springframework.util.ClassUtils.getAllInterfacesForClass(clazz);
    }

    /**
     * 지정한 인스턴스가 구현하고 있는 모든 인터페이스를 반환한다.
     *
     * @param instance 인스턴스
     * @return 인스턴스가 구현하고 있는 모든 인터페이스의 {@link java.util.Set}
     */
    public static Set getAllInterfacesAsSet(Object instance) {
        return org.springframework.util.ClassUtils.getAllInterfacesAsSet(instance);
    }

    /**
     * 지정한 클래스가 구현하고 있는 모든 인터페이스를 반환한다.
     *
     * @param clazz 클래스
     * @return 클래스가 구현하고 있는 모든 인터페이스의 {@link java.util.Set}
     */
    public static Set getAllInterfacesForClassAsSet(Class clazz) {
        return org.springframework.util.ClassUtils.getAllInterfacesForClassAsSet(clazz);
    }

    /**
     * 기본 클래스 로더를 반환한다.
     *
     * @return 기본 클래스 로더(절대로 <tt>null</tt>이 될 수 없음)
     */
    public static ClassLoader getDefaultClassLoader() {
        return org.springframework.util.ClassUtils.getDefaultClassLoader();
    }

    /**
     * 지정한 클래스의 메소드와 파라미터에 맞는 메소드를 반환한다. 메소드를 발견할 수 없는 경우 <tt>null</tt>을 반환한다.
     *
     * @param type       클래스 유형
     * @param name       메소드명
     * @param paramTypes 메소드 파라미터 유형
     * @return 메소드
     */
    public static Method findMethod(Class type, String name, Class[] paramTypes) {
        return org.springframework.util.ReflectionUtils.findMethod(type, name, paramTypes);
    }

    /**
     * 지정한 클래스의 메소드 맞는 메소드를 반환한다. 메소드를 발견할 수 없는 경우 <tt>null</tt>을 반환한다.
     *
     * @param type 클래스 유형
     * @param name 메소드명
     * @return 메소드
     */
    public static Method findMethod(Class type, String name) {
        return org.springframework.util.ReflectionUtils.findMethod(type, name);
    }

    /**
     * 지정한 인스턴스에 대한 인자가 없는 메소드를 호출한다. 호출하려는 메소드가 static 메소드인 경우 null을 반환한다.
     *
     * @param method   메소드
     * @param instance 인스턴스
     * @return 호출 결과
     */
    public static Object invokeMethod(Method method, Object instance) {
        return org.springframework.util.ReflectionUtils.invokeMethod(method, instance);
    }

    /**
     * 메소드의 Signature를 반환한다.
     *
     * @param method 메소드
     * @return 메소드의 Signature
     */
    private static String getMethodSignature(Method method) {
        String methodName = method.getName();
        Class<?>[] classes = method.getParameterTypes();

        StringBuilder builder = new StringBuilder();
        builder.append("[ ");
        builder.append(methodName);
        builder.append("(");
        for (int i = 0; i < classes.length; i++) {
            Class<?> aClass = classes[i];
            builder.append(aClass.getName());
            if (i != (classes.length - 1)) {
                builder.append(", ");
            }
        }
        builder.append(")");
        builder.append(" ]");
        return builder.toString();
    }

    /**
     * 메소드의 Signature를 반환한다.
     *
     * @param method 메소드
     * @return 메소드의 Signature
     */
    private static String getMethodSignature(Method method, Object[] args) {
        String methodName = method.getName();
        Class<?>[] classes = method.getParameterTypes();

        StringBuilder builder = new StringBuilder();
        builder.append("[ ");
        builder.append(methodName);
        builder.append("(");
        builder.append(getMethodParameter(classes, args));
        builder.append(")");
        builder.append(" ]");
        return builder.toString();
    }

    /**
     * 메소드의 파라미터를 반환한다.
     *
     * @param classes 클래스
     * @param args    인자
     * @return 메소드의 파라미터
     */
    private static String getMethodParameter(Class<?>[] classes, Object[] args) {
        if (args == null) {
            return "";
        }
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < classes.length; i++) {
            Class<?> aClass = classes[i];
            builder.append(aClass.getName());
            builder.append("(");
            builder.append(args[i]);
            builder.append(")");
            if (i != (classes.length - 1)) {
                builder.append(", ");
            }
        }
        return builder.toString();
    }

    /**
     * 지정한 파라미터를 가진 메소드 파라미터를 문자열로 구성한다.
     *
     * @param args 파라미터 배열
     * @return 파라미터 문자열
     */
    private static String getMethodParameter(Object[] args) {
        if (args == null) {
            return "";
        }
        StringBuilder builder = new StringBuilder();
        for (int i = 0; i < args.length; i++) {
            Class<?> aClass = args[i].getClass();
            builder.append(aClass.getName());
            builder.append("(");
            builder.append(args[i]);
            builder.append(")");
            if (i != (args.length - 1)) {
                builder.append(", ");
            }
        }
        return builder.toString();
    }

    /**
     * 지정한 인스턴스에 대해서 인자를 가진 메소드를 호출한다. 호출하려는 메소드가 <tt>static</tt> 메소드인 경우 <tt>null</tt>을 반환한다.
     *
     * @param method   메소드
     * @param instance 인스턴스
     * @param args     메소드의 인자
     * @return 호출 결과
     */
    public static Object invokeMethod(Method method, Object instance, Object[] args) {
        return org.springframework.util.ReflectionUtils.invokeMethod(method, instance, args);
    }

    /**
     * 메소드를 호출한다.
     *
     * @param className      클래스명
     * @param methodName     메소드명
     * @param parameterType  파라미터 유형
     * @param parameterValue 파라미터값
     * @return 호출 결과
     * @throws com.ankus.core.exception.WorkflowException 메소드를 호출할 수 없는 경우
     */
    public static Object invokeMethod(String className, String methodName, String parameterType, Object parameterValue) throws WorkflowException {
        Class clazz = null;
        try {
            clazz = ReflectionUtils.forName(className);
            Class paramType = ReflectionUtils.forName(parameterType);
            Method invokableMethod = ReflectionUtils.findMethod(clazz, methodName, new Class[]{paramType});
            return ReflectionUtils.invokeMethod(invokableMethod, clazz.newInstance(), new Object[]{parameterValue});
        } catch (IllegalAccessException e) {
            String message = MessageFormatter.format("Cannot access '{}'", className).getMessage();
            throw new WorkflowException(message, e);
        } catch (InstantiationException e) {
            String message = MessageFormatter.format("Cannot create a instance of '{}'", className).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    /**
     * 인스턴스의 메소드를 호출한다.
     *
     * @param instance 메소드를 호출할 인스턴스
     * @param name     메소드명
     * @param arg      인자
     * @return 메소드 호출 결과
     * @throws NoSuchMethodException                       호출할 메소드가 없는 경우
     * @throws IllegalAccessException                      호출할 메소드에 접근할 수 없는 경우
     * @throws java.lang.reflect.InvocationTargetException 호출한 메소드에서 예외를 던진 경우
     */
    public static Object invokeMethod(Object instance, String name, Object arg) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return org.apache.commons.beanutils.MethodUtils.invokeMethod(instance, name, arg);
    }

    /**
     * 인스턴스의 메소드를 호출한다.
     *
     * @param instance 메소드를 호출할 인스턴스
     * @param name     메소드명
     * @param args     인자값
     * @return 메소드 호출 결과
     * @throws NoSuchMethodException                       호출할 메소드가 없는 경우
     * @throws IllegalAccessException                      호출할 메소드에 접근할 수 없는 경우
     * @throws java.lang.reflect.InvocationTargetException 호출한 메소드에서 예외를 던진 경우
     */
    public static Object invokeMethod(Object instance, String name, Object[] args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return org.apache.commons.beanutils.MethodUtils.invokeMethod(instance, name, args);
    }

    /**
     * 인스턴스의 메소드를 호출한다.
     *
     * @param instance   메소드를 호출할 인스턴스
     * @param name       메소드명
     * @param args       인자값
     * @param paramTypes 파라미터 유형
     * @return 메소드 호출 결과
     * @throws NoSuchMethodException                       호출할 메소드가 없는 경우
     * @throws IllegalAccessException                      호출할 메소드에 접근할 수 없는 경우
     * @throws java.lang.reflect.InvocationTargetException 호출한 메소드에서 예외를 던진 경우
     */
    public static Object invokeMethod(Object instance, String name, Object[] args, Class[] paramTypes) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return org.apache.commons.beanutils.MethodUtils.invokeMethod(instance, name, args, paramTypes);
    }

    /**
     * 인스턴스의 메소드를 호출한다.
     *
     * @param instance 메소드를 호출할 인스턴스
     * @param name     메소드명
     * @param arg      인자값
     * @return 메소드 호출 결과
     * @throws NoSuchMethodException                       호출할 메소드가 없는 경우
     * @throws IllegalAccessException                      호출할 메소드에 접근할 수 없는 경우
     * @throws java.lang.reflect.InvocationTargetException 호출한 메소드에서 예외를 던진 경우
     */
    public static Object invokeExactMethod(Object instance, String name, Object arg) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return org.apache.commons.beanutils.MethodUtils.invokeExactMethod(instance, name, arg);
    }

    /**
     * 인스턴스의 메소드를 호출한다.
     *
     * @param instance 메소드를 호출할 인스턴스
     * @param name     메소드명
     * @param args     인자값
     * @return 메소드 호출 결과
     * @throws NoSuchMethodException                       호출할 메소드가 없는 경우
     * @throws IllegalAccessException                      호출할 메소드에 접근할 수 없는 경우
     * @throws java.lang.reflect.InvocationTargetException 호출한 메소드에서 예외를 던진 경우
     */
    public static Object invokeExactMethod(Object instance, String name, Object[] args) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return org.apache.commons.beanutils.MethodUtils.invokeExactMethod(instance, name, args);
    }

    /**
     * 인스턴스의 메소드를 호출한다.
     *
     * @param instance   메소드를 호출할 인스턴스
     * @param name       메소드명
     * @param args       인자값
     * @param paramTypes 파라미터 유형
     * @return 메소드 호출 결과
     * @throws NoSuchMethodException                       호출할 메소드가 없는 경우
     * @throws IllegalAccessException                      호출할 메소드에 접근할 수 없는 경우
     * @throws java.lang.reflect.InvocationTargetException 호출한 메소드에서 예외를 던진 경우
     */
    public static Object invokeExactMethod(Object instance, String name, Object[] args, Class[] paramTypes) throws NoSuchMethodException, IllegalAccessException, InvocationTargetException {
        return org.apache.commons.beanutils.MethodUtils.invokeExactMethod(instance, name, args, paramTypes);
    }

    /**
     * 선언되어 있는 모든 메소드를 반환한다.
     *
     * @param clazz 클래스
     * @return 모든 메소드
     * @throws IllegalArgumentException 선언도니 메소드를 가져올 수 없는 경우
     */
    public static Method[] getAllDeclaredMethods(Class clazz) throws IllegalArgumentException {
        return org.springframework.util.ReflectionUtils.getAllDeclaredMethods(clazz);
    }

    /**
     * 지정한 클래스의 인스턴스를 생성한다.
     *
     * @param className Qualified Full Class Name
     * @return 인스턴스
     * @throws com.ankus.core.exception.WorkflowException 인스턴스를 생성할 수 없는 경우
     */
    public static Object newInstance(String className) throws WorkflowException {
        Class clazz = null;
        try {
            clazz = ReflectionUtils.forName(className);
            return clazz.newInstance();
        } catch (Exception e) {
            String message = MessageFormatter.format("Cannot create a instance of '{}'", className).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    /**
     * 해당 인스턴스의 필드에 대한 Setter를 반환한다.
     *
     * @param instance  인스턴스
     * @param fieldName 인스턴스 필드
     * @return Setter
     * @throws com.ankus.core.exception.WorkflowException Setter를 반환할 수 없는 경우
     */
    public static Method getSetterMethod(Object instance, String fieldName) throws WorkflowException {
        try {
            PropertyDescriptor propertyDescriptor = PropertyUtils.getPropertyDescriptor(instance, fieldName);
            return propertyDescriptor.getWriteMethod();
        } catch (Exception e) {
            String message = MessageFormatter.format("Cannot find setter method of '{}' in '{}'.", fieldName, instance.getClass().getName()).getMessage();
            throw new WorkflowException(message, e);
        }
    }

    /**
     * 해당 인스턴스의 필드에 대한 Getter를 반환한다.
     *
     * @param instance  인스턴스
     * @param fieldName 인스턴스 필드
     * @return Getter
     * @throws com.ankus.core.exception.WorkflowException Getter를 반환할 수 없는 경우
     */
    public static Method getGetterMethod(Object instance, String fieldName) throws WorkflowException {
        try {
            PropertyDescriptor propertyDescriptor = PropertyUtils.getPropertyDescriptor(instance, fieldName);
            return propertyDescriptor.getReadMethod();
        } catch (Exception e) {
            String message = MessageFormatter.format("Cannot find getter method of '{}' in '{}'.", fieldName, instance.getClass().getName()).getMessage();
            throw new WorkflowException(message, e);
        }
    }
}