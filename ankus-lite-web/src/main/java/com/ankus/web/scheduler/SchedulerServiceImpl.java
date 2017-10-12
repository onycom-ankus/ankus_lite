package com.ankus.web.scheduler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Scheduler의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Service
public class SchedulerServiceImpl implements SchedulerService {

    @Autowired
    private SchedulerRepository schedulerRepository;

    @Override
    public Scheduler select(Integer id) {
        return schedulerRepository.select(id);
    }

    @Override
    public List<Scheduler> selectAll() {
        return schedulerRepository.selectAll();
    }
    
    @Override
    public List<Scheduler> selectByCondition(Scheduler scheduler) {
    	return schedulerRepository.selectByCondition(scheduler);
    }
    
    @Override
    public int selectByConditionCnt(Scheduler scheduler) {
    	return schedulerRepository.selectByConditionCnt(scheduler);
    }
    
    @Override
    public int insert(Scheduler scheduler) {
        return schedulerRepository.insert(scheduler);
    }

    @Override
    public int update(Scheduler scheduler) {
    	return schedulerRepository.update(scheduler);
    }
    
    @Override
    public int delete(Integer id) {
        return schedulerRepository.delete(id);
    }

    @Override
    public int deleteList(Integer[] ids) {
    	return schedulerRepository.deleteList(ids);
    }

	
}

