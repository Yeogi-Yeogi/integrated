import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

// 회원 정보를 저장할 MemberMemory 컨텍스트 생성
const MemberMemory = createContext();

// 회원 정보를 관리하는 컨텍스트 제공자 구현// MemberContext 컴포넌트 생성
const MemberContext = ({children}) => {

     // 세션 스토리지에서 로그인한 회원 정보를 가져와 초기 상태로 설정
    const [loginMember , setLoginMember] = useState(() => {
        return JSON.parse(sessionStorage.getItem("loginMember"));
    });

    // 컨텍스트에 제공할 객체 생성//JavaScript 객체를 생성하는 부분
    
    const obj = {
        "loginMember": loginMember , //상태 관리를 위해 useState 훅을 사용하여 세션 스토리지에서 "loginMember" 키에 해당하는 값을 가져와 초기 상태로 설정함
        "setLoginMember": setLoginMember,//"setLoginMember"를 호출하면 "loginMember" 상태가 업데이트되고 컴포넌트가 리렌더링됨
    };

    // 하위 컴포넌트에 컨텍스트 제공
    return (<>
        <MemberMemory.Provider value={obj}>
            {children}
        </MemberMemory.Provider>
    </>);
}

// 컨텍스트를 사용하여 회원 정보에 접근하는 useMemberMemory훅 생성 -> 상태의 전역 관리 및 전역 상태 공유에 유용
const useMemberMemory = () => {
    const obj = useContext(MemberMemory);
    return obj;
}

// 외부에서 사용할 수 있도록 모듈 내보내기
export {MemberContext, useMemberMemory};