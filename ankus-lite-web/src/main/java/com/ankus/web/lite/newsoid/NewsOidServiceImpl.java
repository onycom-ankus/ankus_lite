package com.ankus.web.lite.newsoid;

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
public class NewsOidServiceImpl implements NewsOidService {

    @Autowired
    private NewsOidRepository newsoidRepository;

    @Override
    public NewsOid select(String item) {
        return newsoidRepository.select(item);
    }

    @Override
    public List<NewsOid> selectAll() {
        return newsoidRepository.selectAll();
    }
    
    @Override
    public List<NewsOid> selectByCondition(NewsOid newsoid) {
    	return newsoidRepository.selectByCondition(newsoid);
    }
    
    @Override
    public int selectByConditionCnt(NewsOid newsoid) {
    	return newsoidRepository.selectByConditionCnt(newsoid);
    }
    
    @Override
    public int exist(String item) {
    	return newsoidRepository.exist(item);
    }
    
    @Override
    public int insert(NewsOid newsoid) {
        return newsoidRepository.insert(newsoid);
    }
    
    @Override
    public int update(NewsOid newsoid) {
    	return newsoidRepository.update(newsoid);
    }

    @Override
    public int delete(String item) {
        return newsoidRepository.delete(item);
    }

    @Override
    public int deleteList(String[] items) {
    	return newsoidRepository.deleteList(items);
    }

	
}

