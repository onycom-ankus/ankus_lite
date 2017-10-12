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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * @see http://doanduyhai.wordpress.com/2012/04/21/spring-security-part-vi-session-timeout-handling-for-ajax-calls/
 * @see http://stackoverflow.com/questions/4964145/detect-session-timeout-in-ajax-request-in-spring-mvc
 * @see http://stackoverflow.com/questions/1268220/intercepting-requests-before-they-go-to-the-controller-in-an-annotation-based-sp
 */
public class ExpiredSessionFilter extends GenericFilterBean {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(ExpiredSessionFilter.class);

    private int customSessionExpiredErrorCode = 901;

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        logger.info("Request URI : {}", request.getRequestURI());

        HttpSession currentSession = request.getSession(false);
        if (currentSession == null) {
            if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With"))) {
                logger.info("Ajax call detected, send {} error code", this.customSessionExpiredErrorCode);
                response.sendError(this.customSessionExpiredErrorCode);
            } else {
                chain.doFilter(request, response);
            }
        }
        chain.doFilter(request, response);
    }


}