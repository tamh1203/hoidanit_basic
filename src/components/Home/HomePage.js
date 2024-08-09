import React from 'react'
import VideoHomePage from "../../assets/video/hero.mp4"
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {

  const isAuthenticated = useSelector(state => state.user.isAuthenticated)
  const navigate = useNavigate()
  const { t } = useTranslation();

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
            {t('homepage.title1')}
          </div>
          <div className='titel-second'>
            {t('homepage.title2')}
          </div>
          <div className='titel-third'>
            {isAuthenticated === false
              ? <button className='bnt-started'>
                <NavLink to="/login" className="nav-link" >
                  {t('homepage.title3.login')}
                </NavLink>
              </button>
              :
              <button
                className='bnt-started'
                onClick={() => navigate("/users")}
              >
                {t('homepage.title3.startquiz')}
              </button>
            }
          </div>
        </div>
      </div>
    </>
  )
}


export default HomePage