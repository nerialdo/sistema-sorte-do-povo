import { useContext } from 'react';
import Head from 'next/head'
import { 
    Navbar, 
    Container, 
    Offcanvas,
    Nav,
    Button
} from 'react-bootstrap';
import styles from '../styles/Home.module.css'
import { AuthContext } from '../contexts/AuthContext';
let primeiroNome = []

const Header = (props) => {
    console.log('props', props)
    const { signout } = useContext(AuthContext);

    if(props.user){
        // const primeiroNome = user.name.split(" ")
        // console.log('user Header', props.user)
        const nomeUsuario = props.user.name
        primeiroNome = nomeUsuario.split(' ')
    }
    return (
        <header>
            <Head>
                <title>Painel Sorte do Povo</title>
                <meta name="description" content="Painel sorte do povo" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar bg="primary" className={'navbar'} expand={false}>
                <Container fluid>
                    <Navbar.Toggle aria-controls="offcanvasNavbar" />
                    <Navbar.Brand >Sorte do povo</Navbar.Brand>
                    <Navbar.Brand >{primeiroNome[0]} {' '}<Button onClick={signout} variant="primary">Sair</Button> </Navbar.Brand>
                    <Navbar.Offcanvas
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                        placement="start"
                    >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/gerar-bilhetes">Gerar bilhetes</Nav.Link>
                        <Nav.Link href="/vendedores">Vendedores</Nav.Link>
                        <Nav.Link href="/sorteios-realizados">Sorteios realizados</Nav.Link>
                        <Nav.Link href="/bilhetes-vendidos">Bilhetes vendidos</Nav.Link>
                        <Nav.Link href="/realizar-sorteio">Realizar sorteio</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;