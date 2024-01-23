package com.yeogi.app.notice.service;


import com.yeogi.app.notice.dto.ScheduleListDto;
import com.yeogi.app.notice.repository.ScheduleRepository;
import com.yeogi.app.notice.vo.ScheduleVo;
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
public class ScheduleService {

    private final ScheduleRepository repository;
    private final CheckClubMember checkMember;
    private final SqlSessionTemplate template;


    public ScheduleListDto getListByClubNo(CheckDto dto, String isExpected, int offset) throws RuntimeException {

        CheckDto clubMember = checkMember.isClubMember(dto, template);

        if(!clubMember.getMemberNo().equals(dto.getMemberNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        int boardLimit = 6;
        RowBounds rowBounds = new RowBounds(offset * boardLimit, boardLimit);


        List<ScheduleVo> list = null;
        //예정에 해당하는 리스트
        if(isExpected.equals("Y")) {
            list = repository.getUpComingListByClubNo(dto, template, rowBounds);
        } else {
            list = repository.getPastListByClubNo(dto, template, rowBounds);
        }

        if(!(clubMember.getAdminYn().equals("N") && clubMember.getCreatorYn().equals("N"))) {
            return ScheduleListDto.builder()
                    .list(list)
                    .isAdmin(true)
                    .build();
        } else {
            return ScheduleListDto.builder()
                    .list(list)
                    .build();
        }
    }
}
