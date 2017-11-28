package com.ankus.web.lite.relatedKeyword;

import java.util.List;

/**
 * Assign 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface RelatedKeywordService {
    
    List<RelatedKeyword> selectByCondition(RelatedKeyword relatedKeyword);
    
    int selectByConditionCnt(RelatedKeyword relatedKeyword);
    
    List<RelatedKeyword> selectByYearList(RelatedKeyword relatedKeyword);
    
    List<RelatedKeyword> selectByTermList(RelatedKeyword relatedKeyword);
    
}