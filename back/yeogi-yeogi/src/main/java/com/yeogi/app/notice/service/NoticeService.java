package com.yeogi.app.notice.service;

import com.yeogi.app.board.dto.CheckIsMemberDto;
import com.yeogi.app.notice.repository.NoticeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class NoticeService {

    private final NoticeRepository repository;


}
