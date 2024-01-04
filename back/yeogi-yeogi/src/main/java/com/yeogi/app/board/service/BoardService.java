package com.yeogi.app.board.service;

import com.yeogi.app.board.dto.BoardDetailDto;
import com.yeogi.app.board.dto.BoardDetailValidDto;
import com.yeogi.app.board.dto.BoardListDto;
import com.yeogi.app.board.repository.BoardRepository;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.repository.ReviewRepository;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.NoResultException;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    private final ReviewRepository reviewRepository;
    private final SqlSessionTemplate template;

    /**
     * 게시글 리스트 가져오기
     *
     * @param clubNo
     * @param pageNo
     * @return
     */
    public List<BoardListDto> getBoardListByClubNo(String clubNo, String pageNo) {
        RowBounds rowBounds = new RowBounds(Integer.parseInt(pageNo), 10);
        return boardRepository.getBoardListByClubNo(clubNo, template, rowBounds);
    }

    /**
     * 게시글 상세 조회
     * @param valid
     * @return
     */
    public BoardDetailDto getOneByBoardNo(BoardDetailValidDto valid) {

        //게시글 가져오기
        BoardDetailDto findBoard =  boardRepository.getBoardByBoardNo(valid, template);
        if(findBoard == null) {
            throw new NoResultException("게시글이 존재하지 않습니다");
        }
        //리뷰 10개씩 가져오기
        RowBounds rowBounds = new RowBounds(0, 10);
        List<ReviewDetailDto> reviewList = reviewRepository.getReviewListByBoardNo(valid.getBoardNo(), template, rowBounds);

        return findBoard;
    }
}
