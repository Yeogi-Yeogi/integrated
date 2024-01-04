package com.yeogi.app.board.repository;

import com.yeogi.app.board.dto.BoardDetailDto;
import com.yeogi.app.board.dto.BoardDetailValidDto;
import com.yeogi.app.board.dto.BoardListDto;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BoardRepository {

    /**
     * 게시글 리스트 조회
     * @param clubNo
     * @param template
     * @param rowBounds
     * @return
     */
    public List<BoardListDto> getBoardListByClubNo(String clubNo, SqlSessionTemplate template, RowBounds rowBounds) {
        return template.selectList("BoardMapper.getBoardListByClubNo", clubNo, rowBounds);
    }

    /**
     * 게시글 상세 조회
     *
     * @param boardNo
     * @param template
     * @return
     */
    public BoardDetailDto getBoardByBoardNo(BoardDetailValidDto boardNo, SqlSessionTemplate template) {
        return template.selectOne("BoardMapper.getBoardByBoardNo", boardNo);
    }
}
