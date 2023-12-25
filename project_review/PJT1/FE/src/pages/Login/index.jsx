import axios from "axios";
import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Login.scss";

const Login = ({ setCheckAuth }) => {
  const [showPswd, setShowPswd] = useState(false);
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "top-center",
    autoClose: 3000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  // 로그인 로직
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      const { username, password } = values;
      const loginData = {
        ID: username,
        PASS: password,
      };
      const { data } = await axios.post(
        "http://127.0.0.1:8080/api/login",
        loginData
      );
      console.log(data);

      if (data.success === false) {
        toast.error("아이디와 비밀번호를 확인해주세요!", toastOptions);
      }
      if (data.success === true) {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.replace("/");
      }
    }
  };

  // 로그인 데이터 변경
  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  // 로그인 유효성 체크
  const handleValidation = () => {
    const { password, username } = values;
    if (username.length < 5) {
      toast.error("아이디를 5자 이상 입력해주세요.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("비밀번호를 8자 이상 입력해주세요.", toastOptions);
      return false;
    }
    return true;
  };

  // 비밀번호 보기 상태 변경
  const toggleShowPswd = () => {
    setShowPswd(!showPswd);
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={(event) => handleSubmit(event)}>
        <div className="brand">
          <h1>로그인</h1>
        </div>
        <input
          type="text"
          placeholder="아이디"
          name="username"
          onChange={(e) => handleChange(e)}
        />
        <div className="password-wrapper">
          <input
            type={showPswd ? "text" : "password"}
            placeholder="비밀번호"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <div className="password-btn-wrapper">
            {showPswd ? (
              <BiShow fontSize={"1.5rem"} onClick={toggleShowPswd} />
            ) : (
              <BiHide fontSize={"1.5rem"} onClick={toggleShowPswd} />
            )}
          </div>
        </div>
        {(values.username.length > 4 || values.username.length < 12) &&
        values.password.length >= 8 ? (
          <button className="button2" type="submit">
            로그인
          </button>
        ) : (
          <button className="button1" disabled>
            로그인
          </button>
        )}

        <span>
          아이디가 없으신가요 ?
          <Link onClick={() => setCheckAuth("signup")}> 회원가입</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
