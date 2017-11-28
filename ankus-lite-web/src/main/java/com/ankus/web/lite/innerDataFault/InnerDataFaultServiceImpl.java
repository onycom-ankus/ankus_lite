package com.ankus.web.lite.innerDataFault;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankus.web.lite.expantion.util.DataMap;

/**
 * NewsOid의 각종 기능을 제공하는 서비스 구현체
 *
 * @author 
 * @since 1.0
 */
@Service
public class InnerDataFaultServiceImpl implements InnerDataFaultService {

    @Autowired
    private InnerDataFaultRepository innerDataFaultRepository;

    @Override
    public List<InnerDataFault> selectByCondition(InnerDataFault innerDataFault) {
    	return innerDataFaultRepository.selectByCondition(innerDataFault);
    }
    
    @Override
    public int selectByConditionCnt(InnerDataFault innerDataFault) {
    	return innerDataFaultRepository.selectByConditionCnt(innerDataFault);
    }
    
    @Override
    public int exist(InnerDataFault innerDataFault) {
    	return innerDataFaultRepository.exist(innerDataFault);
    }
    
    @Override
    public int insert(InnerDataFault innerDataFault) {
        return innerDataFaultRepository.insert(innerDataFault);
    }
    
    @Override
    public int update(InnerDataFault innerDataFault) {
    	return innerDataFaultRepository.update(innerDataFault);
    }

    @Override
    public int deleteList(String[] items) {
    	return innerDataFaultRepository.deleteList(items);
    }
    
    @Override
    public List<InnerDataFault> selectByExcelCondition(InnerDataFault innerDataFault) {
    	return innerDataFaultRepository.selectByExcelCondition(innerDataFault);
    }

	
}

