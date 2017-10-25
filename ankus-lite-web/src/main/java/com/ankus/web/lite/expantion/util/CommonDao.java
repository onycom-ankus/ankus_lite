package com.ankus.web.lite.expantion.util;

import java.util.List;

import javax.annotation.Resource;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class CommonDao {

	@Resource(name="sqlSessionTemplate")
	SqlSessionTemplate sqlSessionTemplate;
	
	public DataMap selectOne(String sQueryID) {
		return sqlSessionTemplate.selectOne(sQueryID);
	}
	
	public DataMap selectOne(String sQueryID, DataMap in) {
		return sqlSessionTemplate.selectOne(sQueryID, in);
	}
	
	public List<DataMap> selectList(String sQueryID) {
		return sqlSessionTemplate.selectList(sQueryID);
	}
	
	public List<DataMap> selectList(String sQueryID, DataMap in) {
		return sqlSessionTemplate.selectList(sQueryID, in);
	}
	
	public int insert(String sQueryID, DataMap in) {
		return sqlSessionTemplate.insert(sQueryID, in);
	}
	
	public int update(String sQueryID, DataMap in) {
		return sqlSessionTemplate.update(sQueryID, in);
	}
	
	public int delete(String sQueryID, DataMap in) {
		return sqlSessionTemplate.delete(sQueryID, in);
	}
}
