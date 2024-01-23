package com.yeogi.app.util.exception;

public class NotAdminException extends RuntimeException{

    public NotAdminException(String message) {
        super(message);
    }
}
