package com.ankus.web.lite.expantion.util;

import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

public class ExcelUtil {
	
	public static void excelExport(HttpServletRequest request, HttpServletResponse response, DataMap data) {
		List<String> title = (List<String>) data.get("title");
		List<DataMap> dataList = (List<DataMap>) data.get("dataList");
		String data_nm = data.getString("data_nm");
		
		try {
			data_nm = URLEncoder.encode(data_nm, "UTF-8");
			data_nm = data_nm.replaceAll("\\+", "%20");
			
		} catch (UnsupportedEncodingException e1) {e1.printStackTrace();}
		
		response.setHeader("Content-Type", "application/octet-stream");
		response.setHeader("Content-Disposition", "attachment; filename="+ data_nm +".xlsx");
		
		// 워크북 생성
		XSSFWorkbook workbook = new XSSFWorkbook();
		XSSFSheet sheet = workbook.createSheet(data_nm);
		
		//0번째 줄에 셀 제목 삽입
		XSSFRow titleRow = sheet.createRow(0);
		
		for(int i=0; i<title.size(); i++) {
			XSSFCell cell = titleRow.createCell(i);
			cell.setCellValue((String)title.get(i));
		}
		
		//1번째 줄부터 데이터 삽입
		for(int i=0; i<dataList.size(); i++) {
			XSSFRow dataRow = sheet.createRow(i+1);
			
			for(int j=0; j<title.size(); j++) {
				XSSFCell cell = dataRow.createCell(j);
				
				String key = title.get(j);
				String sValue = dataList.get(i).getString(key);
				
				try {
					Double dValue = Double.parseDouble(sValue);
					cell.setCellValue(dValue);
					
				} catch (NumberFormatException e) {
					cell.setCellValue(sValue);
				}
			}
		}
		
		/* 엑셀 파일 output */
		OutputStream os = null;
		
		try {
			os = response.getOutputStream();
			workbook.write(os);
			
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(os != null) try {os.flush(); os.close();} catch (Exception e2) {e2.printStackTrace();}
		}
	}
}