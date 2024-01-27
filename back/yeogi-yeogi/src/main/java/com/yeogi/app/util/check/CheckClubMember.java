package com.yeogi.app.util.check;

import com.yeogi.app.club.dao.ClubDao;
import com.yeogi.app.util.exception.DeletedClubException;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Configuration
@Transactional
@RequiredArgsConstructor
public class CheckClubMember {

    private final ClubDao clubRepository;


    /**
     * 모임에 가입한 사람인지 검사하는 로직
     * & 회원 한명의 권한 등급 확인
     * @param dto
     * @return
     */
    public CheckDto isClubMember(CheckDto dto, SqlSessionTemplate template) throws NotClubMemberException {
        if(!(dto != null && dto.getClubNo() != null && dto.getMemberNo() != null)) {
            throw new NotClubMemberException("회원 전용 서비스입니다. 로그인하세요.");
        }
        CheckDto checkDto = clubRepository.checkIsClubMember(dto, template);
        if(checkDto.getDelYn().equals("Y")) {
            throw new DeletedClubException("삭제된 클럽입니다");
        }
        return checkDto;

    }

    /**
     * 여러 회원의 권한 목록 조회
     * @param memberNoList
     * @param template
     * @return
     */
    public List<CheckDto> getAuthorites(CheckMemberAuthorityDto memberNoList, SqlSessionTemplate template) {
        return template.selectList("ClubMapper.getAuthorityByMemberNo", memberNoList);
    }
}
