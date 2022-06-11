import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { 
  Container, Row, Col, Table, Navbar, Nav, NavDropdown
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
            <Col md={12}>
              <div className="blocoTxt">

              </div>
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
