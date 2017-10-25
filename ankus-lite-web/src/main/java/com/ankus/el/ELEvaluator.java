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

import org.apache.commons.el.ExpressionEvaluatorImpl;
import com.ankus.util.ExceptionUtils;

import javax.servlet.jsp.el.ExpressionEvaluator;
import javax.servlet.jsp.el.FunctionMapper;
import javax.servlet.jsp.el.VariableResolver;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.HashMap;
import java.util.Map;

/**
 * JSP EL Evaluator를 손쉽게 사용할 수 있도록 기능을 제공하는 JSP Expression Language Evaluator.
 */
public class ELEvaluator {

    /**
     * Provides functions and variables for the EL evaluator.  All functions and variables in the context of an EL
     * evaluator are accessible from EL expressions.
     */
    public static class Context implements VariableResolver, FunctionMapper {
        private Map<String, Object> vars;
        private Map<String, Method> functions;

        /**
         * 기본 생성자.
         */
        public Context() {
            vars = new HashMap<String, Object>();
            functions = new HashMap<String, Method>();
        }

        /**
         * 변수를 컨텍스트에 추가한다.
         *
         * @param vars 컨텍스트에 추가할 변수
         */
        public void setVariables(Map<String, Object> vars) {
            this.vars.putAll(vars);
        }

        /**
         * 변수를 컨텍스트에 추가한다.
         *
         * @param name  변수명
         * @param value 변수의 값
         */
        public void setVariable(String name, Object value) {
            vars.put(name, value);
        }

        /**
         * 컨텍스트에서 변수를 반환한다.
         *
         * @param name 변수명
         * @return 변수의 값
         */
        public Object getVariable(String name) {
            return vars.get(name);
        }

        /**
         * Context에 함수를 추가한다.
         *
         * @param prefix       함수의 Prefix
         * @param functionName 함수명
         * @param method       method that will be invoked for the function, it must be a static and public method.
         */
        public void addFunction(String prefix, String functionName, Method method) {
            if ((method.getModifiers() & (Modifier.PUBLIC | Modifier.STATIC)) != (Modifier.PUBLIC | Modifier.STATIC)) {
                throw new IllegalArgumentException(ExceptionUtils.getMessage("Method '{}' must be public or static", method));
            }
            prefix = (prefix.length() > 0) ? prefix + ":" : "";
            functions.put(prefix + functionName, method);
        }

        /**
         * EL Evaluator를 이용하여 변수명을 해석한다.
         *
         * @param name 변수명
         * @return 변수의 값
         */
        public Object resolveVariable(String name) {
            if (!vars.containsKey(name)) {
                throw new ELEvaluationException(ExceptionUtils.getMessage("Cannot resolve a variable '{}'.", name));
            }
            return vars.get(name);
        }

        /**
         * EL Evaluator 구현체에서 사용하는 prefix:name 형식의 함수를 해석한다.
         *
         * @param prefix 함수의 Prefix
         * @param name   함수명
         * @return 함수의 Method
         */
        public Method resolveFunction(String prefix, String name) {
            if (prefix.length() > 0) {
                name = prefix + ":" + name;
            }
            return functions.get(name);
        }
    }

    /**
     * Evaluator를
     */
    private static ThreadLocal<ELEvaluator> current = new ThreadLocal<ELEvaluator>();

    /**
     * If within the scope of a EL evaluation call, it gives access to the ELEvaluator instance performing the EL
     * evaluation.  This is useful for EL function methods to get access to the variables of the Evaluator. Because
     * of this, ELEvaluator variables can be used to pass context to EL function methods (which must be static methods).
     *
     * @return the ELEvaluator in scope, or <code>null</code> if none.
     */
    public static ELEvaluator getCurrent() {
        return current.get();
    }

    /**
     * EL 함수와 변수를 정의하고 있는 컨텍스트
     */
    private Context context;

    /**
     * JSP Expression Language Evaluator
     */
    private ExpressionEvaluator evaluator = new ExpressionEvaluatorImpl();

    /**
     * 함수와 변수가 정의되지 않는 EL Evaluator의 기본 생성자.
     */
    public ELEvaluator() {
        this(new Context());
    }

    /**
     * Creates an ELEvaluator with the functions and variables defined in the given {@link com.ankus.el.ELEvaluator.Context}.
     *
     * @param context the ELSupport with functions and variables to be available for EL evalution.
     */
    public ELEvaluator(Context context) {
        this.context = context;
    }

    /**
     * EL Evaluator의 변수와 함수를 포함하는 Context를 반환한다.
     *
     * @return 컨텍스트
     */
    public Context getContext() {
        return context;
    }

    /**
     * EL Evaluator의 컨텍스트에 지정한 name과 value를 설정한다.
     *
     * @param name  변수명
     * @param value 변수의 값
     */
    public void setVariable(String name, Object value) {
        context.setVariable(name, value);
    }

    /**
     * Convenience method that returns a variable from the EL evaluator context.
     *
     * @param name 변수명
     * @return 변수의 값, 정의되어 있지 않다면 <code>null</code>
     */
    public Object getVariable(String name) {
        return context.getVariable(name);
    }

    /**
     * EL Expression을 evaluate한다.
     *
     * @param expr  evaluate할 EL Expression
     * @param clazz EL Expression의 반환 유형
     * @return EL Expression을 evaluate한 결과 객체
     * @throws Exception EL 함수를 실행하던 도중 예외가 발생하거나, EL Expression을 해석할 수 없는 경우
     */
    @SuppressWarnings({"unchecked", "deprecation"})
    public <T> T evaluate(String expr, Class<T> clazz) throws Exception {
        ELEvaluator existing = current.get();
        try {
            current.set(this);
            return (T) evaluator.evaluate(expr, clazz, context, context);
        } catch (ELEvaluationException ex) {
            if (ex.getRootCause() instanceof Exception) {
                throw (Exception) ex.getRootCause();
            } else {
                throw ex;
            }
        } finally {
            current.set(existing);
        }
    }

    /**
     * EL Expression을 evaluate한다. 다만 Runtime Exception을 던지므로 명시적으로 에러 처리가 필요한 경우 try catch가 필요하다.
     *
     * @param expr  evaluate할 EL Expression
     * @param clazz EL Expression의 반환 유형
     * @return EL Expression을 evaluate한 결과 객체
     * @throws ELEvaluationException EL 함수를 실행하던 도중 예외가 발생하거나, EL Expression을 해석할 수 없는 경우
     */
    public <T> T evaluateIgnore(String expr, Class<T> clazz) {
        try {
            return evaluate(expr, clazz);
        } catch (Exception ex) {
            throw new ELEvaluationException(ExceptionUtils.getMessage("Cannot evaluated EL '{}' => {}", expr, ex.getMessage()), ex);
        }
    }
}