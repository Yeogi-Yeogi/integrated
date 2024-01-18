package com.yeogi.app.notice.repository;

import com.yeogi.app.notice.vo.ScheduleVo;
import com.yeogi.app.util.check.CheckDto;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

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

    /**
     * 일정 등록
     * @param scheduleVo
     * @param template
     * @return
     */
    public int addSchedule(ScheduleVo scheduleVo, SqlSessionTemplate template) {
        return template.insert("ScheduleMapper.addSchedule", scheduleVo);
    }

    /**
     * 게시글 번호로 일정 삭제
     * @param boardNo
     * @param template
     */
    public int deleteSchedule(String boardNo, SqlSessionTemplate template) {
        return template.delete("ScheduleMapper.deleteByBoardNo", boardNo);
    }

    /**
     * 예정 일정 리스트
     *
     * @param dto
     * @param template
     * @param rowBounds
     * @return
     */
    public List<ScheduleVo> getUpComingListByClubNo(CheckDto dto, SqlSessionTemplate template, RowBounds rowBounds) {
        return template.selectList("ScheduleMapper.getUpComingList", dto, rowBounds);
    }

    /**
     * 지난 일정 리스트
     * @param dto
     * @param template
     * @param rowBounds
     * @return
     */
    public List<ScheduleVo> getPastListByClubNo(CheckDto dto, SqlSessionTemplate template, RowBounds rowBounds) {
        return template.selectList("ScheduleMapper.getPastList", dto, rowBounds);
    }
}
