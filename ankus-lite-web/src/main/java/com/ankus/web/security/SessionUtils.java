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


public class SessionUtils {
	
	public static String sign_user_name="";	
	public static   void setUsername(String username)
	{
		sign_user_name = username;
	}
	
	public static  String getUsername()
	{
		if(sign_user_name.length() == 0)
		{
			return "admin";
		}
		else
		{
			return sign_user_name;
		}
	}
    public  String getSecurityRole() {
        return "ROLE_ADMIN";
    }
	
  
    /*
     2014년 VERSION
     */
	/*
	public static String getUsername() {
	    return "admin";
	}
	
	public static String getSecurityRole() {
	    return "ROLE_ADMIN";
	}
	*/
}
