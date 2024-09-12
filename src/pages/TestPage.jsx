import React, { useContext } from "react";
import TestForm from "../components/TestForm";
import { calculateMBTI } from "../utils/mbtiCalculator";
import { createTestResult } from "../api/testResults";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Test = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // 여기서 anwer은 testForm에서 받아온 answer(예, 아니오로 이루어져있는 배열)
  const handleTestSubmit = async (answers) => {
    const result = calculateMBTI(answers);
    console.log("result", result);
    // 서버가 클라이언트한테 요구하는 데이터 형식이 따로 있음. 그걸 맞춰주기 위해서 작성
    const resultData = {
      userId: user.userId,
      nickname: user.nickname,
      result,
      answers,
      date: new Date().toISOString(),
      visibility: true,
    };
    await createTestResult(resultData);
    navigate("/results");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">MBTI 테스트</h1>
      <TestForm onSubmit={handleTestSubmit} />
    </div>
  );
};

export default Test;
