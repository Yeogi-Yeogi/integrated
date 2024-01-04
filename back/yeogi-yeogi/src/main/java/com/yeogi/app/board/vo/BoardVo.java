package com.yeogi.app.board.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardVo {
    private String no;
    private String clubNo;
    private String memberNo;
    private String content;
    private String hit;
    private String enrollDate;
    private String modifyDate;
    private String delYn;
    private String noticeYn;
}
