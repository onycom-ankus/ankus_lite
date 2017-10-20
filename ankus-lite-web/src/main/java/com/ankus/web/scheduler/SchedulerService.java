package com.ankus.web.scheduler;

import java.util.List;

/**
 * Scheduler 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface SchedulerService {
    Scheduler select(Integer id);

    List<Scheduler> selectAll();
    
    List<Scheduler> selectByCondition(Scheduler scheduler);
    
    int selectByConditionCnt(Scheduler scheduler);
    
    int insert(Scheduler scheduler);
    
    int update(Scheduler scheduler);

    int delete(Integer id);

    int deleteList(Integer[] ids);
    
}