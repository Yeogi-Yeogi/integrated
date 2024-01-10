package com.yeogi.app.member.controller;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.yeogi.app.member.service.MemberService;
import com.yeogi.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;


@Controller
@RequestMapping("/member")
public class MemberController {

    private final MemberService service = null;

    //회원가입
    @PostMapping("join")
    public String join(MemberVo vo) throws Exception {
        int result = service.join(vo);
        if(result != 1) {
            throw new Exception();
        }
        return "redirect:/home";
    }

//	// 로그인

    @PostMapping("login")
    public String login(MemberVo vo, HttpSession session) throws Exception {
        MemberVo loginMember = service.login(vo);
        return "redirect:/home";
    }

    // 회원 탈퇴
    @GetMapping("quit")
    public String quit(MemberVo vo , HttpSession session) throws Exception {
        int result = service.quit(vo);
        if(result != 1) {
            throw new Exception();
        }
        session.removeAttribute("loginMember");
        session.setAttribute("alertMsg", "회원 탈퇴 완료");
        return "redirect:/home";
    }

    // 로그아웃
    @GetMapping("logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/home";

    }

}
