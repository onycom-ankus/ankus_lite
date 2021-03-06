package com.ankus.web.lite.worddic;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Worddic의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Service
public class WorddicServiceImpl implements WorddicService {

    @Autowired
    private WorddicRepository worddicRepository;

    @Override
    public Worddic select(Integer wid) {
        return worddicRepository.select(wid);
    }
    
    @Override
    public List<Worddic> selectByCondition(Worddic worddic) {
    	return worddicRepository.selectByCondition(worddic);
    }
    
    @Override
    public int selectByConditionCnt(Worddic worddic) {
    	return worddicRepository.selectByConditionCnt(worddic);
    }

    @Override
    public int exist(Worddic worddic) {
    	return worddicRepository.exist(worddic);
    }
    
    @Override
    public int insert(Worddic worddic) {
        return worddicRepository.insert(worddic);
    }
    
    @Override
    public int update(Worddic worddic) {
    	return worddicRepository.update(worddic);
    }
 
    @Override
    public int deleteList(Integer[] wids) {
    	return worddicRepository.deleteList(wids);
    }

	
}

