package com.ankus.web.lite.expantion.InnerData;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.ankus.web.core.ConfigurationHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.ankus.web.lite.expantion.util.CommonDao;
import com.ankus.web.lite.expantion.util.CsvParser;
import com.ankus.web.lite.expantion.util.DataMap;
import com.ankus.web.lite.expantion.util.GetUserInfo;

@Service
public class InnerDataServiceImpl implements InnerDataService {
	
	@Autowired
	private CommonDao dao;

/*	private DataMap getDataList(File file) {
		List<DataMap> dataList = new ArrayList<DataMap>();
		List<String> title = new ArrayList<String>();
		
		BufferedReader br = null;
		
		try {
			br = new BufferedReader(new InputStreamReader(new FileInputStream(file), "euc-kr"));
			String line = "";
			
			List<String> lines = new ArrayList<String>();
			
			while((line = br.readLine()) != null) {
				lines.add(line);
			}
			
			for(int i=0; i<lines.size(); i++) {
				String[] item_arr = lines.get(i).split(",");
				DataMap data = new DataMap();
				
				for(int j=0; j<item_arr.length; j++) {
					if(i==0) {
						title.add(item_arr[j]);
						
					} else {
						data.put(title.get(j), item_arr[j]);
					}
				}
				
				if(i > 0) {
					dataList.add(data);
				}
			}
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			if(br != null) try {br.close();} catch (IOException e2) {e2.printStackTrace();}
		}
		
		DataMap result = new DataMap();
		result.put("dataList", dataList);
		result.put("title", title);
		
		return result;
	}*/

	@Override
	public String regist(MultipartHttpServletRequest request) {
		String msg = "OK";
		
		DataMap userInfo = GetUserInfo.inCookie(request);
		Map<String, MultipartFile> fileMap = request.getFileMap();
		MultipartFile mfile = null;
		
		if((mfile = fileMap.get("file")) != null) {
			String file_nm = mfile.getOriginalFilename();
			String data_nm = "".equals(request.getParameter("_id_data_nm")) ? file_nm : request.getParameter("_id_data_nm");
			try {
				data_nm = data_nm.substring(0, data_nm.lastIndexOf("."));
				
			} catch (StringIndexOutOfBoundsException e) {}

			byte[] fileData = null;
			File file = null;
			
			try {
				fileData = mfile.getBytes();
				String tmpCache = ConfigurationHelper.getHelper().get("innerData.cache.path", "/tmp/innerDataCache");
				file = new File(tmpCache, "innerData.csv");
				
				File dir = new File(tmpCache);
				if(!dir.isDirectory()) {
					dir.mkdirs();
				}
				
				FileCopyUtils.copy(fileData, file);
				
			} catch (IOException e) {
				msg = "파일을 업로드 할 수 없습니다. 관리자에게 문의하세요.";
				e.printStackTrace();
			}
			
			DataMap ori_data = CsvParser.read(file);
			List<DataMap> ori_dataList = (List<DataMap>) ori_data.get("dataList");
			List<String> title = (List<String>) ori_data.get("title");
			
			List<DataMap> dataList = new ArrayList<DataMap>();
			
			DataMap last_data_id = dao.selectOne("innerData.getLastDataId");
			int data_id = (last_data_id == null ? 1 : last_data_id.getInt("data_id") + 1);
			int record_id = 1;
			
			for(DataMap m : ori_dataList) {
				for(String s : title) {
					DataMap data = new DataMap();
					data.put("data_id", data_id);
					data.put("record_id", record_id);
					data.put("data_nm", data_nm);
					data.put("file_nm", file_nm);
					data.put("title", s);
					data.put("content", m.getString(s));
					
					try {
						Double.parseDouble(m.getString(s));
						data.put("content_type", "Double");
						
					} catch (NumberFormatException e) {
						data.put("content_type", "String");
					}
					
					data.put("writer", userInfo.getString("username"));
					
					dataList.add(data);
				}
				record_id++;
			}
			
			DataMap param = new DataMap();
			param.put("dataList", dataList);
			
			dao.insert("innerData.regist", param);
		}
		
		return msg;
	}
}
