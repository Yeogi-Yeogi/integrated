package com.yeogi.app.util.check;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CheckMemberAuthorityDto {
    private List<String> memberNoList;
    private String clubNo;
}
