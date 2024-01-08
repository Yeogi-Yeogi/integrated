package com.yeogi.app.notice.dto;

import com.yeogi.app.board.dto.BoardDetailDto;
import com.yeogi.app.notice.vo.ScheduleVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeDetailDto extends BoardDetailDto {
   private ScheduleVo schedule;


}
