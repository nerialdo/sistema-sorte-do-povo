import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { 
  Container, Row, Col, Table, Navbar, Nav, NavDropdown, Tab
} from 'react-bootstrap';
import HeaderSite from '../../components/HeaderSite';
// import logo from '../public/logo_sorte_do_povo.png'
// import woman from '../public/woman.png'
// import txt from '../public/txt.png'

export default function Index() {
  useEffect(() => {
    // api.get('/users');
  }, [])

  
  return (
    <div>
      <HeaderSite />
      <Container fluid>
        <Container>
          <Row>
            <Col md={12}>
              <div className="tituloBloco">
                <h1>Regulamento</h1>  
              </div>
            </Col>
            <Col className='pagina' md={12}>
              <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                            <Nav.Link style={{background: 'green', padding: 20, marginBottom: 10, color: '#f8f8f8'}} eventKey="primeiro">
                                O sorteio
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{background: 'green', padding: 20, marginBottom: 10, color: '#f8f8f8'}}  eventKey="segundo">
                                As apostas 
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{background: 'green', padding: 20, marginBottom: 10, color: '#f8f8f8'}}  eventKey="terceiro">
                                Prazos
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link style={{background: 'green', padding: 20, marginBottom: 10, color: '#f8f8f8'}}  eventKey="quarto">
                                Vendedores
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="primeiro">
                            Em desenvolvimento
                        </Tab.Pane>
                        <Tab.Pane eventKey="segundo">
                            Em desenvolvimento
                        </Tab.Pane>
                        <Tab.Pane eventKey="terceiro">
                            Em desenvolvimento
                        </Tab.Pane>
                        <Tab.Pane eventKey="quarto">
                            Em desenvolvimento
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
                </Tab.Container>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container className='footer' fluid>
        <div>
          Todos os direitos reservados
        </div>
        <div>
          <span>Desenvolvido por </span>
          <a
            href="https://webativa.com.br"
            target="_blank"
            rel="noopener noreferrer"
          >
            WebAtiva
          </a>
        </div>
      </Container>
    </div>
  )
}
