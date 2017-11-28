package com.ankus.web.lite.demandList;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import com.ankus.web.lite.faultCauseList.FaultCauseList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class DemandListRepositoryImpl extends DefaultSqlSessionDaoSupport implements DemandListRepository {

    @Autowired
    public DemandListRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<DemandList> selectByCondition(DemandList demandList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", demandList);
    }

    @Override
    public int selectByConditionCnt(DemandList demandList) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", demandList);
    }
    
    @Override
    public List<DemandList> selectByYearList(DemandList demandList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByYearList", demandList);
    }
    
    @Override
    public List<DemandList> selectByTermList(DemandList demandList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByTermList", demandList);
    }
    
    @Override
    public List<DemandList> selectByModelList(DemandList demandList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByModelList", demandList);
    }
    
    @Override
    public List<DemandList> selectByChartList(DemandList demandList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByChartList", demandList);
    }
}
