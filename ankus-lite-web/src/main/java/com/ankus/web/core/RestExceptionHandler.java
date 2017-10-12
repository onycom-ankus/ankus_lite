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

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class RestExceptionHandler {

    @ExceptionHandler(org.codehaus.jackson.map.JsonMappingException.class)
    @ResponseBody
    public Map<String, Object> handleJsonMappingException(org.codehaus.jackson.map.JsonMappingException e, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        Map<String, Object> error = new HashMap<String, Object>();
        error.put("message", "Server Error!");
        error.put("cause", e.getMessage());
        if (e.getCause() != null) error.put("root", e.getCause().getMessage());
        error.put("success", false);
        return error;
    }

    @ExceptionHandler(org.springframework.http.converter.HttpMessageNotReadableException.class)
    @ResponseBody
    public Map<String, Object> handleHttpMessageNotReadableException(org.springframework.http.converter.HttpMessageNotReadableException e, HttpServletResponse response) {
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        Map<String, Object> error = new HashMap<String, Object>();
        error.put("message", "Server Error!");
        error.put("cause", e.getMessage());
        if (e.getCause() != null) error.put("root", e.getCause().getMessage());
        error.put("success", false);
        return error;
    }

}
