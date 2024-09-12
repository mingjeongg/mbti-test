import axios from "axios";

const API_URL = "http://localhost:4000/testResults";
4000;
export const getTestResults = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTestResult = async (resultData) => {
  // 테스트 결과를 서버 db에 넣어달라느 요청 로직 //post
  const response = await axios.post(API_URL, resultData);
  return response.data;
};

// id를 넣는 이유는 남의 거 말고 내 테스트 결과만 삭제 할 수 있게
export const deleteTestResult = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
};

export const updateTestResultVisibility = async (id, visibility) => {
  const response = await axios.patch(`${API_URL}/${id}`, {
    visibility: visibility,
  });
  return response.data;
};
