package com.ankus.web.lite.relatedKeyword;

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
public class RelatedKeywordServiceImpl implements RelatedKeywordService {

    @Autowired
    private RelatedKeywordRepository relatedKeywordRepository;
    
    @Override
    public List<RelatedKeyword> selectByCondition(RelatedKeyword relatedKeyword) {
    	return relatedKeywordRepository.selectByCondition(relatedKeyword);
    }
    
    @Override
    public int selectByConditionCnt(RelatedKeyword relatedKeyword) {
    	return relatedKeywordRepository.selectByConditionCnt(relatedKeyword);
    }
    
    @Override
    public List<RelatedKeyword> selectByYearList(RelatedKeyword relatedKeyword) {
    	return relatedKeywordRepository.selectByYearList(relatedKeyword);
    }
    
    @Override
    public List<RelatedKeyword> selectByTermList(RelatedKeyword relatedKeyword) {
    	return relatedKeywordRepository.selectByTermList(relatedKeyword);
    }
 
}

