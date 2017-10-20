package com.ankus.web.lite.newsoid;

import java.util.List;

public interface NewsOidRepository {

    public static final String NAMESPACE = NewsOidRepository.class.getName();

    NewsOid select(String item);
    
    List<NewsOid> selectAll();
    
    List<NewsOid> selectByCondition(NewsOid newsoid);

    int selectByConditionCnt(NewsOid newsoid);
    
    int exist(String item);
    
    int insert(NewsOid newsoid);

    int update(NewsOid newsoid);
    
    int delete(String item);
    
    int deleteList(String[] items);

}
