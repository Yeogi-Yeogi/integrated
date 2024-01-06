package com.yeogi.app.club.vo;

import lombok.Data;
import org.apache.ibatis.type.Alias;


@Data
@Alias("ClubVo")
public class ClubVo {

   private String no;
   private String name;
   private String categoryNo;
   private String creatorNo;
   private String nick; // 모임장 닉네임
   private String categoryName;
   private String clubDescription;
   private String ageLimit;
   private String signupLimit;
   private String enrollDate;
   private String delYn;
   private String fileUrl;
   private String memberCount;
}
