package com.ankus.web.lite.innerDataFault;

import java.util.List;

import com.ankus.web.lite.expantion.util.DataMap;

/**
 * InnerDataFault 의 각종 기능을 제공하는 인터페이스
 *
 * @author 
 * @since 1.0
 */
public interface InnerDataFaultService {
    
    List<InnerDataFault> selectByCondition(InnerDataFault innerDataFault);
    
    int selectByConditionCnt(InnerDataFault innerDataFault);

    int exist(InnerDataFault innerDataFault);

    int insert(InnerDataFault innerDataFault);
    
    int update(InnerDataFault innerDataFault);

    int deleteList(String[] items);
    
    List<InnerDataFault> selectByExcelCondition(InnerDataFault innerDataFault);
    
}