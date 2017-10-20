package com.ankus.web.common.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.ankus.web.lite.expantion.util.DataMap;

public class CookieUtil {

	public static DataMap get(HttpServletRequest request) {
		DataMap result = new DataMap();
		
		String username = "";
		String auth = "";
		String language = "";
		
		try {
			
			Cookie[] cookie = request.getCookies();
			
			for(Cookie c : cookie) {
				if("authenticate".equals(c.getName())) {
					username = c.getValue().substring(0, c.getValue().indexOf("/"));
					auth = c.getValue().substring(c.getValue().indexOf("/")+1, c.getValue().length());
					
					break;
				}
			}
			
			for(Cookie c : cookie) {
				if("language".equals(c.getName())) { 
					language = c.getValue();
					break;
				}
			}
			
		} catch (NullPointerException e) {}
		
		result.put("username", username);
		result.put("auth", auth);
		result.put("language", language);
		
		return result;
	}
	
	public static void add(String key, String value, HttpServletResponse response) {
		Cookie cookie = new Cookie(key, value);
		cookie.setMaxAge(60*60*365);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
	
	public static void remove(String key, HttpServletResponse response) {
		Cookie cookie = new Cookie(key, null);
		cookie.setMaxAge(0);
		cookie.setPath("/");
		response.addCookie(cookie);
	}
}
