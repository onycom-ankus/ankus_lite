package com.ankus.web.lite.worddic;

import java.util.List;
import java.util.Map;

public interface WorddicRepository {

    public static final String NAMESPACE = WorddicRepository.class.getName();

    Worddic select(Integer wid);
    
    List<Worddic> selectByCondition(Worddic worddic);
    
    int selectByConditionCnt(Worddic worddic);

    int exist(Worddic worddic);
    
    int insert(Worddic worddic);

    int update(Worddic worddic);
    
    int deleteList(Integer[] wids);

}
