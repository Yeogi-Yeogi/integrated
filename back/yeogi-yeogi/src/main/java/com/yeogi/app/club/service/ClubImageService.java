package com.yeogi.app.club.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.yeogi.app.club.dao.ClubDao;
import com.yeogi.app.club.dto.ClubImageDto;
import com.yeogi.app.club.dto.CreateClubDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClubImageService {

    private final AmazonS3Client amazonS3Client;
    private final ClubDao dao;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /**
     * @param createClubDto
     * @param sst
     * @return
     * @throws IOException
     */
    public int uploadFile(CreateClubDto createClubDto, MultipartFile file, SqlSessionTemplate sst) throws IOException {
//        try {
        log.info("serviceCreateClubDto = {}", createClubDto);
        log.info("serviceFile = {}", file.getOriginalFilename());
        String fileName = file.getOriginalFilename();
        String customName= UUID.randomUUID()+ "_" + LocalDateTime.now() + "_" + fileName;

        String fileUrl = amazonS3Client.getUrl(bucket, customName).toString();

        createClubDto.setClubImageDto(new ClubImageDto(fileUrl, customName));

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(file.getContentType());
        metadata.setContentLength(file.getSize());

        amazonS3Client.putObject(bucket,customName, file.getInputStream(),metadata);


        ResponseEntity<String> responseEntity = ResponseEntity.ok(fileUrl);

        if (responseEntity.getStatusCode() == HttpStatus.OK) {
            log.info("File uploaded successfully. File URL: {}", fileUrl);
            return dao.uploadFile(createClubDto, sst);
        } else {
            return 0;
        }

//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//        }
    }
}