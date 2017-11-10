package com.ankus.web.lite.faultCauseList;

import java.util.List;

public interface FaultCauseListRepository {

    public static final String NAMESPACE = FaultCauseListRepository.class.getName();
    
    List<FaultCauseList> selectByCondition(FaultCauseList faultCauseList);

    int selectByConditionCnt(FaultCauseList faultCauseList);
    
    List<FaultCauseList> selectByYearList(FaultCauseList faultCauseList);
    
    List<FaultCauseList> selectByTermList(FaultCauseList faultCauseList);
    
}
