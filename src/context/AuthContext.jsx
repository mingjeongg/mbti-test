import { createContext, useState } from "react";

export const AuthContext = createContext();

// 입력한 id,pw가 db에 있는 회원정보와 일치하면 accessToken을 줌
// token이 처음에는 null -> 그래서 token을 넣어 주는 거임
const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ childern }) => {
  //!! -> falthy(null)한 값을 false로 봐줌
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.setItem("accessToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {childern}
    </AuthContext.Provider>
  );
};
