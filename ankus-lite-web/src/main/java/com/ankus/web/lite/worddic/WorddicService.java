package com.ankus.web.lite.worddic;

import java.util.List;
import java.util.Map;

/**
 * Worddic 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface WorddicService {
    Worddic select(Integer wid);

    List<Worddic> selectAll();
    
    List<Worddic> selectByCondition(Worddic worddic);
    
    int selectByConditionCnt(Worddic worddic);

    List<Worddic> selectItems(Map map);
    
    List<Worddic> selectTypes(Worddic worddic);
    
    List<Worddic> selectItemsList(Worddic worddic);
    
    int exist(Integer wid);

    int insert(Worddic worddic);
    
    int update(Worddic worddic);

    int delete(Integer wid);

    int deleteList(Integer[] wids);
    
}