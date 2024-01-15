package com.yeogi.app.util.exception.advice;

import com.yeogi.app.util.exception.ErrorResult;
import com.yeogi.app.util.exception.FailAddReviewException;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.extern.slf4j.Slf4j;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import javax.persistence.NoResultException;


@RestControllerAdvice
@Slf4j
public class ExceptionAdvice extends ResponseEntityExceptionHandler {

    /**
     * 모임에 가입한 회원이 아닐 경우
     * @param e
     * @return
     */
    @ExceptionHandler(value = NotClubMemberException.class)
    public ResponseEntity<ErrorResult> handleErrorNotMember(NotClubMemberException e) {
        e.printStackTrace();
        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());

        return new ResponseEntity<>(response, null, HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(value = IllegalStateException.class)
    public ResponseEntity<ErrorResult> handleIOE(IllegalStateException e) {
        e.printStackTrace();
        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.INTERNAL_SERVER_ERROR.ordinal());
        response.setMessage(e.getMessage());

        return new ResponseEntity<>(response, null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 게시글 상세조회 실패 시 오류
     * @param e
     * @return
     */
    @ExceptionHandler(value = NoResultException.class)
    public ResponseEntity<ErrorResult> handleErrorNoResult(NoResultException e) {
        e.printStackTrace();
        ErrorResult response = new ErrorResult();
        response.setCode(HttpStatus.BAD_REQUEST.value());
        response.setMessage(e.getMessage());

        return new ResponseEntity<>(response, null, HttpStatus.NOT_FOUND);
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
