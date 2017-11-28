package com.ankus.web.lite.expantion.publicData;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankus.web.lite.expantion.util.CommonDao;
import com.ankus.web.lite.expantion.util.DataMap;
import com.ankus.web.lite.expantion.util.ExcelUtil;
import com.ankus.web.lite.expantion.util.GetUserInfo;
import com.ankus.web.lite.expantion.util.XmlToMapParser;;


@Service
public class PublicDataServiceImpl implements PublicDataService {

	private Logger logger = LoggerFactory.getLogger(PublicDataServiceImpl.class);
	
	@Autowired
	private CommonDao dao;

	private static String getStatus(String resultCode) {
		String msg = "";
		
		switch (resultCode) {
		case "0":
			msg = "정상";
			break;
		case "1":
			msg = "요청변수 인코딩 에러. 관리자에게 문의하세요.";
			break;
		case "2":
			msg = "데이터가 없어 등록할 수 없습니다. 입력값을 확인하세요.";
			break;
		case "500":
			msg = "서버에러(500). 관리자에게 문의하세요.";
			break;
		default:
			msg = "알수없는 에러. 관리자에게 문의하세요.";
			break;
		}
		
		return msg;
	}
	
	@Override
	public DataMap getPublicDataList(HttpServletRequest request) {
		
		DataMap param = GetUserInfo.inCookie(request);	
		String data_nm = request.getParameter("data_nm");
		String reg_dttm = request.getParameter("reg_dttm");
		int page = Integer.parseInt(request.getParameter("page"));
		int rows = Integer.parseInt(request.getParameter("rows"));
		String sidx = request.getParameter("sidx");
		String sord = request.getParameter("sord");
		
		param.put("data_nm", data_nm);
		param.put("reg_dttm", reg_dttm);
		param.put("page", page);
		param.put("rows", rows);
		param.put("start", (page - 1) * rows + 1);
		param.put("end", page * rows);
		param.put("sidx", sidx);
		param.put("sord", sord);
		
		DataMap sdc = dao.selectOne("publicData.publicDataCnt", param);
		List<DataMap> list = dao.selectList("publicData.getList", param);
		
		DataMap result = new DataMap();
		result.put("list", list);
		result.put("page", Integer.parseInt(request.getParameter("page")));
		result.put("records", sdc.getInt("records"));
		result.put("total", (int)Math.ceil((double)sdc.getInt("records") / (double)Integer.parseInt(request.getParameter("rows"))));
		
		return result;
	}
	
	@Override
	public DataMap regist(HttpServletRequest request) {

		DataMap userInfo = GetUserInfo.inCookie(request);
		DataMap result = new DataMap();
		
		String url = request.getParameter("url");
		String certKey = request.getParameter("certKey");
		String reqVal = request.getParameter("requestValue");
		
		/* 요청변수 한글 인코딩 -> UTF-8 */
		char[] reqValChar = reqVal.toCharArray();
		
		for(int i=0; i<reqValChar.length; i++) {
			if(reqValChar[i] >= '\uAC00' && reqValChar[i] <= '\uD7A3') {
				String targetText = String.valueOf(reqValChar[i]);
				
				try {
					reqVal = reqVal.replace(targetText, URLEncoder.encode(targetText, "UTF-8"));
					System.out.println(reqVal);
					
				} catch (UnsupportedEncodingException e) {
					result.put("statusMSG", getStatus("1"));
					return result;
				}
			}
		}
		
		String addr = url + "?serviceKey=" + certKey + (("".equals(reqVal)) ? "" : "&" + reqVal);
		String addr_mac = "";
		
		if(addr.matches("\\{year\\}") || addr.matches("\\{month\\}") || addr.matches("\\{day\\}")) {
			Date today = new Date();
			SimpleDateFormat yearsdf = new SimpleDateFormat("yyyy");
			String year = yearsdf.format(today);
			SimpleDateFormat monthsdf = new SimpleDateFormat("MM");
			String month = monthsdf.format(today);
			SimpleDateFormat datesdf = new SimpleDateFormat("dd");
			String day = datesdf.format(today);
		
			addr_mac = addr.replaceAll("\\{year\\}", year);
			addr_mac = addr.replaceAll("\\{month\\}", month);
			addr_mac = addr.replaceAll("\\{day\\}", day);
		}
		
		String data_nm = request.getParameter("data_nm");
		String reload_Cycle = request.getParameter("reload_cycle");
		
		logger.info("=================================== 공공데이터 등록 시작 ===================================");
		
		DataMap itemInfo = XmlToMapParser.parse("".equals(addr_mac) ? addr : addr_mac, "item");
		List<DataMap> itemList = (List<DataMap>) itemInfo.get("resultList");
		
		/* 리스트에 데이터가 없는 예외 체크 */
		if(itemList.size() < 1) {
			result.put("statusMSG", getStatus("2"));
			return result;
		}
		
		/* 데이터베이스에 저장하기 위한 형식으로 가공된 xml 데이터 */
		List<DataMap> rows = new ArrayList<>();
		
		/* public_data_collection에 있는 마지막 data_id */
		DataMap last_data_id = dao.selectOne("publicData.getLastDataId");
		
		int data_id = (last_data_id == null ? 1 : last_data_id.getInt("data_id") + 1);
		int record_id = 1;
		
		for(DataMap m : itemList) {
			Set<String> keySet = m.keySet();
			Iterator<String> iter = keySet.iterator();
			
			while(iter.hasNext()) {
				DataMap row = new DataMap();
				
				String key = iter.next();
				String value = m.getString(key);
				
				row.put("data_id", data_id);
				row.put("record_id", record_id);
				row.put("key", key);
				row.put("value", value);
				
				rows.add(row);
			}
			record_id++;
		}
		
		DataMap param = new DataMap();
		/* public_data_collection */
		param.put("rows", rows);
		dao.insert("publicData.registCollection", param);
		
		/* public_data */
		param.put("writer", userInfo.getString("username"));
		param.put("data_id", data_id);
		param.put("addr", addr);
		param.put("data_nm", data_nm);
		param.put("reload_cycle", reload_Cycle);
		dao.insert("publicData.regist", param);	
		
		logger.info("=================================== 공공데이터 등록 끝 ===================================");
		
		result.put("statusMSG", getStatus("0"));
		
		return result;
	}
	
	@Override
	public DataMap pdDetailGrid(HttpServletRequest request) {
		String data_id = request.getParameter("data_id");
		DataMap param = new DataMap();
		param.put("data_id", data_id);
		param.put("page", request.getParameter("page"));
		param.put("rows", request.getParameter("rows"));
		
		DataMap sdc = dao.selectOne("publicData.pdDetailGridCnt", param);
		List<DataMap> pdList = dao.selectList("publicData.pdDetailGrid", param);
		
		List<DataMap> dataList = new ArrayList<DataMap>();
		DataMap data = new DataMap();
		
		String keyTmp = "";
		int i=0;
		for(DataMap m : pdList) {
			i++;
			
			String key = m.getString("key");
			String value = m.getString("value");
			
			if(keyTmp.contains(key)) {
				keyTmp = "";
				dataList.add(data);
				data = new DataMap();
			} 

			keyTmp += key + ",";
			data.put(key, value);
			
			if(i == pdList.size()) {
				dataList.add(data);
			}
		}
		
		DataMap result = new DataMap();
		result.put("list", dataList);
//		result.put("data_nm", pdList.get(0).getString("data_nm"));
		result.put("page", Integer.parseInt(request.getParameter("page")));
		result.put("records", sdc.getInt("records"));
		result.put("total", (int)Math.ceil((double)sdc.getInt("records") / (double)Integer.parseInt(request.getParameter("rows"))));
		result.put("data_id", data_id);
		
		return result;
	}
	
	@Override
	public DataMap pdDetailGridTitle(HttpServletRequest request) {
		String data_id = request.getParameter("data_id");
		DataMap param = new DataMap();
		param.put("data_id", data_id);
		
		List<DataMap> pdList = dao.selectList("publicData.pdDetailGridTitle", param);
		
		List<String> title = new ArrayList<>();
		DataMap data = new DataMap();
		
		String keyTmp = "";
		int i=0;
		for(DataMap m : pdList) {
			i++;
			
			String key = m.getString("key");
			String value = m.getString("value");
			
			if(!(keyTmp.contains(key))) {
				title.add(key);
			}
			
			keyTmp += key + ",";
			data.put(key, value);
		}
		
		HashSet<String> hs = new HashSet<String>(title);
		title = new ArrayList<>(hs);
		
		param.put("data_nm", pdList.get(0).getString("data_nm"));
		param.put("title", title);
		
		return param;
		
	}

	@Override
	public boolean remove(HttpServletRequest request) {
		String pid = request.getParameter("pid");
		String data_id = request.getParameter("data_id");
		
		DataMap param = new DataMap();
		param.put("pid", pid);
		param.put("data_id", data_id);
		
		try {
			dao.delete("publicData.removePublicData", param);
			dao.delete("publicData.removePublicDataCollection", param);
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		
		return true;
	}

	@Override
	public DataMap pdDetailExecel(HttpServletRequest request) {
		String data_id = request.getParameter("data_id");
		DataMap param = new DataMap();
		param.put("data_id", data_id);
		
		List<DataMap> pdList = dao.selectList("publicData.pdDetailExecel", param);
		
		List<String> title = new ArrayList<>();
		List<DataMap> dataList = new ArrayList<>();
		DataMap data = new DataMap();
		
		String keyTmp = "";
		int i=0;
		for(DataMap m : pdList) {
			i++;
			
			String key = m.getString("key");
			String value = m.getString("value");
			
			if(keyTmp.contains(key)) {
				keyTmp = "";
				dataList.add(data);
				data = new DataMap();
			} 

			if(!(keyTmp.contains(key))) {
				title.add(key);
			}
			
			keyTmp += key + ",";
			data.put(key, value);
			
			if(i == pdList.size()) {
				dataList.add(data);
			}
		}
		
		HashSet<String> hs = new HashSet<String>(title);
		title = new ArrayList<>(hs);
		
		param.put("data_nm", pdList.get(0).getString("data_nm"));
		param.put("title", title);
		param.put("dataList", dataList);
		
		return param;
	}
	
	@Override
	public void excelExport(HttpServletRequest request, HttpServletResponse response) {
		DataMap data = pdDetailExecel(request);
		ExcelUtil.excelExport(request, response, data);
	}
}
