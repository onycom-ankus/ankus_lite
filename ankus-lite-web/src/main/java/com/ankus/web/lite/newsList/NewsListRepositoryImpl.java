package com.ankus.web.lite.newsList;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class NewsListRepositoryImpl extends DefaultSqlSessionDaoSupport implements NewsListRepository {

    @Autowired
    public NewsListRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<NewsList> selectByCondition(NewsList newsList) {
    	return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", newsList);
    }

    @Override
    public int selectByConditionCnt(NewsList newsList) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", newsList);
    }    

}
