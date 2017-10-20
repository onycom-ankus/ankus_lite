package com.ankus.web.lite.newsList;

import java.util.List;

import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * FoodRisk의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Service
public class NewsListServiceImpl implements NewsListService {

    @Autowired
    private NewsListRepository newsListRepository;

    @Override
    public List<NewsList> selectByCondition(NewsList newsList) {
    	return newsListRepository.selectByCondition(newsList);
    }
    
    @Override
    public int selectByConditionCnt(NewsList newsList) {
    	return newsListRepository.selectByConditionCnt(newsList);
    }
    
}

