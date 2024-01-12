package com.yeogi.app.board.repository;

import com.yeogi.app.board.dto.*;
import com.yeogi.app.notice.dto.NoticeDetailDto;
import com.yeogi.app.notice.dto.NoticeListDto;
import com.yeogi.app.util.check.CheckDto;
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

    /**
     * 상세 조회에 필요한 이미지 가져오기
     * @param boardNo
     * @param template
     * @return
     */
    public List<BoardListFileUrlDto> getImagesByBoardNo(String boardNo, SqlSessionTemplate template) {
        return template.selectList("BoardMapper.getImagesByBoardNo", boardNo);
    }

    /**
     * 게시글 작성
     * @param dto
     * @param template
     * @return
     */
    public int addBoard(BoardAddDto dto, SqlSessionTemplate template) {
        return template.insert("BoardMapper.addBoard", dto);
    }

    /**
     * 최근에 작성한 게시글 번호 가져오기
     * @param memberNo
     * @param template
     * @return
     */
    public String getNoByMemberNo(BoardAddDto memberNo, SqlSessionTemplate template) {
        return template.selectOne("BoardMapper.getNoByMemberNo", memberNo);
    }

    /**
     * 공지사항 리스트 가져오기
     *
     * @param template
     * @param clubMember
     * @param rowBounds
     * @return
     */
    public List<NoticeListDto> getNoticeList(SqlSessionTemplate template, CheckDto clubMember, RowBounds rowBounds) {
        return template.selectList("BoardMapper.getNoticeList", clubMember, rowBounds);
    }

    /**
     * 공지사항 상세조회
     * @param dto
     * @param template
     * @return
     */
    public NoticeDetailDto getOne(BoardDetailValidDto dto, SqlSessionTemplate template) {
        return template.selectOne("BoardMapper.getNoticeOne", dto);
    }

    /**
     * 게시글 번호로 게시글 삭제
     *
     * @param BoardNo
     * @param template
     */
    public void deleteBoardByNo(String BoardNo, SqlSessionTemplate template) {
        template.delete("BoardMapper.deleteBoardByNo", BoardNo);
    }

    /**
     * 공지사항 전체 개수(페이징용)
     * @return
     */
    public int getTotalCount(String clubNo, SqlSessionTemplate template) {
        return Integer.parseInt(template.selectOne("BoardMapper.getTotalCount", clubNo));
    }
}
