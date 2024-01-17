package com.yeogi.app.gallery.repository;

import com.yeogi.app.board.dto.BoardListFileUrlDto;
import com.yeogi.app.util.check.CheckDto;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GalleryRepository {

    /**
     * 갤러리 리스트 가져오기
     * @param dto
     * @param template
     * @param rowBounds
     * @return
     */
    public List<BoardListFileUrlDto> getImageListByClubNo(CheckDto dto, SqlSessionTemplate template, RowBounds rowBounds) {
        return template.selectList("GalleryMapper.getImageListByClubNo", dto, rowBounds);
    }
}
