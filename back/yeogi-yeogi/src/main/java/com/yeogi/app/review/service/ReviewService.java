package com.yeogi.app.review.service;

import com.yeogi.app.board.service.BoardImageService;
import com.yeogi.app.review.dto.ReviewAddDto;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.dto.ReviewReqDto;
import com.yeogi.app.review.dto.ReviewValidDto;
import com.yeogi.app.review.repository.ReviewRepository;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.check.CheckMemberAuthorityDto;
import com.yeogi.app.util.exception.FailReviewException;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReviewService {
    private final ReviewRepository repository;
    private final BoardImageService imageService;
    private final CheckClubMember checkMember;
    private final SqlSessionTemplate template;

    /**
     * 리뷰 조회
     * @param dto
     * @return
     * @throws NotClubMemberException
     */
    public Map<String, Object> getReviews(ReviewReqDto dto, String offset) throws RuntimeException {

        CheckDto clubMember = checkMember.isClubMember(new CheckDto(dto.getClubNo(), dto.getMemberNo()), template);
        if(!clubMember.getMemberNo().equals(dto.getMemberNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        int count = repository.getReviewCountByBoardNo(dto.getBoardNo(), template);
        int reviewLimit = 10;
        int i = Integer.parseInt(offset);

        Map<String, Object> map = new HashMap<>();
        log.info("(int) Math.ceil((double)count/reviewLimit) = {},  i = {}", (int) Math.ceil((double)count/reviewLimit), i);
        if (i >= (int) Math.ceil((double) count / reviewLimit) - 1) {
            map.put("isLast", true);
        } else {
            map.put("isLast", false);
        }

        RowBounds rowBounds = new RowBounds(i * reviewLimit, reviewLimit);
        List<ReviewDetailDto> reviews = repository.getReviewListByBoardNo(dto.getBoardNo(), template, rowBounds);

        if(reviews.size() > 0) {
            List<String> memberNoList = reviews.stream().map(r -> r.getMemberNo()).distinct().collect(Collectors.toList());
            log.info("memberNoList = {}", memberNoList);
            List<CheckDto> authoritesDto = checkMember.getAuthorites(new CheckMemberAuthorityDto(memberNoList, dto.getClubNo()), template);

            for(CheckDto check : authoritesDto) {
                reviews.stream().filter(r -> r.getMemberNo().equals(check.getMemberNo()))
                        .forEach(r -> {
                            if(check.getCreatorYn().equals("Y")) {
                                r.setCreatorYn(true);
                                r.setAdminYn(true);
                            } else if(check.getCreatorYn().equals("N") && check.getAdminYn().equals("Y")) {
                                r.setAdminYn(true);
                            }

                            //이미지 서버에 저장된 파일이 아닐 경우
                            if(!r.getMemberProfile().startsWith("https://")) {
                                try {
                                    r.setMemberProfile(imageService.getBoardImageByBytes(r.getMemberProfile()));
                                } catch (IOException ex) {
                                    throw new RuntimeException(ex);
                                }
                            }
                        });
            }
        }

        map.put("list", reviews);
        return map;
    }

    /**
     * 리뷰 작성
     * @param review
     * @return
     * @throws FailReviewException
     */
    public int addReview(ReviewAddDto review) throws RuntimeException {
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
    public int deleteReviewByNo(ReviewValidDto review) throws RuntimeException {
        CheckDto clubMember = checkMember.isClubMember(new CheckDto(review.getClubNo(), review.getWriterNo()), template);

        if(!clubMember.getMemberNo().equals(review.getWriterNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        String findReviewNo = repository.getNoByWriterNo(review, template);

        if(!(findReviewNo != null && findReviewNo.equals(review.getReviewNo()))) {
            throw new FailReviewException("자신이 작성한 댓글만 삭제가 가능합니다.");
        }
        log.info("지울 리뷰 번호 = {} , DB에서 가져온 리뷰 번호 = {}", review.getReviewNo(), findReviewNo);
        int result = repository.deleteByNo(findReviewNo, template);
        return result;
    }
}
