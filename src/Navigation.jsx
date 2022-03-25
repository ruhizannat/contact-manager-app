import{Navbar, Nav, Container} from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

const Navigation = () =>{
    return(
        <>
        <Navbar bg="light" expand="lg" className='mb-4'>
            <Container className='d-flex flex-row'>
                <Navbar.Brand as={Link} to='/' className='contact-brand'>Contact Manager</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className=" ms-auto">
                    <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
                    <Nav.Link as={NavLink}  to="/contacts">Contacts</Nav.Link>
                    <Nav.Link as={NavLink} to="/add">Add Contact</Nav.Link>
                    <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                  
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>
    )
}

export default Navigation