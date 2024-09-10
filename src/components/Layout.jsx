import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

// Props 로 꼭 children 만 받을 필요는 없답니다.
const Layout = ({ children }) => {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);

  // 이곳에서 로그인 하지 않은 사용자를 login 페이지로 보내줄 거에요.
  useEffect(() => {
    if (!isAuthenticated) {
      return navigate("/login");
    }
  }, []);

  const handleLogout = logout();

  return (
    <div>
      <header>
        <nav>
          <Link to="/">홈</Link>
          <div className="space-x-4">
            {isAuthenticated ? (
              <>
                <button>프로필</button>
                <button>테스트</button>
                <button>결과보기</button>
                <button onClick={handleLogout}>로그아웃</button>
              </>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto pt-10 main">{children}</main>
    </div>
  );
};

export default Layout;
