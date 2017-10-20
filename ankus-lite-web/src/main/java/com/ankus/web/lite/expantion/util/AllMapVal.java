package com.ankus.web.lite.expantion.util;

import java.util.Iterator;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class AllMapVal {

	private static Logger logger = LoggerFactory.getLogger(AllMapVal.class);
	
	public static void getMapValue(DataMap data) {
		
		Set<String> keySet = data.keySet();
		Iterator<String> iter = keySet.iterator();
		
		logger.info("================================ Map data start ================================");
		while(iter.hasNext()) {
			String key = iter.next();
			Object value = data.get(key);
			
			System.out.println(key + " : [" + value + "]");
		}
		logger.info("================================ Map data end ================================");
	}
}
