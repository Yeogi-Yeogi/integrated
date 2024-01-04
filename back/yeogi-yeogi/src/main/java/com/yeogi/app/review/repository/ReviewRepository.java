package com.yeogi.app.review.repository;

import com.yeogi.app.review.dto.ReviewDetailDto;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewRepository {
    public List<ReviewDetailDto> getReviewListByBoardNo(String boardNo, SqlSessionTemplate template, RowBounds rowBounds) {
        return template.selectList("ReviewMapper.getReviewListByBoardNo", boardNo, rowBounds);
    }
}
