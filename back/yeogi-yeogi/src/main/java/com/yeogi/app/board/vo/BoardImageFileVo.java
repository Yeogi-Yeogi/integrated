package com.yeogi.app.board.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BoardImageFileVo {
    private String no;
    private String boardNo;
    private String fileUrl;
    private String fileName;

    public BoardImageFileVo(String boardNo, String fileUrl, String fileName) {
        this.boardNo = boardNo;
        this.fileUrl = fileUrl;
        this.fileName = fileName;
    }
}
