package com.yeogi.app.sample.repository;


import com.yeogi.app.sample.entity.UploadFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileRepository extends JpaRepository<UploadFile, Long> {

    void deleteByCustomFileName(String fileName);
}
