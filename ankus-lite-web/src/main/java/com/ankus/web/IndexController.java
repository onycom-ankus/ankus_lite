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
package com.ankus.web;

import static java.lang.Math.abs;
import static java.lang.Math.min;
import static java.lang.Math.pow;
import static java.lang.Math.random;
import static java.lang.Math.round;
import static org.apache.commons.lang.StringUtils.leftPad;

import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.ankus.language.LanguageUtil;
import com.ankus.model.rest.Response;
import com.ankus.util.ExceptionUtils;
import com.ankus.web.core.ConfigurationHelper;
import com.ankus.web.member.Member;
import com.ankus.web.member.MemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.ankus.web.common.util.CookieUtil;

/**
 * 인덱스 페이지 및 기본적인 페이지 이동 기능을 제공하는 컨트롤러.
 */
@Controller
@RequestMapping("/")
public class IndexController {

    /**
     * SLF4J Logging
     */
    private Logger logger = LoggerFactory.getLogger(IndexController.class);

    /**
     * Memberd Service
     */
    @Autowired
    private MemberService memberService;
    
    @Autowired
    private MessageSource pMSG;
    
    @Autowired
	SessionLocaleResolver sessionLocaleResolver;
    
    /**
     * 인덱스 페이지로 이동한다.
     *
     * @return Model And View
     */
    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView index(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("/index");
        mav.addObject("locale", ConfigurationHelper.getHelper().get("application.locale", "English"));
        mav.addObject("mode", ConfigurationHelper.getHelper().get("application.mode", "development"));

        mav.addObject("version", ConfigurationHelper.getHelper().get("version"));
        mav.addObject("timestamp", ConfigurationHelper.getHelper().get("build.timestamp"));
        mav.addObject("buildNumber", ConfigurationHelper.getHelper().get("build.number"));
        mav.addObject("revision", ConfigurationHelper.getHelper().get("revision.number"));
        mav.addObject("buildKey", ConfigurationHelper.getHelper().get("build.key"));
        
        return mav;
    }
  
    /**
     * 사용자 계정에 비밀번호가 맞는지를 판단한다.
     * @param uesr_id
     * @param passwd
     * @return code 0:성공,-100:파라미터없음,-101:비밀번호틀림
     */
    @RequestMapping(value = "edit_authenticate", method = RequestMethod.GET)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response edit_authenticate(@RequestParam(value = "id") String uesr_id,
    		@RequestParam(value = "passwd") String passwd, Locale locale){
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try{
            if((uesr_id.length() == 0) || (passwd.length() == 0)){
            	resCode = -100;
            	resMessage = pMSG.getMessage("JAVA_LOGIN_USERNAME_AND_PASSWORD_CHECK", null, locale);
            }else{
            	int rc = memberService.existMember(uesr_id, passwd);
            	if(rc > 0){
            		response.setSuccess(true);
            		resMessage = pMSG.getMessage("JAVA_LOGIN_SUCCESS", null, locale);
            		resCode = 0;
            	}else{
            		resCode = -101;
            		resMessage = pMSG.getMessage("JAVA_LOGIN_NOT_CORRECTED_PW", null, locale);
            	}
            }
        }
        catch (Exception ex){ 
        }
        map.put("code", resCode);
		map.put("message", resMessage);
        response.setMap(map);
        return response;
    }
    
    /**
     * 로그인  처리를 한 후 메인 페이지로 이동한다.
     * @param request 
     * @param param uname:아이디, pwd:비밀번호
     * @return code 0:성공, -100:아이디,비번입력값 없음, -101:등록된 사용자 아님, -102:권한 없는사용자, -103:비밀번호틀림
     *               -104:DB연결 오류, -105:인증과정문제
     */
   @RequestMapping(value = "authenticate", method = RequestMethod.POST)
   @ResponseStatus(HttpStatus.OK)
   @ResponseBody
   public Response authenticate(HttpServletRequest req, HttpServletResponse res,
		   @RequestBody Map<String, String> param, Locale locale){
		Response response = new Response();
		HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
		boolean isdbconnect = false;
		try {
			String uname = param.get("username".toString());
			String pwd = param.get("password").toString();
			if ((uname.length() == 0) | (pwd.length() == 0)) {
				resCode = -100;
				resMessage = pMSG.getMessage("JAVA_LOGIN_USERNAME_AND_PASSWORD_CHECK", null, locale);
			} else {
				Member member = memberService.getMemberByUser(param.get("username"));
				isdbconnect = true;

				if (member == null) { // 회원정보 없음
					resCode = -101;
					resMessage = pMSG.getMessage("JAVA_LOGIN_NOT_REGIST_USER", null, locale);
				} else {
					if (member.getPassword().equals(param.get("password"))) {
						if (member.isEnabled() == true) { // 권한있음&로그인 성공
							response.setSuccess(true);
							resCode = 0;
							resMessage = pMSG.getMessage("JAVA_LOGIN_LOGIN_SUCCESS", null, locale);

							memberService.updateByLastLogin(uname); // 마지막 로그인 시간 업데이트
							HttpSession session = req.getSession(true);
							
							Cookie c = new Cookie("authenticate", member.getUsername()+"/"+member.getAuthority());
							/*
							CookieGenerator c = new CookieGenerator();

							c.setCookieMaxAge(60*60*24*30);
							c.setCookieName("authenticate");
							c.addCookie(res, member.getUsername()+"/"+member.getAuthority());
							*/
							res.addCookie(c);

							session.setAttribute("user", member);
							
							// 2015.01.30 whitepoo@onycom.com
							// session.setAttribute("authority",
							// member.getAuthority());
							// session.setAttribute("username",
							// member.getUsername());
							// session.setAttribute("login", new Date());
							logger.info(pMSG.getMessage("JAVA_LOGIN_LOGIN_SUCCESS", new String[]{member.getUsername()},locale));
						} else { // 권한 없음
							resCode = -102;
							resMessage = pMSG.getMessage("JAVA_LOGIN_NO_PERMISSION_USER", null, locale);
						}
					} else {
						resCode = -103;
						resMessage = pMSG.getMessage("JAVA_LOGIN_NOT_CORRECTED_PW", null, locale);
					}
				}
				
				/* 로그인 성공시 쿠키에 언어정보 저장 */
				CookieUtil.add("language", member.getLanguage(), res);
			}
		} catch (Exception ex) {
			if (isdbconnect == false) {
				resCode = -104;
				resMessage = pMSG.getMessage("JAVA_LOGIN_AUTH_DB_ERROR", null, locale);
				logger.info(ex.toString());
			} else {
				resCode = -105;
				resMessage = pMSG.getMessage("JAVA_LOGIN_AUTH_USER_ERROR", null, locale);
				logger.info(ex.toString());
			}
		} 
		
		map.put("code", resCode);
		map.put("message", resMessage);
		response.setMap(map);
		return response;
   }
   
    /**
     * 로그아웃 처리를 한 후 메인 페이지로 이동한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "logout", method = RequestMethod.GET)
    public ModelAndView logout(HttpServletRequest req, HttpServletResponse res) {
        HttpSession session = req.getSession();
        session.invalidate();
        session = null;

        Cookie[] cs = req.getCookies();
		System.out.printf("logout=========>%d\n", cs.length);
        
        for(Cookie c: cs)
        {
        	if(c.getName().equals("authenticate"))
        	{
        		System.out.printf("logout=========>%s\n", c.getValue());
        		c.setMaxAge(0);
        		res.addCookie(c);
        	}
        }
        
        /* 로그인 성공시 쿠키에 언어정보 저장 */
		HashMap<String, Object> cookieMap = CookieUtil.get(req);
		Locale locale = LanguageUtil.getLocale(((String) cookieMap.get("language")));
		/* 세션에 저장 */
		sessionLocaleResolver.setLocale(req, res, locale);

        return new ModelAndView("/index");
    }

    /**
     * 메인 페이지로 이동한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "login", method = RequestMethod.GET)
    public ModelAndView login(HttpServletRequest request) {

        HttpSession session = request.getSession(false);
        if (session == null) {
            return new ModelAndView("/index");
        }

        if (session.getAttribute("user") == null) {
            return new ModelAndView("/index");
        }

        ModelAndView mav = new ModelAndView("/main/main");
        Member member = memberService.getMemberByUser(((Member)session.getAttribute("user")).getUsername());
        mav.addObject("user", member);
        return mav;
    }

    /**
     * Username 과 Password 로 Email 을 조회한다.
     *
     * @param param
     * @return code 0:성공,-100:이메일사용자없음,-101:비밀번호틀림
     */
    @RequestMapping(value = "/finduser", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response findemail(@RequestBody Map<String, String> param, Locale locale) {
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try {
            String email = param.get("email");
            String password = param.get("password");

            Member member = memberService.getMemberByEmail(email);
            if (member == null) {
            	resCode = -100;
            	resMessage = pMSG.getMessage("JAVA_LOGIN_NO_EMAIL", null, locale);
            }else{
            	if (member.getPassword().equals(password)) {
            		response.setSuccess(true);
            		response.setObject(member.getUsername());
            		resCode = 0;
            		resMessage = pMSG.getMessage("JAVA_LOGIN_SUCCESS", null, locale);
            	}else{
            		resCode = -101;
                	resMessage = pMSG.getMessage("JAVA_LOGIN_EMAIL_PW_CHECK", null, locale);
            	}
            }
        } catch (Exception ex) {
            response.setSuccess(false);
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        map.put("code", resCode);
        map.put("message", resMessage);
        response.setMap(map);
        return response;
    }

    /*
     username과 email을 받아 일치하는 것이 username이 있으면 password를 random code로 변경하고
     해당 code를 사용자에게 보여준다.
     2015.02.02
     whitepoo@onycom.com
     */
    /**
     * 비밀번호 찾기 임시비밀번호를 발송한다.
     * @param param
     * @return 
     */
    @RequestMapping(value = "/findpass", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response findpass(@RequestBody Map<String, String> param, Locale locale) {
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try {
            String username = param.get("username");
            String email = param.get("email");
            
            Member member = memberService.getMemberByPassword(username, email);
            
            if(member == null){//username or email이 틀릴때.
            	resCode = -100;
            	resMessage = pMSG.getMessage("JAVA_LOGIN_SIGN_UP_CHECK_EMAIL", null, locale);
            } else {
    			String newPasswd =gen(5);
    			memberService.updateByPassword(username, newPasswd);
    	        response.setSuccess(true);
                response.setObject(newPasswd);
                resCode = 0;
                resMessage = pMSG.getMessage("JAVA_LOGIN_SUCCESS", null, locale);
            }
        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        map.put("code", resCode);
        map.put("message", resMessage);
        response.setMap(map);
        return response;
    }
    public  String gen(int length) {
        StringBuffer sb = new StringBuffer();
        for (int i = length; i > 0; i -= 12) {
          int n = min(12, abs(i));
          sb.append(leftPad(Long.toString(round(random() * pow(36, n)), 36), n, '0'));
        }
        return sb.toString();
      }
    
    /**
     * 신규 Member 를 등록한다.
     *
     * @param param
     * @return code 0:성공, -100:아이디존재, -101:이메일존재
     */
    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response signup(@RequestBody Map<String, String> param, Locale locale) {
        Response response = new Response();
        HashMap<String, Object> map = new HashMap<>();
		int resCode = -1; // 리턴 결과 코드값
		String resMessage = ""; // 리턴 결과 메시지
        try {
            String username = param.get("username");
            int existUsername = memberService.existUsername(username);

            if (existUsername > 0) {
            	resCode = -100;
            	resMessage = pMSG.getMessage("JAVA_LOGIN_EXIST_ID", new String[]{username}, locale);
            }else{
            	String email = param.get("email");
            	if (email != null && !email.isEmpty()) {
            		int count = memberService.getEmailCount(email);
            		if (count > 0) {
            			resCode = -101;
                    	resMessage = pMSG.getMessage("JAVA_LOGIN_EXIST_EMAIL", null, locale);
            		}else{
            			resCode = 0;
            			resMessage = pMSG.getMessage("JAVA_LOGIN_SUCCESS", null, locale);
            			
            			Member member = new Member();
            			member.setUsername(username);
            			member.setPassword(param.get("password"));
            			member.setName(param.get("username"));
            			member.setEmail(param.get("email"));
            			member.setAuthority("ROLE_USER");
            			member.setLanguage(param.get("language"));
            			
            			memberService.registerMember(member);
            			response.setSuccess(true);
            		}
            	}
            	
            }


        } catch (Exception ex) {
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }
        map.put("code", resCode);
        map.put("message", resMessage);
        response.setMap(map);
        return response;
    }

    /**
     * 전체 Member 목록을 가져온다.
     *
     * @param param
     * @return
     */
    @RequestMapping(value = "/getMembers", method = RequestMethod.POST)
    @ResponseStatus(HttpStatus.OK)
    @ResponseBody
    public Response getMembers(@RequestBody Map<String, String> param) {
        Response response = new Response();

        try {
            List<Member> members = memberService.getMembers(param);
            response.setSuccess(true);

        } catch (Exception ex) {
            ex.printStackTrace();
            response.getError().setMessage(ex.getMessage());
            if (ex.getCause() != null) response.getError().setCause(ex.getCause().getMessage());
            response.getError().setException(ExceptionUtils.getFullStackTrace(ex));
        }

        return response;
    }

    /**
     * 지정한 페이지로 리다이렉트한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "redirect", method = RequestMethod.GET)
    public ModelAndView redirect(@RequestParam String redirect) {
        return new ModelAndView("redirect:" + redirect);
    }

    /**
     * 지정한 페이지로 포워딩한다.
     *
     * @return Model And View
     */
    @RequestMapping(value = "forward", method = RequestMethod.GET)
    public ModelAndView forward(@RequestParam String redirect) {
        return new ModelAndView("forward:" + redirect);
    }
    
    /**
     * Member에 언어 설정
     * @param param
     * @return
     */
    @RequestMapping(value = "/updateLanguage", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateLanguage(@RequestBody Map<String, String> param) {
    	Map<String, Object> res = new HashMap<String, Object>();

        try {
        	int result = memberService.updateByLanguage(param.get("username"), param.get("language"));
        	res.put("success", true);
        	res.put("data", param.get("language"));
        } catch (Exception ex) {
            ex.printStackTrace();
            res.put("success", false);
        }

        return res;
    }

    /**
     * templates start
     */    
    
    @RequestMapping(value = "main", method = RequestMethod.GET)
    public ModelAndView analyzer(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("/main/main");
        
        return mav;
    }
    
    @RequestMapping(value = "dashboard", method = RequestMethod.GET)
    public ModelAndView dashboard(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("/main/dashboard");
        return mav;
    }
    
    @RequestMapping(value = "scheduler")
    public ModelAndView scheduler(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("/main/scheduler");
        return mav;
    }

    @RequestMapping(value = "sso")
    public ModelAndView sso(HttpServletRequest request) {
        ModelAndView mav = new ModelAndView("/main/sso");
        return mav;
    }
}
