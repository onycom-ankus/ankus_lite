package com.ankus.web.lite.prdtKeyword;

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
public class PrdtKeywordServiceImpl implements PrdtKeywordService {

    @Autowired
    private PrdtKeywordRepository prdtKeywordRepository;
    
    @Override
    public List<PrdtKeyword> selectByCondition(PrdtKeyword prdtKeyword) {
    	return prdtKeywordRepository.selectByCondition(prdtKeyword);
    }
    
    @Override
    public int selectByConditionCnt(PrdtKeyword prdtKeyword) {
    	return prdtKeywordRepository.selectByConditionCnt(prdtKeyword);
    }
    
    @Override
    public List<PrdtKeyword> selectByYearList(PrdtKeyword prdtKeyword) {
    	return prdtKeywordRepository.selectByYearList(prdtKeyword);
    }
    
    @Override
    public List<PrdtKeyword> selectByTermList(PrdtKeyword prdtKeyword) {
    	return prdtKeywordRepository.selectByTermList(prdtKeyword);
    }
    
    @Override
    public List<PrdtKeyword> selectByChartList(PrdtKeyword prdtKeyword) {
    	return prdtKeywordRepository.selectByChartList(prdtKeyword);
    }
 
}

