package com.yeogi.app.util.check;

import com.yeogi.app.club.dao.ClubDao;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

@Configuration
@Transactional
@RequiredArgsConstructor
public class CheckClubMember {

    private final ClubDao clubRepository;


    /**
     * 모임에 가입한 사람인지 검사하는 로직
     * @param dto
     * @return
     */
    public CheckDto isClubMember(CheckDto dto, SqlSessionTemplate template) throws NotClubMemberException {
        if(!(dto != null && dto.getClubNo() != null && dto.getMemberNo() != null)) {
            throw new NotClubMemberException("모임에 가입한 사람만 이용 가능합니다");
        }
        return clubRepository.checkIsClubMember(dto, template);

    }

    /**
     * 클럽이 삭제됐는 지 여부 체크
     *
     * @param clubNo
     * @param template
     * @return
     */
    public boolean isDeleted(String clubNo, SqlSessionTemplate template) {
        return clubRepository.isDeleted(clubNo, template).equals("Y");
    }
}
