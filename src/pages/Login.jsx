import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/login",
        {
          id,
          password,
        }
      );

      const data = response.data;
      if (data.success) {
        alert("login successed");
        login(data.accessToken); //accessToken을 local storage에 저장한다는 로직
        navigate("/profile");
      } else {
        alert("login failed");
      }
    } catch (error) {
      console.log("login error=>", error);
      alert("login failed");
    }
    console.log("loginpage");
    return (
      <div>
        <h2>login page</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
            }}
            placeholder="ID"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="Password"
          />
          <button>login</button>
        </form>
      </div>
    );
  };
};

export default Login;
