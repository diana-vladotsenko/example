import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function Menu() {

    return (
        <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="fixed-top">
            <Container fluid>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto ps-2">
                        <Nav.Link as={Link} to="/" className="text-dark"> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/addWord" className="text-dark"> Manage Words
                        </Nav.Link>
                        <Nav.Link as={Link} to="/admins" className="text-dark"> Admins
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;
