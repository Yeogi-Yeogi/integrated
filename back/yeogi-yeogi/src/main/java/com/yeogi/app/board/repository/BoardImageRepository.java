package com.yeogi.app.board.repository;

import com.yeogi.app.board.vo.BoardImageFileVo;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BoardImageRepository {

    public int addImages(List<BoardImageFileVo> voList, SqlSessionTemplate template) {
        return template.insert("BoardImageMapper.addImages", voList);
    }
}
