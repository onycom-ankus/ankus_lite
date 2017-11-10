package com.ankus.web.lite.expantion.InnerData;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
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
import com.ankus.web.lite.expantion.util.DataMap;
import com.ankus.web.lite.expantion.util.GetUserInfo;

import au.com.bytecode.opencsv.CSVReader;

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
			
			List<DataMap> ori_dataList = new ArrayList<DataMap>();
			List<String> title = new ArrayList<String>();
			
			DataMap last_data_id = dao.selectOne("innerData.getLastDataId");
			int data_id = (last_data_id == null ? 1 : last_data_id.getInt("data_id") + 1);
			int record_id = 1;
			
			try {
				CSVReader reader = new CSVReader(new InputStreamReader(new FileInputStream(file), "euc-kr"));
				
				String[] s;
				int titleFlag = 0;
//				while((s = reader.readNext()) != null) {
				while(true) {
					s = reader.readNext();
					
					if(s != null) {
						DataMap data = new DataMap();
						
						for(int i=0; i<s.length; i++) {
							if(titleFlag == 0) {
								title.add(s[i]);
							} else {
								data.put(title.get(i), s[i]);
							}
						} // end for
						
						if(titleFlag > 0) {
							ori_dataList.add(data);
						}
						
						titleFlag++;
					}
					
					if(titleFlag % 100 == 0 || s == null) {
						List<DataMap> dataList = new ArrayList<DataMap>();
						
						for(DataMap od : ori_dataList) {
							for(String t : title) {
								DataMap idata = new DataMap();
								idata.put("data_id", data_id);
								idata.put("record_id", record_id);
								idata.put("data_nm", data_nm);
								idata.put("file_nm", file_nm);
								idata.put("title", t);
								idata.put("content", od.getString(t));
								
								try {
									Double.parseDouble(od.getString(t));
									idata.put("content_type", "Double");
									
								} catch (NumberFormatException e) {
									idata.put("content_type", "String");
								}
								
								idata.put("writer", userInfo.getString("username"));
								
								dataList.add(idata);
							}
							record_id++;
						}
						
						DataMap param = new DataMap();
						param.put("dataList", dataList);
						
						for(DataMap m : dataList) {
							System.out.println(m);
						}
						
						dao.insert("innerData.regist", param);
						
						System.out.println("-----------------------------DB INSERT--------------------------");
						
						ori_dataList = new ArrayList<DataMap>();
						
						if(s == null) {
							break;
						}
					}
					
				} // end while
						
			} catch (FileNotFoundException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return msg;
	}
}
