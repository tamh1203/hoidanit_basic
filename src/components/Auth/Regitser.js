import React from "react"
import ImageSignIn from "../../product-sample@1x.png"
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import "./Login.scss"
import { useState } from "react"
import { registerAPI } from "../Services/apiservice";
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoArrowBackCircle } from "react-icons/io5";
const Register = (props) => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  const [showHidePassword, setShowhidePassword] = useState(false)

  const navigate = useNavigate()
  const handleRegisterUser = async () => {
    // alert("me")
    let data = await registerAPI(email, password, username)
    if (data && data.EC == 0) {
      toast.success(data.EM)
      navigate("/login")
    } else {
      toast.error(data.EM)
    }
    console.log(data);
  }

  const handleShowhide = () => {
    setShowhidePassword(!showHidePassword)
    console.log(showHidePassword);
  }

  return (
    <div>
      <div className="signin-container row ">
        <div className="col-6 content-signin">
          <h1 className="text-h1">
            Sign up <br></br>
            and come on in
          </h1>
          <div>
            <section className="image-signin">
              <img src={ImageSignIn} />
            </section>
          </div>
        </div>
        <div className="col-6 title-signin">
          <div>
            <Nav>
              <NavDropdown title="English" id="basic-nav-dropdown">
                <NavDropdown.Item  >English</NavDropdown.Item>
                <NavDropdown.Item  >VietNames</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
          <div className="title-typeform   ">
            TypeForm
          </div>
          <div className="title-1">
            Get better data with conversational forms, surveys, quizzes & more.
          </div>
          <div className="form-content col-6 mx-auto">
            <div className="form-group  ">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group  ">
              <label>Username</label>
              <input
                className="form-control"
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </div>
            <div className="">
              <div className="form-group input-form ">
                <label >Password</label>
                <input
                  className="form-control "
                  type={showHidePassword ? "text" : "password"}
                  onChange={(event) => setPassword(event.target.value)}
                />
                <button
                  className="button-eyes"
                  onClick={() => handleShowhide()}
                >
                  {showHidePassword ? <IoEyeSharp /> : <FaEyeSlash />}
                </button>
              </div>
              <div>
                <input type="checkbox" />
                <label >  I Agree to Typeform's</label><br></br>
                <input type="checkbox" />
                <label>  I Accept to Typeform's use of my data described in </label><br></br>
              </div>
              <div className="">
                <button className="register" onClick={() => handleRegisterUser()}
                >Register</button>
              </div>
              <span
                className="back-login"
                onClick={() => navigate("/login")}>
                Have already an account ? <b>  Login here !</b>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Register