import { useContext } from 'react';
import Head from 'next/head'
import { 
    Navbar, 
    Row,
    Col,
    Container, 
    Nav,
} from 'react-bootstrap';
import logo from '../public/logo_sorte_do_povo.png'


const HeaderSite = (props) => {
    console.log('props', props)

    return (
        <Container className="containerHeader" fluid>
            <Head>
                <title>Sorte do Povo</title>
                <meta name="description" content="Sorteio de rifas" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Container>
                <Row>
                    <Col md={12}>
                    <div className="logoSite">
                        <img src={logo.src} alt='Logo sorte do povo' />
                    </div>
                    </Col>
                    <Col style={{marginBottom: '-5px'}} md={12}>
                    <Navbar className="menuHeader" collapseOnSelect expand="lg" bg="dark" variant="dark">
                        <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/regulamento">Regulamento</Nav.Link>
                            <Nav.Link href="/duvidas-frequentes">Dúvidas frequentes</Nav.Link>
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                            </NavDropdown> */}
                        </Nav>
                        <Nav>
                            <Nav.Link target='_blanck' href="https://api.whatsapp.com/send?phone=5598987757873&text=Preciso%20de%20suporte%20para%20o%20Sorte%20do%20Povo">Suporte</Nav.Link>
                            <Nav.Link target='_blanck' eventKey={2} href="https://api.whatsapp.com/send?phone=5598988445672&text=Ol%C3%A1%2C%20quero%20vender%20bilhetes">
                            Quero vender
                            </Nav.Link>
                        </Nav>
                        </Navbar.Collapse>
                        </Container>
                    </Navbar>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default HeaderSite;