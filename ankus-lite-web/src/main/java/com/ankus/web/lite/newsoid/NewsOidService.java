package com.ankus.web.lite.newsoid;

import java.util.List;

/**
 * NewsOid 의 각종 기능을 제공하는 인터페이스
 *
 * @author 
 * @since 1.0
 */
public interface NewsOidService {
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