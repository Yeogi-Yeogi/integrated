package com.yeogi.app.sample.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.yeogi.app.util.config.S3Config;
import com.yeogi.app.sample.entity.UploadFile;
import com.yeogi.app.sample.repository.FileRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FileService {

    private AmazonS3Client s3Client;

    private final S3Config s3Config;
    private final FileRepository fileRepository;


    @PostConstruct
    public void setClient() {
        s3Client = s3Config.amazonS3Client();
    }

    /**
     * 파일을 받아서 가공한 다음 저장 하고 원래이름이랑, 가공한이름이랑 같이 서버에 저장 후 미리보기
     *
     * @param upload
     * @return
     */

    public String save(MultipartFile upload) throws IOException {
        String originalName = upload.getOriginalFilename();
        String customName = UUID.randomUUID()+"_"+ LocalDateTime.now() + "_" + originalName;
        log.info("customName = {}", customName);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType(upload.getContentType());
        metadata.setContentLength(upload.getSize());

        s3Client.putObject(new PutObjectRequest(s3Config.getBucket(), customName, upload.getInputStream(), null)
                .withCannedAcl(CannedAccessControlList.PublicRead));

        //customName, url을 DB에 저장;
        String fileUrl = s3Client.getUrl(s3Config.getBucket(), customName).toString();
        UploadFile uploadFile = new UploadFile(customName, fileUrl);

        log.info("uploadFile = {}", uploadFile);

        //DB에 저장
        fileRepository.saveAndFlush(uploadFile);
        return fileUrl;
    }

    public List<UploadFile> getList() {
        return fileRepository.findAll();
    }

    public void delete(String fileName) {
        s3Client.deleteObject(s3Config.getBucket(), fileName);
        fileRepository.deleteByCustomFileName(fileName);
    }

}
