package com.ankus.web.lite.innerDataFault;

import java.util.List;

import com.ankus.web.lite.expantion.util.DataMap;

public interface InnerDataFaultRepository {

    public static final String NAMESPACE = InnerDataFaultRepository.class.getName();

    List<InnerDataFault> selectByCondition(InnerDataFault innerDataFault);

    int selectByConditionCnt(InnerDataFault innerDataFault);
    
    int exist(InnerDataFault innerDataFault);
    
    int insert(InnerDataFault innerDataFault);

    int update(InnerDataFault innerDataFault);    
    
    int deleteList(String[] items);
    
    List<InnerDataFault> selectByExcelCondition(InnerDataFault innerDataFault);

}
