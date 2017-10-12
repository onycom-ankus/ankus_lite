package com.ankus.web.scheduler;

import java.util.List;

public interface SchedulerRepository {

    public static final String NAMESPACE = SchedulerRepository.class.getName();

    Scheduler select(Integer id);
    
    List<Scheduler> selectAll();

    List<Scheduler> selectByCondition(Scheduler scheduler);

    int selectByConditionCnt(Scheduler scheduler);
    
    int insert(Scheduler scheduler);
    
    int update(Scheduler scheduler);

    int delete(Integer id);
    
    int deleteList(Integer[] ids);

}
