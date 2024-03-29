package com.yeogi.app.board.service;

import com.yeogi.app.board.dto.*;
import com.yeogi.app.board.repository.BoardRepository;
import com.yeogi.app.util.check.CheckClubMember;
import com.yeogi.app.util.check.CheckDto;
import com.yeogi.app.util.check.CheckMemberAuthorityDto;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.NoResultException;
import java.io.IOException;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    private final CheckClubMember checkMember;

    private final BoardImageService boardImageService;
    private final SqlSessionTemplate template;

    /**
     * 게시글 간편 조회 데이터 가져오기
     *
     * @param dto
     * @param pageNo
     * @return
     */
    public List<BoardListDto> getBoardListByClubNo(CheckDto dto, String pageNo) throws RuntimeException {

        CheckDto clubMember = checkMember.isClubMember(dto, template);
        if(!clubMember.getMemberNo().equals(dto.getMemberNo())) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        int boardLimit = 5;
        RowBounds rowBounds = new RowBounds(Integer.parseInt(pageNo)*boardLimit, boardLimit);
        List<BoardListDto> boardList = boardRepository.getBoardListIgnoreFileUrl(dto.getClubNo(), template, rowBounds);

        List<String> memberNoList = boardList.stream().map(e -> e.getMemberNo()).distinct().collect(Collectors.toList());
        CheckMemberAuthorityDto memberAuthorityDto = new CheckMemberAuthorityDto(memberNoList, dto.getClubNo());
        List<CheckDto> memberAuthorites = checkMember.getAuthorites(memberAuthorityDto, template);

        Map<String, BoardListDto> boardMap = new HashMap<>();
        for(CheckDto check : memberAuthorites) {

            boardList.stream().filter(i -> check.getMemberNo().equals(i.getMemberNo()))
                    .forEach(e -> {

                        if(check.getCreatorYn().equals("Y")) {
                            e.setCreatorYn(true);
                            e.setAdminYn(true);
                        } else if(check.getCreatorYn().equals("N") && check.getAdminYn().equals("Y")){
                            e.setAdminYn(true);
                        }

                        //이미지 서버에 저장된 파일이 아닐 경우
                        if(!e.getMemberProfile().startsWith("https://")) {
                            try {
                                e.setMemberProfile(boardImageService.getBoardImageByBytes(e.getMemberProfile()));
                            } catch (IOException ex) {
                                throw new RuntimeException(ex);
                            }
                        }
                boardMap.put(e.getBoardNo(), e);
            });
        }

        List<String> collect = boardList.stream()
                .filter(o -> o.getImageCount() != -1)
                .map(e -> e.getBoardNo())
                .collect(Collectors.toList());

        if(collect != null && collect.size() != 0) {
            List<BoardListFileUrlDto> fileUrlByBoardNo = boardRepository.getFileUrlByBoardNo(collect, template);
            for (BoardListFileUrlDto imageDto:
                 fileUrlByBoardNo) {
                BoardListDto boardListDto = boardMap.get(imageDto.getBoardNo());
                boardListDto.setImagePath(imageDto.getFileUrl());
                boardMap.put(imageDto.getBoardNo(), boardListDto);
            }
        }

        boardList = boardMap.entrySet()
                .stream()
                .map(Map.Entry::getValue)
                .sorted(Comparator.comparing(BoardListDto::getEnrollDate)
                        .thenComparing(BoardListDto::getBoardNo).reversed())
                .collect(Collectors.toList());

        return boardList;
    }

    /**
     * 게시글 상세 조회
     * @param valid
     * @return
     */
    public BoardDetailDto getOneByBoardNo(BoardDetailValidDto valid) throws RuntimeException {

        CheckDto clubMember = checkValid(valid.getClubNo(), valid.getMemberNo());

        //게시글 가져오기
        BoardDetailDto findBoard =  boardRepository.getBoardByBoardNo(valid, template);
        if(findBoard == null) {
            throw new NoResultException("게시글이 존재하지 않습니다");
        }

        CheckDto checkAuthorityDto = checkValid(valid.getClubNo(), findBoard.getMemberNo());

        if(checkAuthorityDto.getCreatorYn().equals("Y")) {
            findBoard.setCreatorYn(true);
            findBoard.setAdminYn(true);
        } else if(checkAuthorityDto.getCreatorYn().equals("N") && checkAuthorityDto.getAdminYn().equals("Y")) {
            findBoard.setAdminYn(true);
        }

        if(!findBoard.getMemberProfile().startsWith("https://")) {
            try {
                findBoard.setMemberProfile(boardImageService.getBoardImageByBytes(findBoard.getMemberProfile()));
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }

        //이미지 가져오기
        List<BoardListFileUrlDto> imageList = boardRepository.getImagesByBoardNo(valid.getBoardNo(), template);
        findBoard.setImages(imageList);


        //내가 작성한 거면
        if(findBoard.getMemberNo().equals(clubMember.getMemberNo())) {
            findBoard.setMine(true);
        }

        if(clubMember.getAdminYn().equals("Y")) {
            findBoard.setAdmin(true);
        }

        return findBoard;
    }

    /**
     * 게시글 작성
     * @param dto
     * @return
     */
    public int addBoard(BoardUploadDto dto) throws RuntimeException {

        CheckDto clubMember = checkValid(dto.getClubNo(), dto.getMemberNo());

        int result = boardRepository.addBoard(dto, template);

        //이미지 사진 저장
        int imageResult = 0;

        List<MultipartFile> imageList = dto.getImageList();
        if(result == 1 && imageList != null && imageList.size() != 0) {
            String recentBoardNo = boardRepository.getNoByMemberNo(clubMember, template);
            imageResult += boardImageService.addImages(dto.getImageList(), recentBoardNo);

            if(imageList.size() != imageResult) {
                throw new IllegalStateException("작성 실패");
            }
        }
        return imageResult;

    }

    /**
     * 게시글 삭제
     * @param dto
     * @return
     */
    public int deleteBoard(BoardDetailValidDto dto) throws RuntimeException {
        CheckDto clubMember = checkValid(dto.getClubNo(), dto.getMemberNo());

        int result = boardRepository.deleteBoard(dto, template);

        if(result != 1) {
            throw new IllegalStateException("게시글 삭제는 본인이 작성한 것만 가능합니다.");
        }

        return result;
    }

    private CheckDto checkValid(String clubNo, String memberNo) throws RuntimeException {
        CheckDto clubMember = checkMember.isClubMember(new CheckDto(clubNo, memberNo), template);
        if(!(memberNo != null && clubMember.getMemberNo().equals(memberNo))) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }
        return clubMember;
    }

    /**
     * 게시글 수정
     * @param dto
     * @return
     */
    public int updateBoard(BoardUploadDto dto) throws RuntimeException {
        checkValid(dto.getClubNo(), dto.getMemberNo());

        //해당 게시글을 자신이 쓴건지?
        String findNo = boardRepository.getBoardNo(dto, template);

        if(!(findNo != null && dto.getBoardNo().equals(findNo))) {
            throw new IllegalStateException("자신이 작성한 게시글만 수정 가능합니다");
        }
        int result = 0;
        //게시글 수정
        if(!(dto.getTitle() == null && dto.getContent() == null)) {
            result = boardRepository.updateBoard(dto, template);
        }
        log.info("게시글 제목 내용 수정 결과 = {}", result);
        if(!(dto.getTitle() == null && dto.getContent() ==null) && result != 1) {
            throw new IllegalStateException("게시글 수정 실패");
        }

        if (dto.getDeleted() != null) {
            result = boardImageService.deleteImagesByNo(dto.getDeleted());

            if(result != dto.getDeleted().size()) {
                throw new NoResultException("삭제 실패");
            }
        }

        if(dto.getImageList() != null) {
            result = boardImageService.addImages(dto.getImageList(), dto.getBoardNo());
        }
        return result;
    }
}
