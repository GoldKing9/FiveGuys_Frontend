import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/Signup";
import ToggleHandler from "../utils/ToggleHandler";
import styled from "styled-components";

interface FirstPageProps {
  changeMode: () => void;
}

const FirstPage: React.FC<FirstPageProps> = () => {
  const [value, setValue] = useState<string>("로그인");

  const changeMode = (type: string) => {
    if (type === "로그인") {
      setValue("로그인");
    } else setValue("회원가입");
  };

  return (
    <>
      <Container>
        <ToggleDiv>
          <ToggleHandler changeMode={changeMode} value={value}/>
        </ToggleDiv>
        <ContainerHeader>FiveGuys IDE</ContainerHeader>
        {value === "로그인" ? 
          (<SignIn/>) : 
          (<SignUp/>)
        }
      </Container>
    </>
  );
};

export default FirstPage;

const Container = styled.div`
  width: 31.25rem;
  height: 43.75rem;
  margin: auto;
  border-radius: 1.25rem;
  border: 1px #dbbff4 solid;
  background-color: #ffffff;
  opacity: 0.7;
`;

const ToggleDiv = styled.div`
  width: 100%;
  height: 2.625rem;
`;

const ContainerHeader = styled.div`
  height: 4rem;
  display: flex;
  width: 20rem;
  color: #dbbff4;
  font-size: 3.125rem;
  margin: 1.25rem auto 3rem;
  font-weight: bolder;
`;
