package com.ankus.web.lite.expantion.util;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;

public class GetUserInfo {

	public static DataMap inCookie(HttpServletRequest request) {
		
		String username = "";
		String auth = "";
		
		Cookie[] cookie = request.getCookies();
		for(Cookie c : cookie) {
			if("authenticate".equals(c.getName())) {
				username = c.getValue().substring(0, c.getValue().indexOf("/"));
				auth = c.getValue().substring(c.getValue().indexOf("/")+1, c.getValue().length());
				
				break;
			}
		}
		
		DataMap param = new DataMap();
		param.put("username", username);
		param.put("auth", auth);
		
		return param;
	}
	
}
