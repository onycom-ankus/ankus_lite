package com.ankus.web.lite.prdtKeyword;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PrdtKeywordRepositoryImpl extends DefaultSqlSessionDaoSupport implements PrdtKeywordRepository {

    @Autowired
    public PrdtKeywordRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<PrdtKeyword> selectByCondition(PrdtKeyword prdtKeyword) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", prdtKeyword);
    }

    @Override
    public int selectByConditionCnt(PrdtKeyword prdtKeyword) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", prdtKeyword);
    }
    
    @Override
    public List<PrdtKeyword> selectByYearList(PrdtKeyword prdtKeyword) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByYearList", prdtKeyword);
    }
    
    @Override
    public List<PrdtKeyword> selectByTermList(PrdtKeyword prdtKeyword) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByTermList", prdtKeyword);
    }
    
    @Override
    public List<PrdtKeyword> selectByChartList(PrdtKeyword prdtKeyword) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByChartList", prdtKeyword);
    }
    
}
