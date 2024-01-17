package com.yeogi.app.gallery.service;

import com.yeogi.app.board.dto.BoardListFileUrlDto;
import com.yeogi.app.gallery.dto.GalleryListDto;
import com.yeogi.app.gallery.repository.GalleryRepository;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository repository;
    private final SqlSessionTemplate template;

    private final CheckClubMember check;

    /**
     * 갤러리 사진 가져오기
     * @param dto
     * @param pageNo
     * @return
     */
    public GalleryListDto getList(CheckDto dto, String pageNo) throws NotClubMemberException {
        CheckDto checkMember = checkMember(dto.getClubNo(), dto.getMemberNo());

        int galleryLimit = 12;
        RowBounds rowBounds = new RowBounds(Integer.parseInt(pageNo) * galleryLimit, galleryLimit);

        List<BoardListFileUrlDto> imageList = repository.getImageListByClubNo(dto, template, rowBounds);
        return null;
    }

    /**
     * 회원 검사
     * @param clubNo
     * @param memberNo
     * @return
     * @throws NotClubMemberException
     */
    private CheckDto checkMember(String clubNo, String memberNo) throws NotClubMemberException {
        CheckDto checkDto = new CheckDto(clubNo, memberNo);
        CheckDto clubMember = check.isClubMember(checkDto,template);
        if(!clubMember.getMemberNo().equals(checkDto.getMemberNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }
        return clubMember;
    }
}
