import React, { useState } from 'react';
import debounce from '../utils/debounce';
import axios from 'axios';
import styled from 'styled-components';
import ToggleHandler from '../utils/ToggleHandler';
import {toast, ToastContainer} from "react-toastify";
import { useNavigate } from 'react-router-dom';



const Signup = () => {
  
  interface form {
    email: null | string;
    password: null | string;
    nickname: null | string;
    checkPassword: null | string;
  }

  interface isValidForm {
    isValidEmail: boolean;
    isValidPassword: boolean;
    isValidNickname: boolean;
    isValidCheckPassword: boolean;
  }

  interface formMessage {
    formEmailMessage: null | string;
    formPasswordMessage: null | string;
    formNicknameMessage: null | string;
    formCheckPasswordMessage: null | string;
  }

  const [form, setForm] = useState<form>({
    email: "",
    password: "",
    nickname: "",
    checkPassword: ""
  });

  const [isValid, setIsValid] = useState<isValidForm>({
    isValidEmail: false,
    isValidPassword: false,
    isValidNickname: false,
    isValidCheckPassword: false,
  });

  const [message, setMessage] = useState<formMessage>({
    formEmailMessage: "",
    formPasswordMessage: "",
    formNicknameMessage: "",
    formCheckPasswordMessage: ""
  });

  const navigate = useNavigate();

  const emailRegexp =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])[0-9a-z]{4,12}$/;
  const nicknameRegexp = /^[A-Za-z0-9가-힣_()]{4,12}$/;

  const isValidEmail = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

    const currentEmail = e.target.value;
    setForm({...form, email: currentEmail});
    console.log(currentEmail);

    if(!emailRegexp.test(currentEmail)) {
      setIsValid({...isValid, isValidEmail: false});
      setMessage({...message, formEmailMessage: "이메일 형식에 맞게 작성해주세요"});
    } else {
      setIsValid({...isValid, isValidEmail: true});
      setMessage({...message, formEmailMessage: "유효한 이메일 형식 입니다."});
    }
  }, 800);

  const isValidPassword = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

    const currentPassword = e.target.value;
    setForm({...form, password: currentPassword});
    console.log(currentPassword);

    if(!passwordRegexp.test(currentPassword)) {
      setIsValid({...isValid, isValidPassword: false});
      setMessage({...message, formPasswordMessage: "영문소문자, 숫자 포함 4자 이상 12자 이하로 입력해주세요."});
    } else {
      setIsValid({...isValid, isValidPassword: true});
      setMessage({...message, formPasswordMessage: "유효한 비밀번호 형식 입니다."});
    }
  }, 800);

  const isValidNickname = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

    const currentNickname = e.target.value;
    setForm({...form, nickname: currentNickname});
    console.log(currentNickname);

    if(!nicknameRegexp.test(currentNickname)) {
      setIsValid({...isValid, isValidNickname: false});
      setMessage({...message, formNicknameMessage: "영어소문자, 대문자, 한글, 숫자 등을 활용해 닉네임을 만들어주세요. (특수문자는 _ ( ) 만 사용가능)"});
    } else {
      setIsValid({...isValid, isValidNickname: true});
      setMessage({...message, formNicknameMessage: "유효한 닉네임 형식입니다."});
    }
  }, 800);

  const CheckPassword = debounce((e: React.ChangeEvent<HTMLInputElement>) => {

    const currentCheckPassword = e.target.value;
    console.log(currentCheckPassword);

    if(form.password !== currentCheckPassword) {
      setIsValid({...isValid, isValidCheckPassword: false});
      setMessage({...message, formCheckPasswordMessage: "서로 다른 비밀번호 입니다!"});
    } else {
      setIsValid({...isValid, isValidCheckPassword: true});
      setMessage({...message, formCheckPasswordMessage: "같은 비밀번호 입니다."});
    }
  }, 800);

  const onSubmit = async () => {
    await axios
      .post('http://www.burgerclub.shop/api/auth/signup', {
        email: form.email,
        password: form.password,
        nickname: form.nickname
      })
      .then(function (res) {
        console.log(res);
        toast.success(<h3>회원가입이 완료되었습니다.<br/>로그인 하세요😎</h3>, {
          position: "top-right",
          autoClose: 1000
        });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch(function (error) {
        console.log(error);
        console.log(error.response.data.message);
        toast.error(error.response.data.message + "😭", {
          position: "top-right",
          autoClose: 1000
        });
        
      });
  };

  return (
    <SignupContainer>
      <ToastContainer/>
      <ToggleDiv>
        <ToggleHandler/>
      </ToggleDiv>
      <SignupHeader>FiveGuys IDE</SignupHeader>
      <Form>
        <Input
          placeholder='이메일'
          type='email'
          onChange={isValidEmail}
          color={isValid.isValidEmail}
        />
        <InputMessage
          color={isValid.isValidEmail}
        >
          {message.formEmailMessage}
        </InputMessage>
        <Input
          placeholder='닉네임'
          type='nickname'
          onChange={isValidNickname}
          color={isValid.isValidNickname}
        />
        <InputMessage
          color={isValid.isValidNickname}
        >
          {message.formNicknameMessage}
        </InputMessage>
        <Input
          placeholder='비밀번호'
          type='password'
          onChange={isValidPassword}
          color={isValid.isValidPassword}
        />
        <InputMessage
          color={isValid.isValidPassword}
        >
          {message.formPasswordMessage}
        </InputMessage>
        <Input
          placeholder='비밀번호 확인'
          type='checkpassword'
          onChange={CheckPassword}
          color={isValid.isValidCheckPassword}
        />
        <InputMessage
          color={isValid.isValidCheckPassword}
        >
          {message.formCheckPasswordMessage}
        </InputMessage>
        <Submit
          onClick={onSubmit}
        >
          회원 가입
        </Submit>
      </Form>
    </SignupContainer>
  );
};

export default Signup;

const SignupContainer = styled.div`
  width: 31.25rem;
  height: 43.75rem;
  margin: auto;
  border-radius: 1.25rem;
  border: 1px #DBBFF4 solid;
`

const ToggleDiv = styled.div`
  width: 100%;
  height: 2.625rem;
`

const SignupHeader = styled.div`
  height: 4rem;
  display: flex;
  width: 20rem;
  color: #DBBFF4;
  font-size: 3.125rem;
  margin: 1.25rem auto 3rem;
  font-weight: bolder;
`

const Form = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  padding: 0 5rem 0 5rem;
  align-items: center;
`

const Input = styled.input.attrs<{ color?: boolean }>({ required: true })`
  display: block;
  width: 100%;
  height: 3.125rem;
  font-size: 1.25rem;
  border-radius: 0.5rem;
  border: 1px #DBBFF4 solid;
  text-indent: 0.75rem;

  &:focus {
    border: ${(props) => props.color ? '2px solid green' : '2px solid red'};
    outline: none;
  }
`

const InputMessage = styled.p<{ color?: boolean }>`
  font-size: 0.625rem;
  height: 0.75rem;
  margin: 0.375rem 0;
  font-family: 'Single Day', cursive;
  width: 100%;
  color: ${(props) => props.color ? 'green' : 'red'};
  text-align: start;
  text-indent: 0.75rem;
`

const Submit = styled.button`
  display: block;
  width: 100%;
  height: 3.125rem;
  background-color: #DBBFF4;
  text-align: center;
  margin-top: 1.875rem;
  border: none;
  border-radius: 0.5rem;
  color: white;
  font-size: 1.25rem;
  cursor: pointer;
`
