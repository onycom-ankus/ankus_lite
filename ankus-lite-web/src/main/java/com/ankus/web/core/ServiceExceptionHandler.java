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
package com.ankus.web.core;

import org.apache.ibatis.exceptions.TooManyResultsException;
import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.context.request.WebRequest;

@ControllerAdvice
public class ServiceExceptionHandler implements InitializingBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ServiceExceptionHandler.class);

    @Override
    public void afterPropertiesSet() throws Exception {
    }

    @ExceptionHandler(value = IllegalArgumentException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Response handleIllegalArgument(IllegalArgumentException e, WebRequest request) {
        Response response = new Response();
        response.setSuccess(false);
        response.getError().setCause(e.getMessage());
        response.getError().setMessage("Illegal Argument");
        response.getError().setException(ExceptionUtils.getFullStackTrace(e));
        return response;
    }

    @ExceptionHandler(value = TooManyResultsException.class)
    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Response handleTooManyResultsException(TooManyResultsException e, WebRequest request) {
        Response response = new Response();
        response.setSuccess(false);
        response.getError().setCause(e.getMessage());
        response.getError().setMessage("Too Many Results");
        response.getError().setException(ExceptionUtils.getFullStackTrace(e));
        return response;
    }

}