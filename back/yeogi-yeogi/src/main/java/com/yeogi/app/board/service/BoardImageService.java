package com.yeogi.app.board.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.yeogi.app.board.repository.BoardImageRepository;
import com.yeogi.app.board.repository.BoardRepository;
import com.yeogi.app.board.vo.BoardImageFileVo;
import com.yeogi.app.util.config.S3Config;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.FileInputStream;
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
     * @param boardNo
     */
    public int deleteImagesByBoardNo(String boardNo) {
        List<BoardImageFileVo> imageList = getListByBoardNo(boardNo);
        imageList.stream().forEach(e -> deleteServerImage(e.getFileName()));
        int result = imageRepository.deleteByBoardNo(boardNo, template);
        return result;
    }

    /**
     * 해당 번호에 해당하는 사진 객체를 받아온 후 지우기
     * @return
     */
    public int deleteImagesByNo(List<String> deleted) {

        List<BoardImageFileVo> deleteList = imageRepository.getBoardImageVoByNo(deleted, template);
        deleteList.stream().forEach(i -> deleteServerImage(i.getFileName()));

        int result = imageRepository.deleteByNo(deleted, template);
        return result;
    }

    /**
     * 파일 객체 인코딩하기
     * @param imagePath
     * @return
     */
    public String getBoardImageByBytes(String imagePath) throws IOException {
        String base64Img = "";

        File file = new File(imagePath);
        if (file.exists() && file.isFile() && file.length() > 0) {
            byte[] bt = new byte[(int) file.length()];
            FileInputStream fis = null;

            try {
                fis = new FileInputStream(file);
                fis.read(bt);
                base64Img = new String(Base64.encodeBase64(bt));
            } catch (IOException e) {
                e.printStackTrace();
                return "";
            } finally {
                try {
                    if (fis != null) {
                        fis.close();
                    }
                } catch (IOException e) {
                } catch (Exception e) {
                }
            }
        }

        return "data:image/jpeg;base64,"+base64Img;
    }
}
