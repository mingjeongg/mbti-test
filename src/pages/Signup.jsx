import axios from "axios";
import React, { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

const Signup = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://moneyfulpublicpolicy.co.kr/register",
        {
          id,
          password,
          nickname,
        }
      );

      const data = response.data;
      if (data.success) {
        alert("signup successed");
        navigate("/login");
      } else {
        alert("signup failed");
      }
    } catch (error) {
      console.log("signup error=>", error);
      alert("signup failed");
    }
  };

  return (
    <div>
      <h2>Signup Page</h2>
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
          type="text"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input
          type="text"
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          placeholder="Nickname"
        />
        <button>Signup</button>
      </form>
    </div>
  );
};

export default Signup;
