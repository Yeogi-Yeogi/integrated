package com.yeogi.app.sample.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
public class FileSaveDto {
    private String imageUrl;
    private MultipartFile upload;
}
