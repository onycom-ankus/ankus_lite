package com.ankus.web.lite.innerDataDemand;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InnerDataDemandRepositoryImpl extends DefaultSqlSessionDaoSupport implements InnerDataDemandRepository {

    @Autowired
    public InnerDataDemandRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<InnerDataDemand> selectByCondition(InnerDataDemand innerDataDemand) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", innerDataDemand);
    }

    @Override
    public int selectByConditionCnt(InnerDataDemand innerDataDemand) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", innerDataDemand);
    }
    
    @Override
    public int exist(InnerDataDemand innerDataDemand) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".exist", innerDataDemand);
    }
    
    @Override
    public int insert(InnerDataDemand innerDataDemand) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".insert", innerDataDemand);
    }
    
    @Override
    public int update(InnerDataDemand innerDataDemand) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".update", innerDataDemand);
    }

    @Override
    public int deleteList(String[] items) {
    	return getSqlSessionTemplate().delete(NAMESPACE + ".deleteList", items);
    }
}
