package com.ankus.web.lite.expantion.util;

import java.util.Enumeration;

import javax.servlet.ServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AllReqVal {
	
	private static Logger logger = LoggerFactory.getLogger(AllReqVal.class);

	// Request 값 모두 찍어보기
		public static void getRequestValues(ServletRequest request) {
			Enumeration<String> req = request.getParameterNames();
			String reqName = "";
			String reqVal = "";
			
			logger.info("================================ request data start ================================");
			while(req.hasMoreElements()) {
				reqName = req.nextElement();
				reqVal = request.getParameter(reqName);
				
				if(reqVal == null) {
					reqVal = "null";
				} else if("".equals(reqVal)) {
					reqVal = "공백";
				} else {
					logger.info(reqName + " : " + reqVal);
				}
			}
			logger.info("================================ request data end ================================");
		}
		
		public static DataMap requestToDataMap(ServletRequest param) {
			Enumeration<String> req = param.getParameterNames();
			String reqName = "";
			String reqVal = "";
			
			DataMap map = new DataMap();
			
			while(req.hasMoreElements()) {
				reqName = req.nextElement();
				reqVal = param.getParameter(reqName);
				
				// 공백값은 null 처리
				if("".equals(reqVal)) {
					reqVal = null;
				}
				
				map.put(reqName, reqVal);
			}
/*			
			// map data print
			Set<String> keySet = map.keySet();
			Iterator<String> iter = keySet.iterator();
			
			System.out.println("Request to DataMap data start---------------------------");
			while(iter.hasNext()) {
				String key = iter.next();
				Object value = map.get(key);
				
				System.out.println(key + " : " + value);
			}
			System.out.println("Request to DataMap data end---------------------------");
*/		
			return map;
		}
}
