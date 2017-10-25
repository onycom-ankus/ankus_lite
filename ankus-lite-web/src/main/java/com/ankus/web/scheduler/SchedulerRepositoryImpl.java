package com.ankus.web.scheduler;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class SchedulerRepositoryImpl extends DefaultSqlSessionDaoSupport implements SchedulerRepository {

    @Autowired
    public SchedulerRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public Scheduler select(Integer id) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".select", id);
    }
    
    @Override
    public List<Scheduler> selectAll() {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectAll");
    }
    
    @Override
    public List<Scheduler> selectByCondition(Scheduler scheduler) {
    	return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", scheduler);
    }

    @Override
    public int selectByConditionCnt(Scheduler scheduler) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", scheduler);
    }
    
    @Override
    public int insert(Scheduler scheduler) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".insert", scheduler);
    }

    @Override
    public int update(Scheduler scheduler) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".update", scheduler);
    }
    
    @Override
    public int delete(Integer id) {
        return getSqlSessionTemplate().update(NAMESPACE + ".delete", id);
    }
    
    @Override
    public int deleteList(Integer[] ids) {
    	return getSqlSessionTemplate().delete(NAMESPACE + ".deleteList", ids);
    }
}
