package com.ankus.web.lite.newsList;

import java.util.List;

/**
 * FoodRisk 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface NewsListService {
    List<NewsList> selectByCondition(NewsList newsList);
    
    int selectByConditionCnt(NewsList newsList);
            
}