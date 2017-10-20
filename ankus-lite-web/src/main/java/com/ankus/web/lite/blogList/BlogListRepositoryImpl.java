package com.ankus.web.lite.blogList;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class BlogListRepositoryImpl extends DefaultSqlSessionDaoSupport implements BlogListRepository {

    @Autowired
    public BlogListRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<BlogList> selectByCondition(BlogList blogList) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", blogList);
    }

    @Override
    public int selectByConditionCnt(BlogList blogList) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", blogList);
    }
    
}
