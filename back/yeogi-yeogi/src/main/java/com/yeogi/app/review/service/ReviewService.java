package com.yeogi.app.review.service;

import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.club.dao.ClubDao;
import com.yeogi.app.review.dto.ReviewAddDto;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.dto.ReviewReqDto;
import com.yeogi.app.review.repository.ReviewRepository;
import com.yeogi.app.util.exception.FailAddReviewException;
import com.yeogi.app.util.valid.CheckClubMember;
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
    private final CheckClubMember checkMember;
    private final SqlSessionTemplate template;

    public List<ReviewDetailDto> getReviews(ReviewReqDto dto) {

        RowBounds rowBounds = new RowBounds(Integer.parseInt(dto.getOffset()) * 10, 10);
        return repository.getReviewListByBoardNo(dto.getBoardNo(), template, rowBounds);
    }

    /**
     * 리뷰 작성
     * @param review
     * @return
     * @throws FailAddReviewException
     */
    public int addReview(ReviewAddDto review) throws FailAddReviewException {
        if(review.getWriterNo() == null || !checkMember.isClubMember(new CheckIsMemberDto(review.getWriterNo(), review.getClubNo()))) {
            throw new FailAddReviewException("회원만 작성 가능합니다.");
        }

        return repository.addReview(review, template);
    }
}
