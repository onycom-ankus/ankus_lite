package com.ankus.web.lite.worddic;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class WorddicRepositoryImpl extends DefaultSqlSessionDaoSupport implements WorddicRepository {

    @Autowired
    public WorddicRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public Worddic select(Integer wid) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".select", wid);
    }

    @Override
    public List<Worddic> selectByCondition(Worddic worddic) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", worddic);
    }

    @Override
    public int selectByConditionCnt(Worddic worddic) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", worddic);
    }

    @Override
    public int exist(Worddic worddic) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".exist", worddic);
    }
    
    @Override
    public int insert(Worddic worddic) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".insert", worddic);
    }
    
    @Override
    public int update(Worddic worddic) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".update", worddic);
    }
    
    @Override
    public int deleteList(Integer[] wids) {
    	return getSqlSessionTemplate().delete(NAMESPACE + ".deleteList", wids);
    }
}
