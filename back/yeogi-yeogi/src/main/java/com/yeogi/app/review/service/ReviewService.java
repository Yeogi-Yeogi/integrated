package com.yeogi.app.review.service;

import com.yeogi.app.review.dto.ReviewAddDto;
import com.yeogi.app.review.dto.ReviewValidDto;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.dto.ReviewReqDto;
import com.yeogi.app.review.repository.ReviewRepository;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.exception.FailReviewException;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository repository;
    private final CheckClubMember checkMember;
    private final SqlSessionTemplate template;

    /**
     * 리뷰 조회
     * @param dto
     * @return
     * @throws NotClubMemberException
     */
    public Map<String, Object> getReviews(ReviewReqDto dto, String offset) throws NotClubMemberException {

        CheckDto clubMember = checkMember.isClubMember(new CheckDto(dto.getClubNo(), dto.getMemberNo()), template);
        if(!clubMember.getMemberNo().equals(dto.getMemberNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        int count = repository.getReviewCountByBoardNo(dto.getBoardNo(), template);
        int reviewLimit = 10;
        int i = Integer.parseInt(offset);

        Map<String, Object> map = new HashMap<>();

        if( (int) Math.ceil((double)count/reviewLimit) == (i+1)) {
            map.put("isLast", true);
        } else {
            map.put("isLast", false);
        }

        RowBounds rowBounds = new RowBounds(i * reviewLimit, reviewLimit);
        List<ReviewDetailDto> reviews = repository.getReviewListByBoardNo(dto.getBoardNo(), template, rowBounds);

        map.put("list", reviews);
        return map;
    }

    /**
     * 리뷰 작성
     * @param review
     * @return
     * @throws FailReviewException
     */
    public int addReview(ReviewAddDto review) throws FailReviewException, NotClubMemberException {
        CheckDto clubMember = checkMember.isClubMember(new CheckDto(review.getClubNo(), review.getWriterNo()), template);
        if(!clubMember.getMemberNo().equals(review.getWriterNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }
        return repository.addReview(review, template);
    }

    /**
     * 댓글 삭제
     * @param review
     * @return
     */
    public int deleteReviewByNo(ReviewValidDto review) throws NotClubMemberException, FailReviewException {
        CheckDto clubMember = checkMember.isClubMember(new CheckDto(review.getClubNo(), review.getWriterNo()), template);

        if(!clubMember.getMemberNo().equals(review.getWriterNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        String findReviewNo = repository.getNoByWriterNo(review, template);

        if(!(findReviewNo != null && findReviewNo.equals(review.getReviewNo()))) {
            throw new FailReviewException("자신이 작성한 것만 삭제가 가능합니다.");
        }
        log.info("지울 리뷰 번호 = {} , DB에서 가져온 리뷰 번호 = {}", review.getReviewNo(), findReviewNo);
        int result = repository.deleteByNo(findReviewNo, template);
        return result;
    }
}
