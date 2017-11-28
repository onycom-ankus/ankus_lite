package com.ankus.web.lite.faultCauseList;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class FaultCauseListRepositoryImpl extends DefaultSqlSessionDaoSupport implements FaultCauseListRepository {

    @Autowired
    public FaultCauseListRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<FaultCauseList> selectByCondition(FaultCauseList faultCauseList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", faultCauseList);
    }

    @Override
    public int selectByConditionCnt(FaultCauseList faultCauseList) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", faultCauseList);
    }
    
    @Override
    public List<FaultCauseList> selectByYearList(FaultCauseList faultCauseList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByYearList", faultCauseList);
    }
    
    @Override
    public List<FaultCauseList> selectByTermList(FaultCauseList faultCauseList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByTermList", faultCauseList);
    }
    
}
