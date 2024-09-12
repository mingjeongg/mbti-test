import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [newNickname, setNewNickname] = useState("");
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      alert("로그인이 필요합니다");
      navigate("/login");
    } else {
      const fetchUserInfo = async () => {
        try {
          const token = localStorage.getItem("accessToken");

          const response = await axios.get(
            "https://moneyfulpublicpolicy.co.kr/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUserInfo(response.data);
        } catch (error) {
          console.log("failed to fetch user info=>", error);
        }
      };
      fetchUserInfo();
    }
  }, [isAuthenticated]);

  const handleNicknameChange = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await axios.patch(
        "https://moneyfulpublicpolicy.co.kr/profile",
        { nickname: newNickname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setUserInfo((prevState) => ({
          ...prevState,
          nickname: response.data.nickname,
        }));
        alert("닉네임이 변경 성공");
        setNewNickname("");
      } else {
        alert("닉네임 변경 실패");
      }
    } catch (error) {
      alert("닉네임 변경 실패");
      console.log("failed to update nickname:", error);
    }

    if (!userInfo) {
      return <div>loading..</div>;
    }
  };

  return (
    <div>
      <h2>Profile: {userInfo?.nickname}</h2>

      <form onSubmit={handleNicknameChange}>
        <input
          type="text"
          value={newNickname}
          placeholder="new nickname"
          onChange={(e) => {
            setNewNickname(e.target.value);
          }}
        />
        <button>닉네임 수정</button>
      </form>
    </div>
  );
};

export default Profile;
