package com.yeogi.app.notice.service;

import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.notice.dto.NoticeListDto;
import com.yeogi.app.notice.repository.NoticeRepository;
import com.yeogi.app.util.exception.NotClubMemberException;
import com.yeogi.app.util.valid.CheckClubMember;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository repository;
    private final SqlSessionTemplate template;
    private final CheckClubMember check;
    /**
     * 공지사항 리스트 가져오기
     *
     * @param dto
     * @param clubNo
     * @return
     */
    public List<NoticeListDto> getNoticeList(CheckIsMemberDto checkDto, String offset) throws NotClubMemberException {
        if(checkDto.getMemberNo() == null || !check.isClubMember(checkDto)) {
            throw new NotClubMemberException("회원만 이용가능합니다");
        }

        RowBounds rowBounds = new RowBounds(Integer.parseInt(offset) * 10, 15);
        return null;
    }
}
