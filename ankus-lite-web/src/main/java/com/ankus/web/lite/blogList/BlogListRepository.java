package com.ankus.web.lite.blogList;

import java.util.List;

public interface BlogListRepository {

    public static final String NAMESPACE = BlogListRepository.class.getName();
    
    List<BlogList> selectByCondition(BlogList blogList);

    int selectByConditionCnt(BlogList blogList);
    
}
