import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

const ToggleHandler = () => {
  
  const [value, setValue] = useState<string>("로그인");

  const changeMode = (type: string) => {
    if (type === "로그인") {
      setValue("로그인");
    } else setValue("회원가입");
  }
  
  return (
    <ToggleDiv value= {value}>
      <span/>
      <SigninButton
        type='button'
        value= {value}
        onClick={() => changeMode("로그인")}
      >
        로그인
      </SigninButton>
      <SignupButton
        type='button'
        value= {value}
        onClick={() => changeMode("회원가입")}
      >
        회원가입
      </SignupButton>
    </ToggleDiv>
  );
};

export default ToggleHandler;

const ToggleDiv = styled.div<{value: string}>`
  width: 200px;
  height: 42px;
  background-color: #DBBFF4;
  border: none;
  border-radius: 40px;
  position: relative;
  margin: 20px auto;
  cursor: pointer;

  span {
    position: absolute;
    width: 100px;
    height: 36px;
    border-radius: 40px;
    background-color: white;
    transition: all 0.6s ease-in-out;
    z-index: 1;
    margin: 3px 2px;

    ${({ value }) =>
      value === "로그인"
        ? "transform: translateX(0px)"
        : "transform: translateX(96px)"
    }
  }
`

const button = styled.button<{ value: string }>`
  position: relative;
  width: 100px;
  height: 42px;
  color: white;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  background-color: transparent;
  outline: none;
  border: none;
  transition: color 1s ease;
  z-index: 2;

  &:active, &:hover {
    outline: none;
    border: none;
  }
`

const SigninButton = styled(button)`
  ${({ value }) => 
    value === "로그인" ? "color: #DBBFF4;" : null
  }
`

const SignupButton = styled(button)`
  ${({ value }) => 
    value === "회원가입" ? "color: #DBBFF4;" : null
  }
`
