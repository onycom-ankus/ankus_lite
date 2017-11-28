package com.ankus.web.lite.innerDataDemand;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * NewsOid의 각종 기능을 제공하는 서비스 구현체
 *
 * @author 
 * @since 1.0
 */
@Service
public class InnerDataDemandServiceImpl implements InnerDataDemandService {

    @Autowired
    private InnerDataDemandRepository innerDataDemandRepository;

    @Override
    public List<InnerDataDemand> selectByCondition(InnerDataDemand innerDataDemand) {
    	return innerDataDemandRepository.selectByCondition(innerDataDemand);
    }
    
    @Override
    public int selectByConditionCnt(InnerDataDemand innerDataDemand) {
    	return innerDataDemandRepository.selectByConditionCnt(innerDataDemand);
    }
    
    @Override
    public int exist(InnerDataDemand innerDataDemand) {
    	return innerDataDemandRepository.exist(innerDataDemand);
    }
    
    @Override
    public int insert(InnerDataDemand innerDataDemand) {
        return innerDataDemandRepository.insert(innerDataDemand);
    }
    
    @Override
    public int update(InnerDataDemand innerDataDemand) {
    	return innerDataDemandRepository.update(innerDataDemand);
    }

    @Override
    public int deleteList(String[] items) {
    	return innerDataDemandRepository.deleteList(items);
    }

	
}

