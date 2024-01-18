import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const MemberMemory = createContext();

const MemberContext = ({children}) => {

    const [loginMember , setLoginMember] = useState(() => {
        return JSON.parse(sessionStorage.getItem("loginMember"));
    });

    const obj = {
        "loginMember": loginMember ,
        "setLoginMember": setLoginMember,
    };

    return (<>
        <MemberMemory.Provider value={obj}>
            {children}
        </MemberMemory.Provider>
    </>);
}

const useMemberMemory = () => {
    const obj = useContext(MemberMemory);
    return obj;
}

export {MemberContext, useMemberMemory};