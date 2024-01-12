package com.yeogi.app.notice.dto;

import com.yeogi.app.util.page.PageVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeListDto {
    private String noticeNo;
    private String memberName;
    private String title;
    private String hit;
    private String enrollDate;

}
