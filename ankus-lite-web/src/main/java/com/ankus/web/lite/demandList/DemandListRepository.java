package com.ankus.web.lite.demandList;

import java.util.List;

import com.ankus.web.lite.faultCauseList.FaultCauseList;

public interface DemandListRepository {

    public static final String NAMESPACE = DemandListRepository.class.getName();
    
    List<DemandList> selectByCondition(DemandList demandList);

    int selectByConditionCnt(DemandList demandList);
    
    List<DemandList> selectByYearList(DemandList demandList);
    
    List<DemandList> selectByTermList(DemandList demandList);   
    
    List<DemandList> selectByModelList(DemandList demandList); 
    
    List<DemandList> selectByChartList(DemandList demandList); 
    
}
