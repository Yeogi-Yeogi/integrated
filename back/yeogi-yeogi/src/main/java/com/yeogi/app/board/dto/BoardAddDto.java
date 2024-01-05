package com.yeogi.app.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardAddDto {
    private String clubNo;
    private String memberNo;
    private String title;
    private String content;
    private List<MultipartFile> imageList;
}
