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
import { ToastContainer } from 'react-toastify';
import Register from "./components/Auth/Regitser";
import ListQuiz from "./components/User/ListQuiz";
import DetailQuiz from "./components/User/DetailQuiz";
import ManagerQuiz from "./components/Admin/Dashboard/Quiz/ManagerQuiz";
import Questions from "./components/Admin/Dashboard/Question/Questions";


const PageNotFound = () => {
  return (
    <div className="alert alert-danger container mt-3" >
      404.Upon wrong URL request I am redirecting it to PageNotFound
    </div>
  )
}

const LayOut = (props) => {

  return (
    <>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="users" element={<ListQuiz />} />
        </Route>
        <Route path="/quiz/:id" element={<DetailQuiz />} />
        <Route path="/admin" element={<Admin />} >
          <Route index element={<Dashboard />} />
          <Route path="manager-user" element={<ManagerUser />} />
          <Route path="manager-quiz" element={<ManagerQuiz />} />
          <Route path="manager-questions" element={<Questions />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path='*' element={<PageNotFound />} />
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