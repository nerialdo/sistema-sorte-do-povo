import { useContext, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { 
  Container, Row, Col, Accordion, Table, Navbar, Nav, NavDropdown, Tab
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
                <h1>Dúvidas frequentes</h1>  
              </div>
            </Col>
            <Col className='pagina' md={12}>
              <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Como posso receber meu prêmio?</Accordion.Header>
                  <Accordion.Body>
                    Após o sorteio, entramos em contato com o ganhador, através do número de telefone, 
                    e combinado a forma de entrega do valor, que pode ser por transferência bancaria, PIX, ou pessoalmente.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Até que dia posso receber meu prêmio?</Accordion.Header>
                  <Accordion.Body>
                  Após fazermos a ligação de contato com o ganhador e o número for insistente ou não atender, 
                  o nome do ganhador será divulgado nas nossas redes sociais e ficará disponível no nosso site, 
                  na pagina principal. O ganhador poderá receber até 15 dias, após o sorteio. Depois desse prazo, 
                  o valor voltará para ser sorteado novamente.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Fui sorteado e perdir meu bilhete, o que devo fazer?</Accordion.Header>
                  <Accordion.Body>
                   Não se preocupe, o seu prêmio está garantido, o nosso sorteio é eletrónico e por 
                   isso sabemos exatamente que você é o ganhador.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Onde os sorteios são realizados?</Accordion.Header>
                  <Accordion.Body>
                    Os sorteios são realizados na nossa cede, são gravado e disponibilizados nas nossas redes sociais.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="4">
                  <Accordion.Header>Como é feito o sorteio?</Accordion.Header>
                  <Accordion.Body>
                    O nosso sistema é totalmente eletrónico, o sorteio é feito a partir da nossa plataforma online.
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="5">
                  <Accordion.Header>Se os sorteios são eletrônicos, eu posso confiar?</Accordion.Header>
                  <Accordion.Body>
                    Sim, prezamos sempre pela transparência, como falado anteriormente, 
                    os nossos sorteios são eletrónicos, e funciona da seguinte forma:
                    Os nossos vendedores possuem um aplicativo que lê o QrCode de cada bilhete vendido, 
                    e em cada bilhete possui 05 sequência de 04 números, ou seja, cada bilhete possui 
                    05 chances de ganhar, esses números são salvos em sequência no nosso banco de dados, 
                    quando o nosso operador de sorteio clica no botão para sortear, 
                    o nosso sistema irá buscar um (01) número entre todos os que foram vendidos desse sorteio.
                    Dessa forma um sorteio nunca irá acumular.
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
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
