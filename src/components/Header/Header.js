import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { LogOut } from '../Services/apiservice';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
import Language from './Language';

const Header = (props) => {
  const navigate = useNavigate()
  const account = useSelector(state => state.user.account)
  const isAuthorSelector = useSelector(state => state.user.isAuthenticated)

  const dispatch = useDispatch()

  console.log("account", account);

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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <NavLink className='nav-link' to="/">React BootStrap</NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className='nav-link' to="/">Home</NavLink>
            <NavLink className='nav-link' to="/users">User</NavLink>
            <NavLink className='nav-link' to="/admin">Admin</NavLink>
          </Nav>
          <Nav>
            {isAuthorSelector === false ?
              <>
                <button
                  className='button_login me-2'
                  onClick={() => handleLogin()}
                >Log in
                </button>
                <button
                  className='button_signin'
                  onClick={() => navigate("register")}
                >
                  SignUP
                </button>
              </>
              :
              <NavDropdown title="Settings" id="basic-nav-dropdown">
                <NavDropdown.Item >Profile</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => hanldeLogOut()}
                >
                  Logout</NavDropdown.Item>
              </NavDropdown>
            }
            <Language />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default Header;