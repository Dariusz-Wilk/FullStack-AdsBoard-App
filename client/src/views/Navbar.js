import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NavBar = () => {
	return (
		<Navbar bg="dark" data-bs-theme="dark">
			<Container>
				<Navbar.Brand as={NavLink} to="/">
					AdsBoard.app
				</Navbar.Brand>
				<Nav className="me-0">
					<Nav.Link as={NavLink} to="/">
						Home
					</Nav.Link>
					<Nav.Link as={NavLink} to="/login">
						Login
					</Nav.Link>
					<Nav.Link as={NavLink} to="/register">
						Register
					</Nav.Link>
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBar;
