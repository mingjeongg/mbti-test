import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const handleClick = async () => {
    if (isAuthenticated) {
      navigate("/testpage");
    } else {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  };

  return (
    <div>
      <button onClick={handleClick}>내 성격 알아보러 가기</button>
    </div>
  );
};

export default Home;
