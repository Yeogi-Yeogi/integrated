package com.yeogi.app.gallery.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GalleryListDto {
    private String boardImageNo;
    private String boardNo;
    private String fileUrl;
    private String noticeYn;
    private boolean isNotice;
}
