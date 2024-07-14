import {
  BrowserRouter, Routes,
  Route,
} from "react-router-dom";
import App from './App';
import User from './components/User/User';
import Admin from './components/Admin/Admin';
import HomePage from './components/Home/HomePage';
import ManagerUser from './components/Admin/Dashboard/ManagerUser';
import Dashboard from './components/Admin/Dashboard/DashBoard';
import Login from './components/Auth/Login';
import { ToastContainer, toast } from 'react-toastify';
import Register from "./components/Auth/Regitser";

const LayOut = (props) => {

  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<User />} />
        </Route>
        <Route path="/admin" element={<Admin />} >
          <Route index element={<Dashboard />} />
          <Route path="manager-user" element={<ManagerUser />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"

      />
    </>
  )
}


export default LayOut