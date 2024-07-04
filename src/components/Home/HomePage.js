import React from 'react'
import VideoHomePage from "../../assets/video/hero.mp4"
import { NavLink } from 'react-router-dom'
const HomePage = (props) => {

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
            <button className='bnt-started'>
              <NavLink to="/signin" className="nav-link" >
                Get Started It-s Free
              </NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}


export default HomePage