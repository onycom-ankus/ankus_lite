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
package com.ankus.web.security;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class SessionValidationInterceptor extends HandlerInterceptorAdapter {

    /**
     * In this case intercept the request BEFORE it reaches the controller
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        try {
            if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
                HttpSession session = request.getSession(false);
                if (session == null) {
                    response.sendError(909);
                    return false;
                } else {
                    Object attribute = session.getAttribute("user");
                    if (attribute == null) {
                        response.sendError(909, "Session Expired!!");
                        response.setHeader("URI", request.getRequestURI());
                        return false;
                    }
                }
            }
            return true;
        } catch (Exception e) {
            response.sendError(908, "Server Error!!");
            response.setHeader("URI", request.getRequestURI());
            response.setHeader("MSG", e.getMessage());

            return false;
        }
    }
}