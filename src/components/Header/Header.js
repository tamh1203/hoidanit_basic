import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from 'react-router-dom';



const Header = (props) => {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("login")
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
            <button
              className='button_login me-2'
              onClick={() => handleLogin()}

            >Log in</button>
            <button
              className='button_signin'
              onClick={() => navigate("register")}
            >
              SignUP
            </button>
            {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item >Login</NavDropdown.Item>
              <NavDropdown.Item >Logout</NavDropdown.Item>
              <NavDropdown.Item >Profile</NavDropdown.Item>
            </NavDropdown> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
}

export default Header;