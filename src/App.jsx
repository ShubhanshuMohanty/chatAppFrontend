import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectRoute from "./components/auth/ProtectRoute";
import { LayoutLoader } from "./components/layout/Loaders";
import axios from 'axios'
import { server } from "./constants/config";
import { useDispatch, useSelector } from "react-redux";
import { userNotExists } from "./redux/reducers/auth";
import { Toaster } from "react-hot-toast";
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Chat = lazy(() => import("./pages/Chat"));
const Groups = lazy(() => import("./pages/Groups"));
const NotFound = lazy(() => import("./pages/NotFound"));

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const Dashboard = lazy(() => import("./pages/admin/Dashboard"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"));
const MessagesManagement = lazy(() =>
  import("./pages/admin/MessageManagement")
);

let user = true;
function App() {
  const{user,loader}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  useEffect(()=>{
    // console.log(server);
    
    axios.get(`${server}/api/v1/user/me`).then((res)=>console.log(res))
    .catch((err)=>dispatch(userNotExists()))
  },[dispatch]);
  return loader ? (
    <LayoutLoader />
  ) : (
    <BrowserRouter>
      <Suspense fallback={<LayoutLoader/>}>
        <Routes>
          {/* <Route path='/' element={<ProtectRoute user={user}>
                <Home/>
                </ProtectRoute>}/> */}

          <Route path="/" element={<ProtectRoute user={user} />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route path="/groups" element={<Groups />} />
          </Route>

          <Route
            path="/login"
            element={<ProtectRoute user={!user} redirect="/" />}
          >
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/admin" element={<AdminLogin/>}/>
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/chats" element={<ChatManagement />} />
          <Route path="/admin/messages" element={<MessagesManagement />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </BrowserRouter>
  );
}

export default App;
