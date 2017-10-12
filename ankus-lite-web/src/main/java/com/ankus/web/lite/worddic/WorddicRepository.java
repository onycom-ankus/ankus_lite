package com.ankus.web.lite.worddic;

import java.util.List;
import java.util.Map;

public interface WorddicRepository {

    public static final String NAMESPACE = WorddicRepository.class.getName();

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
