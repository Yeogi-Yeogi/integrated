package com.yeogi.app.notice.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ScheduleVo {
    private String scheduleNo;
    private String boardNo;
    private String clubNo;
    private String title;
    private String startTime;
    private String location;
}
