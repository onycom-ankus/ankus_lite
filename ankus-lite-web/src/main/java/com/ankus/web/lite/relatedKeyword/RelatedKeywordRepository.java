package com.ankus.web.lite.relatedKeyword;

import java.util.List;

public interface RelatedKeywordRepository {

    public static final String NAMESPACE = RelatedKeywordRepository.class.getName();
    
    List<RelatedKeyword> selectByCondition(RelatedKeyword relatedKeyword);

    int selectByConditionCnt(RelatedKeyword relatedKeyword);
    
    List<RelatedKeyword> selectByYearList(RelatedKeyword relatedKeyword);
    
    List<RelatedKeyword> selectByTermList(RelatedKeyword relatedKeyword);
    
}
