import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Props 로 꼭 children 만 받을 필요는 없답니다.
const Layout = ({ children }) => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/testpage">테스트</Link>
                <Link to="/testresultpage">테스트 결과보기</Link>
                <Link to="/profile">프로필</Link>
                <button onClick={logout}>로그아웃</button>
                <div>{user?.nickname}님 안녕하세요</div>
              </>
            ) : (
              <>
                <Link to="/signup">회원가입</Link>
                <Link to="/login">로그인</Link>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">{children}</main>
    </div>
  );
};

export default Layout;
