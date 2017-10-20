package com.ankus.web.lite.mallList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ankus.web.lite.worddic.Worddic;

/**
 * Assign의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Service
public class MallListServiceImpl implements MallListService {

    @Autowired
    private MallListRepository mallListRepository;
    
    @Override
    public List<MallList> selectByCondition(MallList mallList) {
    	return mallListRepository.selectByCondition(mallList);
    }
    
    @Override
    public int selectByConditionCnt(MallList mallList) {
    	return mallListRepository.selectByConditionCnt(mallList);
    }

}

