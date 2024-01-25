package com.yeogi.app.club.service;

import com.yeogi.app.club.dao.ClubDao;
import com.yeogi.app.club.dto.*;
import com.yeogi.app.club.vo.CheckClubLimitVo;
import com.yeogi.app.club.vo.ClubCategoryVo;
import com.yeogi.app.club.vo.ClubMemberVo;
import com.yeogi.app.club.vo.ClubVo;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.exception.DeletedClubException;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLIntegrityConstraintViolationException;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ClubService {

    private final ClubDao dao;
    private final SqlSessionTemplate sst;
    private final ClubImageService imgService;
    private final CheckClubMember checkClubMember;

    public List<ClubVo> searchClub(String searchText) {
        return dao.searchClub(searchText, sst);
    }


    public int createClub(MultipartFile file, CreateClubDto createClubDto, String type) throws IOException {

        int result = dao.createClub(createClubDto, sst);

        int clubMasterResult = 0;
        // 글자수제한 관련
        if(result == 1){
            // 클럽에 insert 성공하면 클럽이미지에 insert

            ClubImageDto clubImageDto = new ClubImageDto();
            clubImageDto.setNo(createClubDto.getCreatorNo());
            int imgInsert = imgService.uploadFile(clubImageDto, file, sst, type);
            if(imgInsert == 1){
                // ...?뭐하지
            }
            log.info("createClubDto = {}", createClubDto);
            log.info("result = {}", result);

            clubMasterResult = dao.insertClubMaster(createClubDto, sst);
        }

        int seqNo = 0;
        if(clubMasterResult == 1){
            seqNo = dao.getSeqNo(sst);
        }

        // 클럽장 insert 후 결과 리턴
        return seqNo;
    }

    public ClubVo getClubDescription(String clubNo) {
        return dao.getClubDescription(sst, clubNo);
    }

    public int joinClub(JoinClubDto dto) {
        CheckClubLimitVo limit = dao.checkLimit(sst, dto);
        log.info("limit : {}", limit);
        // 클럽 가입 연령 체크 가입연령 안되면 2 리턴
        if(limit.getAge() < limit.getAgeLimit()){
            return 2;
            // 모임 가입 인원이 제한보다 큰 경우 3 리턴
        }  else if (limit.getMembers() >= limit.getMemberLimit()) {
            return 3;
        } else {
            try {
                int result = dao.joinClub(sst, dto);
                return result;
            } catch (DataIntegrityViolationException e) {
                // 중복 가입 시도시 4 리턴
                return 4;
            }
        }
    }

    public int editClub(EditClubDto editClubDto, MultipartFile file) throws IOException {
        // 클럽 이미지
        if(file != null) {
            String type = "update";
            ClubImageDto clubImageDto = new ClubImageDto();
            clubImageDto.setNo(editClubDto.getClubNo());
            // 대표이미지 수정시 이미지 파일 삭제 후 => 파일업로드 + db 업데이트
            // 결과 받아서 처리할게 있나..?
            int imageResult = imgService.uploadFile(clubImageDto, file, sst, type);
        }
        return  dao.editClub(sst, editClubDto);
    }

    public int editClubMember(EditClubMemberDto editClubMemberDto) {
        return dao.editClubMember(sst, editClubMemberDto);
    }

    public String checkClubName(String clubName) {
        return dao.checkClubName(sst, clubName);
    }

    public ClubVo getClubInfo(String no) {
        return dao.getClubInfo(sst, no);
    }

    public List<ClubMemberVo> getClubMemberList(String clubNo) {
        return dao.getClubMemberList(sst, clubNo);
    }

    public int quitClub(EditClubMemberDto editClubMemberDto) {
        return dao.quitClub(sst, editClubMemberDto);
    }

    public int deleteClub(String clubNo) {
        return dao.deleteClub(sst, clubNo);
    }

    public CheckDto checkMember(CheckDto checkDto) throws NotClubMemberException, DeletedClubException {
        return checkClubMember.isClubMember(checkDto, sst);
    }

    public List<ClubCategoryVo> getCategoryName() {
        return dao.getCategoryName(sst);
    }

    public List<ClubVo> getClubList() {
        return dao.getClubList(sst);
    }
}
