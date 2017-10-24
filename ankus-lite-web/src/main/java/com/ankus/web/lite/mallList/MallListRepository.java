package com.ankus.web.lite.mallList;

import java.util.List;

import com.ankus.web.lite.worddic.Worddic;

public interface MallListRepository {

    public static final String NAMESPACE = MallListRepository.class.getName();
    
    List<MallList> selectByCondition(MallList mallList);

    int selectByConditionCnt(MallList mallList);
    
}
