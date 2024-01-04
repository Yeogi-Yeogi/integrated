package com.yeogi.app.review.service;

import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.dto.ReviewReqDto;
import com.yeogi.app.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository repository;
    private final SqlSessionTemplate template;
    public List<ReviewDetailDto> getReviews(ReviewReqDto dto) {

        RowBounds rowBounds = new RowBounds(Integer.parseInt(dto.getOffset()) * 10, 10);
        return repository.getReviewListByBoardNo(dto.getBoardNo(), template, rowBounds);
    }
}
