package com.ankus.web.lite.innerDataFault;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import com.ankus.web.lite.expantion.util.DataMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class InnerDataFaultRepositoryImpl extends DefaultSqlSessionDaoSupport implements InnerDataFaultRepository {

    @Autowired
    public InnerDataFaultRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<InnerDataFault> selectByCondition(InnerDataFault innerDataFault) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", innerDataFault);
    }

    @Override
    public int selectByConditionCnt(InnerDataFault innerDataFault) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", innerDataFault);
    }
    
    @Override
    public int exist(InnerDataFault innerDataFault) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".exist", innerDataFault);
    }
    
    @Override
    public int insert(InnerDataFault innerDataFault) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".insert", innerDataFault);
    }
    
    @Override
    public int update(InnerDataFault innerDataFault) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".update", innerDataFault);
    }

    @Override
    public int deleteList(String[] items) {
    	return getSqlSessionTemplate().delete(NAMESPACE + ".deleteList", items);
    }
    
    @Override
    public List<InnerDataFault> selectByExcelCondition(InnerDataFault innerDataFault) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByExcelCondition", innerDataFault);
    }
}
