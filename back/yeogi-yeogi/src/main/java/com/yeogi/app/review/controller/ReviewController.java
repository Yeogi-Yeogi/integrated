package com.yeogi.app.review.controller;

import com.yeogi.app.review.dto.ReviewAddDto;
import com.yeogi.app.review.dto.ReviewValidDto;
import com.yeogi.app.review.dto.ReviewReqDto;
import com.yeogi.app.review.service.ReviewService;
import com.yeogi.app.util.exception.FailReviewException;

import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
@CrossOrigin("*")
public class ReviewController{
    private final ReviewService service;

    /**
     * 렌더링 이후 리뷰 가져오는 경로
     * @param dto
     * @return
     */
    @GetMapping("/list/{offset}")
    public ResponseEntity<Map<String, Object>> getMoreReviews(ReviewReqDto dto, @PathVariable String offset) throws NotClubMemberException {
        HttpHeaders headers = getHttpHeaders();
        return new ResponseEntity<>(service.getReviews(dto, offset), headers, HttpStatus.OK);
    }

    /**
     * 리뷰 작성
     * @param review
     * @return
     * @throws FailReviewException
     */
    @PostMapping("/add")
    public ResponseEntity<String> addReview(@RequestBody ReviewAddDto review) throws FailReviewException, NotClubMemberException {
        log.info("review = {}", review);
        int result = service.addReview(review);

        if(result != 1) throw new FailReviewException("댓글 작성 실패");

        HttpHeaders headers = getHttpHeaders();
        return new ResponseEntity<>("댓글을 등록하였습니다.", headers, HttpStatus.OK);
    }

    /**
     * 리뷰 삭제
     * @param review
     * @return
     */
    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteReview(@RequestBody ReviewValidDto review) throws NotClubMemberException, FailReviewException {
        log.info("review = {}", review);
        int result = service.deleteReviewByNo(review);

        if(result != 1) {
            throw new FailReviewException("댓글 삭제 실패");
        }
        return new ResponseEntity<>("댓글을 삭제했습니다.", getHttpHeaders(), HttpStatus.OK);
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return headers;
    }

}
