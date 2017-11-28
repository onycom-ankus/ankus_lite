package com.ankus.web.lite.innerDataDemand;

import java.util.List;

public interface InnerDataDemandRepository {

    public static final String NAMESPACE = InnerDataDemandRepository.class.getName();

    List<InnerDataDemand> selectByCondition(InnerDataDemand innerDataDemand);

    int selectByConditionCnt(InnerDataDemand innerDataDemand);
    
    int exist(InnerDataDemand innerDataDemand);
    
    int insert(InnerDataDemand innerDataDemand);

    int update(InnerDataDemand innerDataDemand);    
    
    int deleteList(String[] items);

}
