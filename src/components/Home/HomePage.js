import React from 'react'
import VideoHomePage from "../../assets/video/hero.mp4"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const HomePage = (props) => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()
  return (
    <>
      <div className='homepage-container'>
        <div>
          <video loop autoPlay muted >
            <source src={VideoHomePage}
              type="video/mp4" />
            /</video>
        </div>
        <div className='hompage-content'>
          <div className='titel-fisrt'>
            Make forms
            worth filling out
          </div>
          <div className='titel-second'>
            Get more data—like signups, feedback,
            and anything else—with forms designed to be <span className='text-bold'>refreshingly different. </span>
          </div>
          <div>
            {isAuthenticated === false
              ?
              <button className='bnt-started'>
                <NavLink to="/login" className="nav-link" >
                  Get Started It-s Free
                </NavLink>
              </button>
              :
              <button
                className='bnt-started'
                onClick={() => navigate("/users")}
              > Start Quiz Now </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}


export default HomePage