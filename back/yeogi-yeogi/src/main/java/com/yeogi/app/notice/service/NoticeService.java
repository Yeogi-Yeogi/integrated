    package com.yeogi.app.notice.service;

    import com.yeogi.app.board.dto.BoardDetailValidDto;
    import com.yeogi.app.board.repository.BoardRepository;
    import com.yeogi.app.board.service.BoardImageService;
    import com.yeogi.app.board.vo.BoardImageFileVo;
    import com.yeogi.app.notice.dto.NoticeAddDto;
    import com.yeogi.app.notice.dto.NoticeDetailDto;
    import com.yeogi.app.notice.dto.NoticeListDto;
    import com.yeogi.app.notice.repository.ScheduleRepository;
    import com.yeogi.app.notice.vo.ScheduleVo;
    import com.yeogi.app.util.check.CheckDto;
    import com.yeogi.app.util.exception.NotAdminException;
    import com.yeogi.app.util.exception.NotClubMemberException;
    import com.yeogi.app.util.check.CheckClubMember;
    import com.yeogi.app.util.page.PageVo;
    import lombok.RequiredArgsConstructor;
    import org.apache.ibatis.session.RowBounds;
    import org.mybatis.spring.SqlSessionTemplate;
    import org.springframework.stereotype.Service;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.multipart.MultipartFile;

    import java.util.HashMap;
    import java.util.List;
    import java.util.Map;

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
        public Map<String, Object> getNoticeList(CheckDto checkDto, String pageNo) throws NotClubMemberException {

            CheckDto clubMember = check.isClubMember(checkDto,template);
            if(!clubMember.getMemberNo().equals(checkDto.getMemberNo())) {
                throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
            }

            int totalCount = boardRepository.getTotalCount(clubMember.getClubNo(), template);
            int pno = Integer.parseInt(pageNo);
            int boardLimit = 15; //페이징 개수
            PageVo pageVo = new PageVo(totalCount, pno, 5, boardLimit);

            RowBounds rowBounds = new RowBounds((pno-1) * boardLimit, boardLimit);
            List<NoticeListDto> noticeList = boardRepository.getNoticeList(template, clubMember, rowBounds);
            Map<String, Object> resultMap =  new HashMap<>();
            resultMap.put("list", noticeList);
            resultMap.put("pageVo", pageVo);
            if(!(clubMember.getAdminYn().equals("N") && clubMember.getCreatorYn().equals("N")))
                resultMap.put("adminYn", true);
            else resultMap.put("adminYn", false);
            return resultMap;
        }

        /**
         * 공지사항 상세 조회
         * @param dto
         * @return
         * @throws NotClubMemberException
         */
        public NoticeDetailDto getOne(BoardDetailValidDto dto) throws NotClubMemberException {
            CheckDto clubMember = check.isClubMember(new CheckDto(dto.getClubNo(), dto.getMemberNo()), template);
            if(!clubMember.getMemberNo().equals(dto.getMemberNo())) {
                throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
            }

            NoticeDetailDto findNotice = boardRepository.getOne(dto, template);
            ScheduleVo findSchedule = scheduleRepository.getScheduleByBoardNo(findNotice.getBoardNo(), template);
            return findNotice;
        }

        /**
         * 공지사항 작성
         * @param notice
         * @return
         */
        public int addNotice(NoticeAddDto notice) throws NotClubMemberException, NotAdminException {
            CheckDto checkDto = new CheckDto(notice.getClubNo(), notice.getMemberNo());
            CheckDto clubMember = check.isClubMember(checkDto,template);
            if(!clubMember.getMemberNo().equals(checkDto.getMemberNo())) {
                throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
            }

            if(!clubMember.getAdminYn().equals("Y")) {
                throw new NotAdminException("관리자만 이용 가능합니다");
            }

            int result = boardRepository.addNotice(notice, template);

            if(result != 1){
                throw new IllegalStateException("공지사항 작성 실패");
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
                        List<BoardImageFileVo> list = imageService.getListByBoardNo(recentNo);
                        for(BoardImageFileVo bf : list) {
                            imageService.deleteServerImage(bf.getFileName());
                        }
                        imageService.deleteByBoardNo(recentNo);
                    }

                    boardRepository.deleteBoardByNo(recentNo, template);
                    throw new IllegalStateException("공지사항 작성 실패");
                }
            }
            return result;
        }
    }
