package com.ankus.web.lite.relatedKeyword;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import com.ankus.core.repository.DefaultSqlSessionDaoSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class RelatedKeywordRepositoryImpl extends DefaultSqlSessionDaoSupport implements RelatedKeywordRepository {

    @Autowired
    public RelatedKeywordRepositoryImpl(SqlSessionTemplate sqlSessionTemplate) {
        super.setSqlSessionTemplate(sqlSessionTemplate);
    }

    @Override
    public List<RelatedKeyword> selectByCondition(RelatedKeyword relatedKeyword) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByCondition", relatedKeyword);
    }

    @Override
    public int selectByConditionCnt(RelatedKeyword relatedKeyword) {
    	return getSqlSessionTemplate().selectOne(NAMESPACE + ".selectByConditionCnt", relatedKeyword);
    }
    
    @Override
    public List<RelatedKeyword> selectByYearList(RelatedKeyword relatedKeyword) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByYearList", relatedKeyword);
    }
    
    @Override
    public List<RelatedKeyword> selectByTermList(RelatedKeyword relatedKeyword) {
        return getSqlSessionTemplate().selectList(NAMESPACE + ".selectByTermList", relatedKeyword);
    }
    
}
