package com.ankus.web.lite.blogList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Assign의 각종 기능을 제공하는 서비스 구현체
 *
 * @author Jaesung Ahn
 * @since 1.0
 */
@Service
public class BlogListServiceImpl implements BlogListService {

    @Autowired
    private BlogListRepository blogListRepository;
    
    @Override
    public List<BlogList> selectByCondition(BlogList blogList) {
    	return blogListRepository.selectByCondition(blogList);
    }
    
    @Override
    public int selectByConditionCnt(BlogList blogList) {
    	return blogListRepository.selectByConditionCnt(blogList);
    }
 
}

