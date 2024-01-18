package com.yeogi.app.notice.dto;

import com.yeogi.app.notice.vo.ScheduleVo;
import lombok.Builder;
import lombok.Getter;

import java.util.List;


@Getter
@Builder
public class ScheduleListDto {
    private List<ScheduleVo> list;
    private boolean isAdmin = false;
}
