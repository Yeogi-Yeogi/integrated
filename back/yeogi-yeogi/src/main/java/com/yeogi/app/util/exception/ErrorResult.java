package com.yeogi.app.util.exception;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorResult {
    private int code;
    private String message;
}
