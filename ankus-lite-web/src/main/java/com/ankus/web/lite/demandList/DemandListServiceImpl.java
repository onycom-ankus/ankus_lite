package com.ankus.web.lite.demandList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankus.web.lite.faultCauseList.FaultCauseList;

/**
 * Assign의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Service
public class DemandListServiceImpl implements DemandListService {

    @Autowired
    private DemandListRepository demandListRepository;
    
    @Override
    public List<DemandList> selectByCondition(DemandList demandList) {
    	return demandListRepository.selectByCondition(demandList);
    }
    
    @Override
    public int selectByConditionCnt(DemandList demandList) {
    	return demandListRepository.selectByConditionCnt(demandList);
    }
    
    @Override
    public List<DemandList> selectByYearList(DemandList demandList) {
    	return demandListRepository.selectByYearList(demandList);
    }
    
    @Override
    public List<DemandList> selectByTermList(DemandList demandList) {
    	return demandListRepository.selectByTermList(demandList);
    }  
    
    @Override
    public List<DemandList> selectByModelList(DemandList demandList) {
    	return demandListRepository.selectByModelList(demandList);
    } 
    
    @Override
    public List<DemandList> selectByChartList(DemandList demandList) {
    	return demandListRepository.selectByChartList(demandList);
    }
 
}

