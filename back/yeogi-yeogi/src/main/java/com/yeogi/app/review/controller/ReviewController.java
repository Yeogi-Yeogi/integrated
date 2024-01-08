package com.yeogi.app.review.controller;

import com.yeogi.app.review.dto.ReviewAddDto;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.dto.ReviewReqDto;
import com.yeogi.app.review.service.ReviewService;
import com.yeogi.app.review.vo.ReviewVo;
import com.yeogi.app.util.exception.ErrorResult;
import com.yeogi.app.util.exception.FailAddReviewException;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.Charset;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/review")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService service;

    /**
     * 렌더링 이후 리뷰 가져오는 경로
     * boardNo 가져와야 된다.
     * @param dto
     * @return
     */
    @GetMapping("/list")
    public ResponseEntity<List<ReviewDetailDto>> getMoreReviews(ReviewReqDto dto) {
        HttpHeaders headers = getHttpHeaders();
        return new ResponseEntity<>(service.getReviews(dto), headers, HttpStatus.OK);
    }

    /**
     * 리뷰 작성
     * @param review
     * @return
     * @throws FailAddReviewException
     */
    @PostMapping("/add")
    public ResponseEntity<String> addReview(@RequestBody ReviewAddDto review) throws FailAddReviewException {
        int result = service.addReview(review);

        if(result != 1) throw new FailAddReviewException("리뷰 작성 실패");

        HttpHeaders headers = getHttpHeaders();
        return new ResponseEntity<>("작성되었습니다", headers, HttpStatus.OK);
    }

    private HttpHeaders getHttpHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "json", Charset.forName("UTF-8")));
        return headers;
    }

    /**
     * 리뷰 작성 실패 시
     * @param e
     * @return
     */
    @ExceptionHandler(value = FailAddReviewException.class)
    public ResponseEntity<ErrorResult> handleErrorFailAddReview(FailAddReviewException e) {
        e.printStackTrace();
        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());

        return new ResponseEntity<>(response, null, HttpStatus.BAD_REQUEST);
    }
}
