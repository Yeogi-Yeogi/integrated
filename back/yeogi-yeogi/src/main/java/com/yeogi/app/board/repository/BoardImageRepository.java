package com.yeogi.app.board.repository;

import com.yeogi.app.board.vo.BoardImageFileVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class BoardImageRepository {

    public int addImages(BoardImageFileVo list, SqlSessionTemplate template) {
        return template.insert("BoardImageMapper.addImages", list);
    }


}
