package com.yeogi.app.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardListFileUrlDto {
    private String boardImageNo;
    private String boardNo;
    private String fileUrl;
}
