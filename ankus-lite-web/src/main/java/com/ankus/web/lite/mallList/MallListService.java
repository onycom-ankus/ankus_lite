package com.ankus.web.lite.mallList;

import java.util.List;

import com.ankus.web.lite.worddic.Worddic;

/**
 * Assign 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface MallListService {
    
    List<MallList> selectByCondition(MallList mallList);
    
    int selectByConditionCnt(MallList mallList);
    
}