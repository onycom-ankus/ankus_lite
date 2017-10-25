package com.ankus.web.lite.expantion.util;

import java.util.ArrayList;
import java.util.List;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

public class XmlToMapParser {
	
	private static Logger logger = LoggerFactory.getLogger(XmlToMapParser.class);

	/**
	 * &ltitems&gt<br>
	 * 		&ltitem1&gt&lt&#47item&gt<br>
	 * 		&ltitem2&gt&lt&#47item&gt<br>
	 * 		....<br>
	 * &lt&#47items&gt 형식의 xml parser
	 * @param addr
	 * @param parentTag
	 * @return
	 */
	public static DataMap parse(String addr, String parentTag) {
		logger.info("================== parse start =====================");
		
		DataMap result = new DataMap();
		List<DataMap> mapList = new ArrayList<>();
		
		try {
			DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = factory.newDocumentBuilder();
			Document document = builder.parse(addr);
			
			Element rootElement = document.getDocumentElement();
			NodeList nodelist = rootElement.getElementsByTagName(parentTag);
			
			Node current = null;
			
			for(int i=0; i<nodelist.getLength(); i++) {
				current = nodelist.item(i);
				
				NodeList childNodes = current.getChildNodes();
				
				DataMap map = new DataMap();
				
				for(int j=0; j<childNodes.getLength(); j++) {
					Node info = childNodes.item(j);
					
					if(info.getNodeType() == Node.ELEMENT_NODE) {
						Element element = (Element) info;
						
						logger.info("tagName : " + element.getTagName());
						logger.info("content : " + element.getTextContent());
						
						map.put(element.getTagName(), element.getTextContent());
					}
				}
				mapList.add(map);
			}
			result.put("status", true);
			
		} catch (Exception e) {
//			e.printStackTrace();
			result.put("status", false);
		}
		
		logger.info("================== parse end =====================");
		
		result.put("resultList", mapList);
		
		return result;
	}
}
