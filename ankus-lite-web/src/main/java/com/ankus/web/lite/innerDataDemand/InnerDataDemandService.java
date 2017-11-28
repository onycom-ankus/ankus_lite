package com.ankus.web.lite.innerDataDemand;

import java.util.List;

/**
 * InnerDataDemand 의 각종 기능을 제공하는 인터페이스
 *
 * @author 
 * @since 1.0
 */
public interface InnerDataDemandService {
    
    List<InnerDataDemand> selectByCondition(InnerDataDemand innerDataDemand);
    
    int selectByConditionCnt(InnerDataDemand innerDataDemand);

    int exist(InnerDataDemand innerDataDemand);

    int insert(InnerDataDemand innerDataDemand);
    
    int update(InnerDataDemand innerDataDemand);

    int deleteList(String[] items);
    
}