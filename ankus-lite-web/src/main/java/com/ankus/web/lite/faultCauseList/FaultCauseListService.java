package com.ankus.web.lite.faultCauseList;

import java.util.List;

/**
 * Assign 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface FaultCauseListService {
    
    List<FaultCauseList> selectByCondition(FaultCauseList faultCauseList);
    
    int selectByConditionCnt(FaultCauseList faultCauseList);
    
    List<FaultCauseList> selectByYearList(FaultCauseList faultCauseList);
    
    List<FaultCauseList> selectByTermList(FaultCauseList faultCauseList);
    
}