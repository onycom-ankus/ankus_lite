package com.ankus.language;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.ankus.web.common.util.CookieUtil;
import com.ankus.web.lite.expantion.util.DataMap;

@Controller
public class LanguageUtil extends HandlerInterceptorAdapter {

	@Autowired
    private LanguageDao dao;
	
	@Autowired
	SessionLocaleResolver sessionLocaleResolver;
	
	@Autowired
	AcceptHeaderLocaleResolver browserLocaleResolver;
	
	/**
	 * '/' 또는 '/main' 실행시 인터셉트
	*/
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		DataMap cookieMap = CookieUtil.get(request);

		String language = (String) cookieMap.get("language");
		Locale locale = null;
				
		/* 쿠키정보가 없는 경우 브라우저 언어설정 적용 */	
		if("".equals(language)) {
			CookieUtil.remove("language", response);
			
			Locale browserLocale = browserLocaleResolver.resolveLocale(request);
			language = browserLocale.getLanguage();
			
			CookieUtil.add("language", language, response);
			
		} else {
			language = (String) cookieMap.get("language");
		}
		
		locale = getLocale(language);
		/* 세션에 저장 */
		sessionLocaleResolver.setLocale(request, response, locale);
		
		return true;
	}
	
	public static Locale getLocale(String language) {
		Locale locale = null;
		
		switch (language) {
		case "ko":
			locale = Locale.KOREA;
			break;
		case "ja":
			locale = Locale.JAPAN;
			break;
		default:
			locale = Locale.ENGLISH;
			break;
		}
		
		return locale;
	}
	
	@RequestMapping(value = "/lang/getLanguage")
	@ResponseBody
	public String getLanguage(HttpServletRequest request, HttpSession session, 
			HttpServletResponse response) {
		
		DataMap cookieMap = CookieUtil.get(request);
		String language = (String) cookieMap.get("language");
		
		return language;
	}
	
	@RequestMapping(value = "/lang/changeLanguage")
	public String changeLanguage(HttpServletRequest request, HttpServletResponse response) {
		
		String language = request.getParameter("lang");
		
		CookieUtil.add("language", language, response);
		Locale locale = getLocale(language);
		/* 세션에 저장 */
		sessionLocaleResolver.setLocale(request, response, locale);
		
		/* 유저정보 테이블에 저장 */
		DataMap cookieMap = CookieUtil.get(request);
		DataMap param = new DataMap();
		param.put("username", (String) cookieMap.get("username"));
		param.put("language", language);
		
		dao.update("language.setUserLanguage", param);
		
		return "redirect:/main";
	}
}