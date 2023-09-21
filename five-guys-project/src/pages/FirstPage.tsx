import React, { useState } from 'react';
import SignIn from '../components/SignIn';

const FirstPage = () => {
  
  const [toggleMode, setToggleMode] = useState("로그인");

  const modeHandler = () => {
    if(toggleMode === "로그인") {
      setToggleMode("회원가입");
    }
    else setToggleMode("로그인");
  }
  
  return (
    <>
      {toggleMode === "로그인" ? 
        <SignIn/> : 
        <SignUp/>
      }
    </>
    
  );
};

export default FirstPage;