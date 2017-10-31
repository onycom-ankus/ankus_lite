package com.ankus.web.lite.demandList;

import java.util.List;

import com.ankus.web.lite.faultCauseList.FaultCauseList;

/**
 * Assign 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface DemandListService {
    
    List<DemandList> selectByCondition(DemandList demandList);
    
    int selectByConditionCnt(DemandList demandList);
    
    List<DemandList> selectByYearList(DemandList demandList);
    
    List<DemandList> selectByTermList(DemandList demandList);  
    
    List<DemandList> selectByModelList(DemandList demandList);  
    
    List<DemandList> selectByChartList(DemandList demandList);  
    
}