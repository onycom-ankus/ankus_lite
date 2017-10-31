package com.ankus.web.lite.faultCauseList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Assign의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Service
public class FaultCauseListServiceImpl implements FaultCauseListService {

    @Autowired
    private FaultCauseListRepository faultCauseListRepository;
    
    @Override
    public List<FaultCauseList> selectByCondition(FaultCauseList faultCauseList) {
    	return faultCauseListRepository.selectByCondition(faultCauseList);
    }
    
    @Override
    public int selectByConditionCnt(FaultCauseList faultCauseList) {
    	return faultCauseListRepository.selectByConditionCnt(faultCauseList);
    }
    
    @Override
    public List<FaultCauseList> selectByYearList(FaultCauseList faultCauseList) {
    	return faultCauseListRepository.selectByYearList(faultCauseList);
    }
    
    @Override
    public List<FaultCauseList> selectByTermList(FaultCauseList faultCauseList) {
    	return faultCauseListRepository.selectByTermList(faultCauseList);
    }
 
}

