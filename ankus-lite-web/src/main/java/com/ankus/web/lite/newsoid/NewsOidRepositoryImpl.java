package com.ankus.web.lite.newsoid;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class NewsOidRepositoryImpl extends DefaultSqlSessionDaoSupport implements NewsOidRepository {

    @Autowired
    public NewsOidRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public NewsOid select(String item) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".select", item);
    }
    
    @Override
    public List<NewsOid> selectAll() {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectAll");
    }

    @Override
    public List<NewsOid> selectByCondition(NewsOid newsoid) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", newsoid);
    }

    @Override
    public int selectByConditionCnt(NewsOid newsoid) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", newsoid);
    }
    
    @Override
    public int exist(String item) {
        return getSqlSessionTemplate().selectOne(NAMESPACE + ".exist", item);
    }
    
    @Override
    public int insert(NewsOid newsoid) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".insert", newsoid);
    }
    
    @Override
    public int update(NewsOid newsoid) {
    	return getSqlSessionTemplate().insert(NAMESPACE + ".update", newsoid);
    }

    @Override
    public int delete(String item) {
        return getSqlSessionTemplate().delete(NAMESPACE + ".delete", item);
    }
    
    @Override
    public int deleteList(String[] items) {
    	return getSqlSessionTemplate().delete(NAMESPACE + ".deleteList", items);
    }
}
