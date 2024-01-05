package com.yeogi.app.board.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckIsMemberDto {
    private String memberNo;
    private String clubNo;
}
