package com.yeogi.app.notice.service;

import com.yeogi.app.board.dto.BoardDetailValidDto;
import com.yeogi.app.board.dto.BoardListFileUrlDto;
import com.yeogi.app.board.repository.BoardRepository;
import com.yeogi.app.board.service.BoardImageService;
import com.yeogi.app.board.vo.BoardImageFileVo;
import com.yeogi.app.notice.dto.NoticeAddDto;
import com.yeogi.app.notice.dto.NoticeDetailDto;
import com.yeogi.app.notice.dto.NoticeListDto;
import com.yeogi.app.notice.repository.ScheduleRepository;
import com.yeogi.app.notice.vo.ScheduleVo;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.check.CheckMemberAuthorityDto;
import com.yeogi.app.util.exception.NotAdminException;
import com.yeogi.app.util.exception.NotClubMemberException;
import com.yeogi.app.util.page.PageVo;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {


    private final BoardImageService imageService;
    private final BoardRepository boardRepository;
    private final ScheduleRepository scheduleRepository;
    private final SqlSessionTemplate template;
    private final CheckClubMember check;

    /**
     * 공지사항 리스트 가져오기
     *
     * @param pageNo
     * @param checkDto
     * @return
     */
    public Map<String, Object> getNoticeList(CheckDto checkDto, String pageNo) throws RuntimeException {

        CheckDto clubMember = checkMember(checkDto.getClubNo(), checkDto.getMemberNo());

        int totalCount = boardRepository.getTotalCount(clubMember.getClubNo(), template);
        int pno = Integer.parseInt(pageNo);
        int boardLimit = 15; //페이징 개수
        PageVo pageVo = new PageVo(totalCount, pno, 5, boardLimit);

        RowBounds rowBounds = new RowBounds((pno-1) * boardLimit, boardLimit);
        List<NoticeListDto> noticeList = boardRepository.getNoticeList(template, clubMember, rowBounds);

        List<String> memberNoList = noticeList.stream().map(n -> n.getMemberNo()).collect(Collectors.toList());

        List<CheckDto> authoritesDto = check.getAuthorites(new CheckMemberAuthorityDto(memberNoList, checkDto.getClubNo()), template);

        for(CheckDto c : authoritesDto) {
            noticeList.stream().filter(n -> n.getMemberNo().equals(c.getMemberNo()))
                    .forEach(n -> {
                        if(c.getCreatorYn().equals("Y")) {
                            n.setCreatorYn(true);
                            n.setAdminYn(true);
                        } else if(c.getCreatorYn().equals("N") && c.getAdminYn().equals("Y")) {
                            n.setAdminYn(true);
                        }

                    });

        }
        Map<String, Object> resultMap =  new HashMap<>();
        resultMap.put("list", noticeList);
        resultMap.put("pageVo", pageVo);

        if(clubMember.getCreatorYn().equals("Y")) {
            resultMap.put("creatorYn", true);
            resultMap.put("adminYn", true);
        } else if(clubMember.getCreatorYn().equals("N") && clubMember.getAdminYn().equals("Y")) {
            resultMap.put("creatorYn", false);
            resultMap.put("adminYn", true);
        } else {
            resultMap.put("creatorYn", false);
            resultMap.put("adminYn", false);
        }
        return resultMap;
    }

    /**
     * 공지사항 상세 조회
     * (내가 작성했는지 로직 추가 필요)
     * @param dto
     * @return
     * @throws NotClubMemberException
     */
    public NoticeDetailDto getOne(BoardDetailValidDto dto) throws RuntimeException {
        CheckDto clubMember = checkMember(dto.getClubNo(), dto.getMemberNo());

        int result = boardRepository.increaseHit(dto.getBoardNo(), template);

        if(result != 1) {
            throw new IllegalStateException("해당 공지사항이 없습니다");
        }
        NoticeDetailDto findNotice = boardRepository.getOne(dto, template);
        CheckDto checkAuthorityDto = checkMember(dto.getClubNo(), findNotice.getMemberNo());

        if(checkAuthorityDto.getCreatorYn().equals("Y")) {
            findNotice.setCreatorYn(true);
            findNotice.setAdminYn(true);
        } else if(checkAuthorityDto.getCreatorYn().equals("N") && checkAuthorityDto.getAdminYn().equals("Y")){
            findNotice.setAdminYn(true);
        }

        if(!findNotice.getMemberProfile().startsWith("https://")) {
            try {
                findNotice.setMemberProfile(imageService.getBoardImageByBytes(findNotice.getMemberProfile()));
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }

        //스케줄 가져오기
        ScheduleVo findSchedule = scheduleRepository.getScheduleByBoardNo(findNotice.getBoardNo(), template);
        findNotice.setSchedule(findSchedule);

        List<BoardImageFileVo> list = imageService.getListByBoardNo(findNotice.getBoardNo());
        List<BoardListFileUrlDto> collect = list.stream().map(e -> new BoardListFileUrlDto(e.getNo(), e.getBoardNo(), e.getFileUrl())).collect(Collectors.toList());

        findNotice.setList(collect);
        System.out.println("findNotice = " + findNotice);

        if(findNotice.getMemberNo().equals(clubMember.getMemberNo())) {
            findNotice.setMine(true);
        }

        return findNotice;
    }

    /**
     * 공지사항 작성
     * @param notice
     * @return
     */
    public int addNotice(NoticeAddDto notice) throws RuntimeException {
        CheckDto clubMember = checkMember(notice.getClubNo(), notice.getMemberNo());

        if(!clubMember.getAdminYn().equals("Y")) {
            throw new NotAdminException("관리자만 이용 가능합니다");
        }
        int result = boardRepository.addNotice(notice, template);

        if(result != 1){
            throw new IllegalStateException("공지사항 작성에 실패하셨습니다.");
        }

        String recentNo = boardRepository.getNoByMemberNo(clubMember, template);
        //사진 등록
        List<MultipartFile> imageList = notice.getImageList();
        if(imageList != null && imageList.size() != 0) {
            result = imageService.addImages(imageList, recentNo);
        }

        //일정 등록
        if(notice.getScheduleDate() != null && notice.getScheduleTitle() != null && notice.getScheduleLocation() != null) {
            ScheduleVo scheduleVo = new ScheduleVo(recentNo, notice.getClubNo(), notice.getScheduleTitle(), notice.getScheduleDate(), notice.getScheduleLocation());
            result = scheduleRepository.addSchedule(scheduleVo, template);

            if(result != 1) {
                //게시글 삭제, 사진 삭제
                if(imageList.size() != 0) {
                    imageService.deleteImagesByBoardNo(recentNo);
                }
                boardRepository.deleteBoardByNo(recentNo, template);
                throw new IllegalStateException("공지사항 작성에 실패하셨습니다.");
            }
        }
        return result;
    }

    /**
     * 공지사항 삭제
     * (일정 -> 사진 -> 공지사항 순)
     * @param dto
     * @return
     */
    public int deleteNotice(BoardDetailValidDto dto) throws RuntimeException {
        CheckDto clubMember = checkMember(dto.getClubNo(), dto.getMemberNo());

        if(!clubMember.getAdminYn().equals("Y")) {
            throw new NotAdminException("관리자만 이용 가능합니다");
        }

        return boardRepository.deleteBoard(dto, template);
    }

    /**
     * 회원 검사
     * @param clubNo
     * @param memberNo
     * @return
     * @throws NotClubMemberException
     */
    private CheckDto checkMember(String clubNo, String memberNo) throws RuntimeException {
        CheckDto checkDto = new CheckDto(clubNo, memberNo);
        CheckDto clubMember = check.isClubMember(checkDto,template);
        if(!clubMember.getMemberNo().equals(checkDto.getMemberNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }
        return clubMember;
    }
}
