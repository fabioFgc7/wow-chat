import "./index.css";
import { Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import "react-toastify/dist/ReactToastify.css";
import { Chat } from "./pages/Chat";
import { AuthContext } from "./context/AuthContext";
import ProtectRoutes from "./pages/ProtectRoutes";
import { Avatar } from "./pages/Avatar";
import { ChatContext } from "./context/ChatContext";
function App() {
  return (
    <AuthContext>
      <ChatContext>
        <main className='w-full h-screen bg-slate-800  '>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />

            <Route element={<ProtectRoutes />}>
              <Route
                path='/chat'
                element={<Chat />}
              />
              <Route
                path='/avatar'
                element={<Avatar />}
              />
            </Route>
          </Routes>
        </main>
      </ChatContext>
    </AuthContext>
  );
}

export default App;
