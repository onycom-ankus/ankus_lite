package com.ankus.web.lite.prdtKeyword;

import java.util.List;

public interface PrdtKeywordRepository {

    public static final String NAMESPACE = PrdtKeywordRepository.class.getName();
    
    List<PrdtKeyword> selectByCondition(PrdtKeyword prdtKeyword);

    int selectByConditionCnt(PrdtKeyword prdtKeyword);
    
    List<PrdtKeyword> selectByYearList(PrdtKeyword prdtKeyword);
    
    List<PrdtKeyword> selectByTermList(PrdtKeyword prdtKeyword);
    
    List<PrdtKeyword> selectByChartList(PrdtKeyword prdtKeyword);
    
}
