package com.yeogi.app.notice.dto;

import com.yeogi.app.board.vo.BoardVo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NoticeAddDto{
    private String clubNo;
    private String memberNo;
    private String title;
    private String content;
    private List<MultipartFile> imageList;
    private String noticeYn;
    private String scheduleTitle;
    private String scheduleDate;
    private String scheduleLocation;
}
