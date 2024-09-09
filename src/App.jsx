import React from "react";
import { AuthProvider } from "./context/AuthContext";
import SharedRouter from "./shared/Router";

const App = () => {
  return (
    <AuthProvider>
      <SharedRouter />
    </AuthProvider>
  );
};

export default App;
