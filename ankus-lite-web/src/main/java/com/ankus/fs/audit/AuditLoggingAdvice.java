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
package com.ankus.fs.audit;

import com.ankus.provider.fs.FileSystemAuditService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.AfterReturningAdvice;

import java.lang.reflect.Method;

public class AuditLoggingAdvice implements AfterReturningAdvice {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(AuditLoggingAdvice.class);

    /**
     * File System Audit Service.
     */
    private FileSystemAuditService auditService;

    /**
     * Callback after a given method successfully returned.
     *
     * @param returnValue the value returned by the method, if any
     * @param method      method being invoked
     * @param args        arguments to the method
     * @param target      target of the method invocation. May be {@code null}.
     * @throws Throwable if this object wishes to abort the call.
     *                   Any exception thrown will be returned to the caller if it's
     *                   allowed by the method signature. Otherwise the exception
     *                   will be wrapped as a runtime exception.
     */
    public void afterReturning(Object returnValue, Method method, Object[] args, Object target) throws Throwable {
        logger.debug("{}", method.getName());
    }

    public void setAuditService(FileSystemAuditService auditService) {
        this.auditService = auditService;
    }
}