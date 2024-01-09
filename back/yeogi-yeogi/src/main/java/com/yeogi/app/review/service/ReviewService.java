package com.yeogi.app.review.service;

import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.review.dto.ReviewAddDto;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.dto.ReviewReqDto;
import com.yeogi.app.review.repository.ReviewRepository;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.exception.FailAddReviewException;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.expression.CachedExpressionEvaluator;
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

    public List<ReviewDetailDto> getReviews(ReviewReqDto dto) throws NotClubMemberException {
        CheckDto clubMember = checkMember.isClubMember(new CheckDto(dto.getClubNo(), dto.getMemberNo()), template);
        if(!(dto.getMemberNo() != null && clubMember.getMemberNo().equals(dto.getMemberNo()))) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

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
        checkIsMember(review);
        return repository.addReview(review, template);
    }

    private void checkIsMember(ReviewAddDto review) throws FailAddReviewException {
        CheckDto clubMember = checkMember.isClubMember(new CheckDto(review.getClubNo(), review.getWriterNo()), template);
        if(!(review.getWriterNo() == null && clubMember.getMemberNo().equals(review.getWriterNo()))) {
            throw new FailAddReviewException("모임에 가입한 회원만 이용 가능합니다");
        }
    }
}
