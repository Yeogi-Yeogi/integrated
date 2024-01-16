package com.yeogi.app.board.repository;

import com.yeogi.app.board.vo.BoardImageFileVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BoardImageRepository {

    public int addImages(BoardImageFileVo vo, SqlSessionTemplate template) {
        return template.insert("BoardImageMapper.addImages", vo);
    }


    /**
     * 삭제용 이미지 리스트 가져오기
     * @param recentNo
     * @param template
     * @return
     */
    public List<BoardImageFileVo> getListByBoardNo(String recentNo, SqlSessionTemplate template) {
        return template.selectList("BoardImageMapper.getListByBoardNo", recentNo);
    }

    /**
     * 번호로 게시글 삭제
     * @param boardNo
     * @param template
     */
    public int deleteByBoardNo(String boardNo, SqlSessionTemplate template) {
        return template.delete("BoardImageMapper.deleteByBoardNo", boardNo);
    }
}
