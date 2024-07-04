import React from "react"
import ImageSignIn from "../../product-sample@1x.png"
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';

const SignIn = (props) => {
  return (
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
      </div>
    </div>
  )
}

export default SignIn