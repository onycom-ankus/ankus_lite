package com.ankus.web.lite.newsList;

import java.util.List;
import java.util.Map;

public interface NewsListRepository {

    public static final String NAMESPACE = NewsListRepository.class.getName();
    
    List<NewsList> selectByCondition(NewsList newsList);

    int selectByConditionCnt(NewsList newsList); 

}
