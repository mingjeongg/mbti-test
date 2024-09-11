import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

// 입력한 id,pw가 db에 있는 회원정보와 일치하면 accessToken을 줌
// token이 처음에는 null -> 그래서 token을 넣어 주는 거임
const token = localStorage.getItem("accessToken");

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  //!! -> falthy(null)한 값을 false로 봐줌
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuthenticated(false);
  };

  // //Json.string화 해줘야함, local stroage는 객체 못넣고 string만 넣을 수 있음
  // const userInfo = (userNickname) => {
  //   localStorage.setItem("userNickname", userNickname);
  // };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, logout, user, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
