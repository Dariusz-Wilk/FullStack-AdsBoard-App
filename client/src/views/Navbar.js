import { NavLink } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { getLoggedUser } from '../redux/usersRedux';

const NavBar = () => {
	const loggedUser = useSelector(getLoggedUser);

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
					{!loggedUser && (
						<>
							<Nav.Link as={NavLink} to="/login">
								Login
							</Nav.Link>
							<Nav.Link as={NavLink} to="/register">
								Register
							</Nav.Link>
						</>
					)}
					{loggedUser && (
						<>
							<Nav.Link as={NavLink} to="/ad/add">
								New Ad
							</Nav.Link>
							<Nav.Link as={NavLink} to="/logout">
								Logout
							</Nav.Link>
						</>
					)}
				</Nav>
			</Container>
		</Navbar>
	);
};

export default NavBar;
