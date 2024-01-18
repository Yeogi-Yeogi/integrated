package com.yeogi.app.review.repository;

import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.review.dto.ReviewAddDto;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.dto.ReviewValidDto;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ReviewRepository {
    public List<ReviewDetailDto> getReviewListByBoardNo(String boardNo, SqlSessionTemplate template, RowBounds rowBounds) {
        return template.selectList("ReviewMapper.getReviewListByBoardNo", boardNo, rowBounds);
    }



    /**
     * 리뷰 작성
     * @param review
     * @param template
     * @return
     */
    public int addReview(ReviewAddDto review, SqlSessionTemplate template) {
        return template.insert("ReviewMapper.addReview", review);
    }

    public int getReviewCountByBoardNo(String boardNo, SqlSessionTemplate template) {
        return Integer.parseInt(template.selectOne("ReviewMapper.getReviewCountByBoardNo", boardNo));
    }

    /**
     * 리뷰 번호 가져오기
     * @param review
     * @param template
     * @return
     */
    public String getNoByWriterNo(ReviewValidDto review, SqlSessionTemplate template) {
        return template.selectOne("ReviewMapper.getNoByWriterNo", review);
    }

    public int deleteByNo(String findReviewNo, SqlSessionTemplate template) {
        return template.delete("ReviewMapper.deleteByNo", findReviewNo);
    }
}
