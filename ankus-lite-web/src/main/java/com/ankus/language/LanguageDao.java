package com.ankus.language;

import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ankus.web.lite.expantion.util.DataMap;

@Repository
public class LanguageDao extends DefaultSqlSessionDaoSupport {
	
	@Autowired
    public LanguageDao(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

	public String selectOne(String queryID, String param) {
		return getSqlSessionTemplate().selectOne(queryID, param);
	}

	public void update(String queryID, DataMap param) {
		getSqlSessionTemplate().update(queryID, param);
	}

}
