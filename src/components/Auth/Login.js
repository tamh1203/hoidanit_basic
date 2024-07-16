import "./Login.scss"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAPI } from "../Services/apiservice"
import { toast } from 'react-toastify'
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { Dologin } from "../../redux/action/userAction";

const Login = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const [showHidePassword, setShowhidePassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()



  const handleLogin = async () => {
    // submit api
    setIsLoading(true)
    let data = await loginAPI(email, password)
    console.log(data);
    if (data && data.EC == 0) {
      dispatch(Dologin(data)) // dispatch
      toast.success(data.EM)
      setIsLoading(false)
      navigate("/")
    } else {
      toast.error(data.EM)
      setIsLoading(false)
    }
  }

  const hanldeClickGoHome = () => {
    navigate("/")
  }

  const handleRegister = () => {
    // alert("me")
    navigate("/register")
  }

  const handleShowhide = () => {
    setShowhidePassword(!showHidePassword)
    console.log(showHidePassword);
  }

  return (
    <div className="login-container ">
      <div className="header">
        <span>Don't have an account yet?</span>
        <button onClick={() => handleRegister()}>
          SignUp
        </button>
      </div>
      <div className="title col-4 mx-auto">
        Typeform
      </div>
      <div className="wellcome col-4 mx-auto">
        Hello, who’s this?
      </div>
      <div className="form-content col-3 mx-auto">
        <div className="form-group  ">
          <label>Email</label>
          <input
            className="form-control"
            type="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <div className="form-group input-form-login ">
            <label >Password</label>
            {/* <input
            className="form-control"
            type="password"
            onChange={(event) => setPassword(event.target.value)}
          /> */}
            <input
              className="form-control "
              type={showHidePassword ? "text" : "password"}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="button-eyes-login"
              onClick={() => handleShowhide()}
            >
              {showHidePassword ? <IoEyeSharp /> : <FaEyeSlash />}
            </button>
          </div>
        </div>
        <span className="forgot-password">Forgot password?</span>
        <div className="btn-login mx-auto">
          <button
            className="button-login "
            onClick={() => handleLogin()}
            disabled={isLoading}
          >
            {isLoading === true && <FaSpinner className="loader-icon" />}
            <span>Log in to Typeform</span>
          </button>
        </div>
        <div className="text-center">
          <span
            className="goto-home"
            onClick={() => hanldeClickGoHome()}>
            &lt;&lt; Go to homePage</span>
        </div>
      </div>
    </div >
  )
}

export default Login;