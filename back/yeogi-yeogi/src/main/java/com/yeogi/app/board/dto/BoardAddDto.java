package com.yeogi.app.board.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.Lob;
import java.util.List;

@Data
@NoArgsConstructor
public class BoardAddDto {
    private String title;
    private Lob content;
    private List<MultipartFile> imageList;
}
