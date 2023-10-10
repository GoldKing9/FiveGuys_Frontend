import React, { useState } from 'react';
import debounce from '../utils/debounce';
import axios from 'axios';
import styled from 'styled-components';
import { setCookie } from '../utils/Cookies';



const SignIn = () => {
  
  interface form {
    email: null | string;
    password: null | string;
  }

  interface isValidForm {
    isValidEmail: boolean;
    isValidPassword: boolean;
  }

  interface formMessage {
    formEmailMessage: null | string;
    formPasswordMessage: null | string;
  }

  const [form, setForm] = useState<form>({
    email: "",
    password: ""
  });

  const [isValid, setIsValid] = useState<isValidForm>({
    isValidEmail: false,
    isValidPassword: false
  });

  const [message, setMessage] = useState<formMessage>({
    formEmailMessage: "",
    formPasswordMessage: ""
  });

  const emailRegexp =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const passwordRegexp = /^(?=.*[0-9])(?=.*[a-z])[0-9a-z]{4,12}$/;

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

  const handleSignin = async () => {
    await axios
      .post('http://www.burgerclub.shop/api/auth/login', {
        email: form.email,
        password: form.password,
      })
      .then(function (res) {
        console.log(res.data);

        const accessToken = res.data.data.accessToken;
        localStorage.setItem("accessToken", accessToken);

        const refreshToken = res.data.refreshToken;
        
        if(refreshToken) {
          setCookie("refreshToken", refreshToken, {
            path: "/",
            sameSite: "strict",
          });
        }
        console.log(res);
        alert("로그인에 성공했습니다.");
      })
      .catch(function (res) {
        if(res.data.message === "아이디가 일치하지 않습니다.") alert("아이디가 일치하지 않습니다.");
        else if(res.data.message === "비밀번호가 일치하지 않습니다.") alert("비밀번호가 일치하지 않습니다.")
      });
  };

  return (
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
      <Submit
        // disabled= {!(isValid.isValidEmail && isValid.isValidPassword)}
        onClick={handleSignin}
      >
        로그인
      </Submit>
    </Form>
  );
};

export default SignIn;

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