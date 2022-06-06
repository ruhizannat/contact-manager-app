import { useContext } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const Navigation = () => {
	const { user, removeAuthInfo } = useContext(AuthContext);
	return (
		<>
			<Navbar bg='light' expand='lg' className='mb-2'>
				<Container className='d-flex flex-row'>
					<Navbar.Brand as={Link} to='/' className='contact-brand'>
						Contact <span className='text-warning'>Manager</span>
					</Navbar.Brand>
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse id='basic-navbar-nav'>
						<Nav className=' ms-auto'>
							<Nav.Link as={NavLink} to='/'>
								Home
							</Nav.Link>

							{user ? (
								<>
									<Nav.Link as={NavLink} to='/contacts'>
										Contacts
									</Nav.Link>
									<Nav.Link as={NavLink} to='/add'>
										Add Contact
									</Nav.Link>
									<Nav.Link onClick={removeAuthInfo}>logout</Nav.Link>
								</>
							) : (
								<>
									<Nav.Link as={NavLink} to='/about'>
										About
									</Nav.Link>
									<Nav.Link as={NavLink} to='/register'>
										Register
									</Nav.Link>
									<Nav.Link as={NavLink} to='/login'>
										Login
									</Nav.Link>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</>
	);
};

export default Navigation;
