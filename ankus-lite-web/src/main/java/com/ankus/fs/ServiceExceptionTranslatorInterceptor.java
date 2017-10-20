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
package com.ankus.fs;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import com.ankus.core.exception.ServiceException;

import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;

public class ServiceExceptionTranslatorInterceptor implements MethodInterceptor, Serializable {

    private static final long serialVersionUID = 1L;

    @Override
    public Object invoke(MethodInvocation invocation) throws Throwable {
        try {
            Method method = invocation.getMethod();
            return invocation.proceed();
        } catch (Throwable e) {
            throw translateException(e);
        }
    }

    static RuntimeException translateException(Throwable e) {
        ServiceException serviceException = new ServiceException();
        try {
            serviceException.setStackTrace(e.getStackTrace());
            serviceException.setMessage(e.getClass().getName() + ": " + e.getMessage());
            getField(Throwable.class, "detailMessage").set(serviceException, e.getMessage());
            Throwable cause = e.getCause();
            if (cause != null) {
                getField(Throwable.class, "cause").set(serviceException, translateException(cause));
            }
        } catch (IllegalArgumentException e1) {
            // Should never happen, ServiceException is an instance of Throwable
        } catch (IllegalAccessException e2) {
            // Should never happen, we've set the fields to accessible
        } catch (NoSuchFieldException e3) {
            // Should never happen, we know 'detailMessage' and 'cause' are valid fields
        }
        return serviceException;
    }

    static Field getField(Class<?> clazz, String fieldName) throws NoSuchFieldException {
        Field f = clazz.getDeclaredField(fieldName);
        if (!f.isAccessible()) {
            f.setAccessible(true);
        }
        return f;
    }
}
