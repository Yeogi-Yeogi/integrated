package com.yeogi.app.sample.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter @Setter
@NoArgsConstructor
@Entity
@Table(name = "UPLOAD_FILE")
public class UploadFile {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long no;

    //원본 파일 이름
    @Column(name = "FILE_NAME")
    private String customFileName;

    //저장된 파일 이름
    private String fileUrl;

    @CreationTimestamp
    private LocalDateTime uploadTime;

    @Builder
    public UploadFile(String customFileName, String fileUrl) {
        this.customFileName = customFileName;
        this.uploadTime = LocalDateTime.now();
        this.fileUrl = fileUrl;
    }
}
