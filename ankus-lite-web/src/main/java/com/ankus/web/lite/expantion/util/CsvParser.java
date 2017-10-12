package com.ankus.web.lite.expantion.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

import au.com.bytecode.opencsv.CSVReader;

public class CsvParser {

	public static DataMap read(File file) {
		
		DataMap result = new DataMap();
		
		List<DataMap> dataList = new ArrayList<DataMap>();
		List<String> title = new ArrayList<String>();
		
		try {
			CSVReader reader = new CSVReader(new InputStreamReader(new FileInputStream(file), "euc-kr"));
			
			String[] s;
			int titleFlag = 0;
			while((s = reader.readNext()) != null) {
				DataMap data = new DataMap();
				
				for(int i=0; i<s.length; i++) {
					if(titleFlag == 0) {
						title.add(s[i]);
					} else {
						data.put(title.get(i), s[i]);
					}
				} // end for
				
				if(titleFlag > 0) {
					dataList.add(data);
				}
				
				titleFlag++;
			} // end while
					
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		result.put("dataList", dataList);
		result.put("title", title);
		
		return result;
	}
}
