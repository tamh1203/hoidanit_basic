import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from '../../Services/apiservice';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';
import { useTranslation } from 'react-i18next';
import { RiReactjsLine } from "react-icons/ri";
import Profile from '../Admin/Dashboard/Profile/Profile';
import { useState } from 'react';

const Header = (props) => {
  const navigate = useNavigate()
  const account = useSelector(state => state.user.account)
  const isAuthorSelector = useSelector(state => state.user.isAuthenticated)

  const [showModalProfile, setShowModalProfle] = useState(false)

  const dispatch = useDispatch()
  const { t, i18n } = useTranslation()
  // console.log("account", account);
  // console.log("check language >>", i18n.language);

  const handleLogin = () => {
    navigate("login")
  }

  const hanldeLogOut = async () => {
    let res = await LogOut(account.email, account.refresh_token)
    if (res && res.EC === 0) {
      dispatch(doLogout())// clear data redux
      navigate("/login")
      toast.success(res.EM)
    } else {
      toast.error(res.EM)
    }
    // console.log("check res logout", res)
  }
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className='icon-react'>
          <RiReactjsLine className='icon' />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className='nav-link' to="/">{t("header.home")}</NavLink>
              <NavLink className='nav-link' to="/users">{t("header.user")}</NavLink>
              <NavLink className='nav-link' to="/admin">{t("header.admin")}</NavLink>
            </Nav>
            <Nav>
              {isAuthorSelector === false ?
                <>
                  <button
                    className='button_login me-2'
                    onClick={() => handleLogin()}
                  >
                    {t("button1.login")}
                  </button>
                  <button
                    className='button_signin'
                    onClick={() => navigate("register")}
                  >
                    {t("button1.signup")}
                  </button>
                </>
                :
                <NavDropdown title={i18n.language == "vi" ? "Cài đặt" : "Settings"} id="basic-nav-dropdown" className='languages'>
                  <NavDropdown.Item
                    onClick={() => setShowModalProfle(true)}
                  >{t("settings.profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    onClick={() => hanldeLogOut()}
                  >
                    {t("settings.logout")}</NavDropdown.Item>
                </NavDropdown>
              }
              <Language />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar >
      <Profile
        show={showModalProfile}
        setShow={setShowModalProfle}
      />
    </>
  );
}

export default Header;