package com.ankus.web.lite.mallList;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ankus.web.lite.worddic.Worddic;

@Repository
public class MallListRepositoryImpl extends DefaultSqlSessionDaoSupport implements MallListRepository {

    @Autowired
    public MallListRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<MallList> selectByCondition(MallList mallList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", mallList);
    }

    @Override
    public int selectByConditionCnt(MallList mallList) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", mallList);
    }
    
}
