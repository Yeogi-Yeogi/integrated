package com.yeogi.app.notice.repository;

import com.yeogi.app.notice.vo.ScheduleVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class ScheduleRepository {
    /**
     * 공지사항에 있는 게시글 가져오기
     * @param boardNo
     * @param template
     * @return
     */
    public ScheduleVo getScheduleByBoardNo(String boardNo, SqlSessionTemplate template) {
        return  template.selectOne("ScheduleMapper.getScheduleByBoardNo", boardNo);
    }
}
