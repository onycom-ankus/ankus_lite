package com.ankus.web.lite.blogList;

import java.util.List;

/**
 * Assign 의 각종 기능을 제공하는 인터페이스
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
public interface BlogListService {
    
    List<BlogList> selectByCondition(BlogList blogList);
    
    int selectByConditionCnt(BlogList blogList);
    
}