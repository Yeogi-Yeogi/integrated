package com.yeogi.app.board.repository;

import com.yeogi.app.board.dto.BoardDetailDto;
import com.yeogi.app.board.dto.BoardDetailValidDto;
import com.yeogi.app.board.dto.BoardListDto;
import com.yeogi.app.board.dto.BoardListFileUrlDto;
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
    public List<BoardListDto> getBoardListIgnoreFileUrl(String clubNo, SqlSessionTemplate template, RowBounds rowBounds) {
        return template.selectList("BoardMapper.getBoardListIgnoreFileUrl", clubNo, rowBounds);
    }

    /**
     * 게시글 간편 조회(사진 가져오기)
     * @param collect
     * @param template
     */
    public List<BoardListFileUrlDto> getFileUrlByBoardNo(List<String> collect, SqlSessionTemplate template) {
        return template.selectList("BoardMapper.getFileUrlByBoardNo", collect);
    }

    /**
     * 게시글 상세 조회
     *
     * @param valid
     * @param template
     * @return
     */
    public BoardDetailDto getBoardByBoardNo(BoardDetailValidDto valid, SqlSessionTemplate template) {
        return template.selectOne("BoardMapper.getBoardByBoardNo", valid);
    }


    public List<BoardListFileUrlDto> getImagesByBoardNo(String boardNo, SqlSessionTemplate template) {
        return template.selectList("BoardMapper.getImagesByBoardNo", boardNo);
    }
}
