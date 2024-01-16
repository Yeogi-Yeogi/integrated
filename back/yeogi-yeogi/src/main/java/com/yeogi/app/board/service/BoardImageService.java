package com.yeogi.app.board.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.yeogi.app.board.dto.BoardListFileUrlDto;
import com.yeogi.app.board.repository.BoardImageRepository;
import com.yeogi.app.board.repository.BoardRepository;
import com.yeogi.app.board.vo.BoardImageFileVo;
import com.yeogi.app.util.config.S3Config;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class BoardImageService {

    private final BoardImageRepository imageRepository;
    private final BoardRepository boardRepository;
    private final SqlSessionTemplate template;
    private AmazonS3Client s3Client;
    private final S3Config s3Config;

    @PostConstruct
    public void setClient() {
        s3Client = s3Config.amazonS3Client();
    }

    /**
     * 게시글에 사진 추가
     *
     * @param imageList
     * @param recentBoardNo
     * @return
     */
    public int addImages(List<MultipartFile> imageList, String recentBoardNo) {
        //MultipartFile -> BoardImageFileVo로 변환
        List<BoardImageFileVo> voList = imageList.stream().map(m -> {
            try {
                return getBoardImageVo(recentBoardNo, m);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }).collect(Collectors.toList());

        log.info("voList = {}", voList);
        log.info("voList.size() = {}", voList.size() );
        int result = 0;

        try {
            //count는 0이어도 1임, Stream 한번 볼것
            for(BoardImageFileVo b : voList) {
                result += imageRepository.addImages(b, template);
            }
        } catch (Exception e) {
            e.printStackTrace();
            voList.stream().forEach(i -> deleteServerImage(i.getFileName()));
            boardRepository.deleteBoardByNo(recentBoardNo, template);
        }
        return result;
    }

    /**
     * 오류 시 파일 삭제
     * @param fileName
     */
    public void deleteServerImage(String fileName) {
        s3Client.deleteObject(s3Config.getBucket(), fileName);
    }

    /**
     * 이미지 서버에 파일 저장 후
     * ImageFileVo로 반환 하기
     * @param recentBoardNo
     * @param m
     * @return
     * @throws IOException
     */
    private BoardImageFileVo getBoardImageVo(String recentBoardNo, MultipartFile m) throws IOException {
        String customName = UUID.randomUUID() + "_" + LocalDateTime.now() + "_" + m.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(m.getContentType());
        metadata.setContentLength(m.getSize());

        s3Client.putObject(new PutObjectRequest(s3Config.getBucket(), customName, m.getInputStream(), metadata)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        //customName, url을 DB에 저장;
        String fileUrl = s3Client.getUrl(s3Config.getBucket(), customName).toString();
        return new BoardImageFileVo(recentBoardNo, fileUrl, customName);
    }

    /**
     * 삭제하기 위한 이미지 리스트 가져오기
     * @param recentNo
     * @return
     */
    public List<BoardImageFileVo> getListByBoardNo(String recentNo) {
        return imageRepository.getListByBoardNo(recentNo, template);
    }

    /**
     * 번호로 사진 데이터 삭제
     * @param recentNo
     */
    public int deleteByBoardNo(String recentNo) {
        return imageRepository.deleteByBoardNo(recentNo, template);
    }
}
