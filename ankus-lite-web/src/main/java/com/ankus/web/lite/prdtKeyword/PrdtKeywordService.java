package com.ankus.web.lite.prdtKeyword;

import java.util.List;

/**
 * Assign 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface PrdtKeywordService {
    
    List<PrdtKeyword> selectByCondition(PrdtKeyword prdtKeyword);
    
    int selectByConditionCnt(PrdtKeyword prdtKeyword);
    
    List<PrdtKeyword> selectByYearList(PrdtKeyword prdtKeyword);
    
    List<PrdtKeyword> selectByTermList(PrdtKeyword prdtKeyword);
    
    List<PrdtKeyword> selectByChartList(PrdtKeyword prdtKeyword);
    
}