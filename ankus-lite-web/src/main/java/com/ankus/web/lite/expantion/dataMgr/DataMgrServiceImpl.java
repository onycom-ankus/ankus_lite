package com.ankus.web.lite.expantion.dataMgr;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankus.web.lite.expantion.util.CommonDao;
import com.ankus.web.lite.expantion.util.DataMap;
import com.ankus.web.lite.expantion.util.GetUserInfo;

@Service
public class DataMgrServiceImpl implements DataMgrService {

	@Autowired
	private CommonDao dao;

	@Override
	public List<DataMap> getDataNmList(HttpServletRequest request) {
		
		DataMap userInfo = GetUserInfo.inCookie(request);
		List<DataMap> dataNmList = dao.selectList("dataMgr.getDataNmList", userInfo);
		
		return dataNmList;
	}

	@Override
	public DataMap searchData(HttpServletRequest request) {
		DataMap param = GetUserInfo.inCookie(request);	
		param.put("data_id", request.getParameter("data_id"));
		// param key : username, auth, data_id
		
		List<DataMap> ori_dataList = dao.selectList("dataMgr.searchData", param);	// 수직방향 데이터
		List<DataMap> title = dao.selectList("dataMgr.getTitle", param);
		
		List<DataMap> dataList = new ArrayList<DataMap>();	// 수평방향 데이터
		DataMap data = new DataMap();
		
		for(int i=0; i<ori_dataList.size(); i++) {
			data.put(ori_dataList.get(i).getString("title"), ori_dataList.get(i).getString("content"));
			
			if(i != (ori_dataList.size()-1)) {	// 전제 데이터의 마지막 데이터를 제외한 데이터리스트
				int curRecord_id = ori_dataList.get(i).getInt("record_id");
				int nextRecord_id = ori_dataList.get(i+1).getInt("record_id");

				if(curRecord_id != nextRecord_id) {	// 각 레코드의 마지막 데이터
					dataList.add(data);
					data = new DataMap();
				}
				
			} else {	// 마지막 데이터는 따로 처리
				dataList.add(data);
			}
		}
		
		DataMap result = new DataMap();
		result.put("dataList", dataList);
		result.put("title", title);
		
		return result;
	}

	@Override
	public String remove(HttpServletRequest request) {
		String msg = "success";
		
		try {
			String data_id = request.getParameter("data_id");
			DataMap param = new DataMap();
			param.put("data_id", data_id);
			
			dao.delete("dataMgr.remove", param);
			
		} catch (Exception e) {
			e.printStackTrace();
			msg = "삭제하는 도중 예기치 않은 오류발생. 관리자에게 문의하세요.";
		}
		
		
		return msg;
	}
}
