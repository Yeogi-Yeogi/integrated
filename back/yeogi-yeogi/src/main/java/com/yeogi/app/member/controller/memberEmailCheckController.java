//package com.yeogi.app.member.controller;
//
//import org.apache.http.impl.conn.SingleClientConnManager;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.validation.annotation.Validated;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.yeogi.app.member.service.MemberService;
//
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//
//@Slf4j
//@RestController
//@RequestMapping("/members")
//@RequiredArgsConstructor
//public class memberEmailCheckController {
//	
//	private final MemberService memberService;
//
//    @PostMapping("/emails/verification-requests")
//    public ResponseEntity sendMessage(@RequestParam("email") @Valid @CustomEmail String email) {
//        memberService.sendCodeToEmail(email);
//
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @GetMapping("/emails/verifications")
//    public ResponseEntity verificationEmail(@RequestParam("email") @Valid @CustomEmail String email,
//                                            @RequestParam("code") String authCode) {
//        EmailVerificationResult response = memberService.verifiedCode(email, authCode);
//
//        return new ResponseEntity<>(new SingleResponseDto<>(response), HttpStatus.OK);
//    }
//	
//}
