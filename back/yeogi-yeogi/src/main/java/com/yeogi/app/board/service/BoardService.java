package com.yeogi.app.board.service;

import com.yeogi.app.board.dto.BoardDetailDto;
import com.yeogi.app.board.dto.BoardDetailValidDto;
import com.yeogi.app.board.dto.BoardListDto;
import com.yeogi.app.board.dto.BoardListFileUrlDto;
import com.yeogi.app.board.repository.BoardRepository;
import com.yeogi.app.review.dto.ReviewDetailDto;
import com.yeogi.app.review.repository.ReviewRepository;
import com.yeogi.app.util.exception.NotClubMemberException;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.session.RowBounds;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import javax.persistence.NoResultException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;

    private final ReviewRepository reviewRepository;
    private final SqlSessionTemplate template;

    /**
     * 모임에 가입한 멤버인지 확인
     * @return
     */
    private boolean isClubMember() {
        return true;
    }

    /**
     * 게시글 간편 조회 데이터 가져오기
     *
     * @param clubNo
     * @param pageNo
     * @return
     */
    public List<BoardListDto> getBoardListByClubNo(String clubNo, String pageNo) throws NotClubMemberException {
        if(!isClubMember()) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        RowBounds rowBounds = new RowBounds(Integer.parseInt(pageNo)*10, 10);
        List<BoardListDto> boardList = boardRepository.getBoardListIgnoreFileUrl(clubNo, template, rowBounds);

        Map<String, BoardListDto> boardMap = new HashMap<>();
        boardList.stream().forEach(e -> boardMap.put(e.getBoardNo(), e));

        List<String> collect = boardList.stream()
                .filter(o -> o.getImageCount().equals("-1"))
                .map(e -> e.getBoardNo())
                .collect(Collectors.toList());

        if(collect != null && collect.size() != 0) {
            List<BoardListFileUrlDto> fileUrlByBoardNo = boardRepository.getFileUrlByBoardNo(collect, template);
            fileUrlByBoardNo.stream().forEach(e-> boardMap.get(e.getBoardNo()).setImagePath(e.getFileUrl()));
        }

        boardList = boardMap.entrySet().stream().map(e -> e.getValue()).collect(Collectors.toList());
        return boardList;
    }

    /**
     * 게시글 상세 조회
     * @param valid
     * @return
     */
    public BoardDetailDto getOneByBoardNo(BoardDetailValidDto valid) throws NotClubMemberException {
        if(!isClubMember()) {
            throw new NotClubMemberException("모임에 가입한 회원만 이용 가능합니다");
        }

        //게시글 가져오기
        BoardDetailDto findBoard =  boardRepository.getBoardByBoardNo(valid, template);
        if(findBoard == null) {
            throw new NoResultException("게시글이 존재하지 않습니다");
        }

        //이미지 가져오기
        List<BoardListFileUrlDto> imageList = boardRepository.getImagesByBoardNo(valid.getBoardNo(), template);
        findBoard.setImages(imageList);

        //리뷰 10개씩 가져오기 -> 리뷰를 가져올 때
        RowBounds rowBounds = new RowBounds(0, 10);
        List<ReviewDetailDto> reviewList = reviewRepository.getReviewListByBoardNo(valid.getBoardNo(), template, rowBounds);
        findBoard.setReviews(reviewList);

        //내가 작성한 거면
//        if(findBoard.getMemberNo().equals("")) {
//            findBoard.setMine(true);
//        }

        return findBoard;
    }


}
