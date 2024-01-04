package com.yeogi.app.util.page;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class PageVo {
    private int listCount;			//총 게시글 개수
    private int currentPage;		//현재 페이지
    private int pageLimit;		//페이지 영역 페이지개수
    private int boardLimit;		// 한 페이지에 보여줄 게시글 개수

    private int maxPage;			//가장 마지막 페이지
    private int startPage;			//페이징 영역 시작값
    private int endPage;			//페이징 영역 마지막값

    private int startRow;
    private int lastRow;

    public PageVo(int listCount, int currentPage, int pageLimit, int boardLimit) {
        super();
        this.listCount = listCount;
        this.currentPage = currentPage;
        this.pageLimit = pageLimit;
        this.boardLimit = boardLimit;

        this.maxPage = (int) Math.ceil((double)listCount/boardLimit);
        this.startPage = (currentPage - 1) / pageLimit * pageLimit+1;
        this.endPage = startPage+pageLimit - 1;

        this.startRow = (currentPage-1)* boardLimit+1;
        this.lastRow = startRow + boardLimit -1;

        if(endPage > maxPage) {
            endPage = maxPage;
        }
    }
}
