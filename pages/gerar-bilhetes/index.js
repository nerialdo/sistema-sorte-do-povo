import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useContext, useState, useEffect, createRef, ReactDOM  } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { getAPIClient } from '../../services/axios'
import styles from '../../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, query, collection, getDocs, Timestamp } from "firebase/firestore";
import Header from '../../components/Header'
import { 
    Container, Row, Col, Form, Button, Modal
} from 'react-bootstrap';
import QRCode from 'qrcode.react';
import Pdf from "react-to-pdf";
import logo from '../../public/logo_sorte_do_povo.png';
// import PdfMy from '../../components/Pdf'
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
// import { Impressao } from './impressao';
import MovieList from '../../components/Pdf';
import { PdfDocument } from "../../components/Movie";
import dynamic from "next/dynamic";
const GeneratePDF = dynamic(()=>import("../../components/GeneratePDF"),{ssr:false});
import { useForm } from "react-hook-form";

export default function Index() {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const db = getFirestore();
  const ref = createRef();
  const ref2 = createRef();
  const [novo, setNovo] = useState(true);
  const [bilhetes, setBilhetes] = useState([]);
  const [numerosSorteio, setNumerosSorteio] = useState([]);
  const { register, handleSubmit, watch, setValue} = useForm();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const options = {
    orientation: 'portrait',
    unit: 'cm',
    format: 'a4',
    putOnlyUsedFonts:true,
    floatPrecision: 16 ,
    autoPaging: true
  };

  useEffect(() => {
    // api.get('/users');
    // cadastrarUsuario()
    listarNumerosSorteio()
  }, [])

  // const visualizarImpressao = async () => {
  //   const classeImpressao = new Impressao(bilhetes);
  //   console.log("classeImpressao", classeImpressao, bilhetes)
  //   // const documento = classeImpressao.gerarDocumento();
  //   const documento = await classeImpressao.PreparaDocumento();
  //   pdfMake.createPdf(documento).open({}, window.open('', '_blank'));
  // }

  const aplicarQto = (val) => {
    console.log('Gerando dados ', parseInt(watch("qtobilhete")), parseInt(watch("inicio")), parseInt(watch("inicioNumeros")))
    var qto = parseInt(watch("qtobilhete"))
    var inicio = parseInt(watch("inicio")) + qto
    var inicioNumeros = parseInt(watch("inicioNumeros")) + qto
    // var qtoVal = parseInt(val)
    // var total = qtoVal + qto
    var arrayBilhetes = []
    setValue('inicio', inicio)
    setValue('inicioNumeros', inicioNumeros * 5)
  }

  const gerarNovo = () => {
    setNovo(true)
  }

  async function listarNumerosSorteio(){
    var list = []
    const q = query(collection(db, "numerosSorteio"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      list.push(doc.data())
    });
    console.log("LISTA", list)
    setNumerosSorteio(list)
  }
  
  async function cadastrarNumeroSorteio(){
    var numerosorteio = watch('numerosorteio')
    try {
      console.log("Adicionando no banco")
      await setDoc(doc(db, "numerosSorteio", numerosorteio), {
          numero: numerosorteio,
          status: 'Ativo',
          dataCadastro: Timestamp.fromDate(new Date()),
      });
      console.log("Adicinou no banco")
      handleClose()
      listarNumerosSorteio()
    } catch (error) {
        console.log("error cadastro de dados", error)
    }
  }

  function gerarBilhete(){
    var qto = parseInt(watch("qtobilhete"))
    var arrayBilhetes = []
    var arrayNumerosBilhetes = []
    var inicialNumeros = parseInt(watch("inicioNumeros"));
    var inicial = parseInt(watch("inicio"))
    for (let b = 0; b < qto; b++) {
      inicial = inicial += 1
      console.log("Gerando", inicial)
      setValue('inicio', inicial)
      arrayNumerosBilhetes = []
      for (let n = 0; n < 5; n++) {
        inicialNumeros = inicialNumeros += 1
        
        arrayNumerosBilhetes.push(inicialNumeros)
      }
      console.log("Gerou 5", arrayNumerosBilhetes[4])
      setValue('inicioNumeros', arrayNumerosBilhetes[4])
      arrayBilhetes.push(
        {
          'numero' : inicial, 
          'numeros': arrayNumerosBilhetes
        },
        // {'sorteio' : '0001'}
      )
      console.log("arrayBilhetes", arrayBilhetes)
    }
    setNovo(false)
    setBilhetes(arrayBilhetes)
  }


  return (
    <div className={styles.container}>
      <Header />
        <Container className={styles.container} fluid>
            <Container>
                <Row>
                    <Col>
                        <div className={'colBloco'}>
                            <div className={'colBlocoHeader'}>
                                Gerar bilhetes
                            </div>
                        </div> 
                    </Col>
                    {/* <Col xs={5}>
                        <div className={'colBloco'}> teste </div> 
                        </Col>
                        <Col>
                        <div className={'colBloco'}> teste </div> 
                    </Col> */}
                </Row>
                <Row>
                  <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
                    {numerosSorteio.map((item, key) => (
                      <div key={key} style={{background: 'green', color: 'white', padding: 10, marginRight: 10}}>{item.numero}</div>
                    ))}
                  </div>
                  <Col xs={12}>
                    <Button style={{marginTop: 15}} variant="primary" onClick={handleShow}>
                      Adicionar novo número de sorteio
                    </Button>
                    {/* <Button style={{marginTop: 15}} variant="info" onClick={() => {aplicarQto(watch("qtobilhete"))}}>
                      Aplicar {watch("qtobilhete")}
                    </Button> */}
                  </Col>
                </Row>
                <Row>
                    {/* <Col xs={3}>
                        <div className={'colBloco bloco100 blocoFlexLado'}> 
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Número do sorteio</Form.Label>
                              <Form.Select 
                                {...register("numeroSorteio")}
                                name="numeroSorteio"
                                aria-label="Default select example"
                              >
                                {numerosSorteio.map((item, key) => (
                                  <option value={item.numero} key={key}>{item.numero}</option>
                                ))}
                              </Form.Select>
                            </Form.Group> 
                            <Button style={{marginTop: 15}} variant="primary" onClick={handleShow}>
                              Add
                            </Button>
                        </div> 
                    </Col> */}
                    <Col xs={4}>
                        <div className={'colBloco bloco100 blocoFlexCenter'}> 
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Quatidade de bilhete</Form.Label>
                                <Form.Control 
                                  {...register("qtobilhete")}
                                  name="qtobilhete"
                                  type="number"
                                  placeholder="Quatidade de bilhete" 
                                />
                            </Form.Group>
                        </div> 
                    </Col>
                    <Col xs={4}>
                        <div className={'colBloco bloco100 blocoFlexCenter'}> 
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Iniciar em número</Form.Label>
                                <Form.Control 
                                  {...register("inicio")}
                                  // value={0}
                                  name="inicio"
                                  type="number"
                                  placeholder="Início" 
                                />
                            </Form.Group>
                        </div> 
                    </Col>
                    <Col xs={4}>
                        <div className={'colBloco bloco100 blocoFlexCenter'}> 
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Iniciar em números</Form.Label>
                                <Form.Control 
                                  {...register("inicioNumeros")}
                                  // value={1000}
                                  name="inicioNumeros"
                                  type="number"
                                  placeholder="Início" 
                                />
                            </Form.Group>
                        </div> 
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <div className={'colBloco blocoFlexCenter'}>
                      {novo &&(
                        <Button onClick={() => {gerarBilhete()}} style={{width: '100%'}} variant="primary">Gerar</Button>
                      )}
                      {!novo &&(
                        <Button onClick={() => {gerarNovo()}} style={{width: '100%'}} variant="primary">Novo</Button>
                      )}
                    </div>
                   
                    {/* <div>
                        <Pdf targetRef={ref} filename="div-blue.pdf" options={options}>
                            {({toPdf}) => (
                                <button onClick={toPdf}>Generate pdf</button>
                            )}
                        </Pdf>
                        <div style={{width: '100%'}} ref={ref}>
                          teste
                        </div>
                    </div> */}
                  </Col>
                </Row>
                <Row id="text2" style={{marginLeft: 0, width: 900}} ref={ref}>
                    {/* {bilhetes.map((item, key) => (
                      <div className="listaBilhetes" key={key}>
                          <div className="bilhete">
                            <div className="bilhete-lado1">
                            {item.numero}
                            </div>
                            <div className="bilhete-lado2">
                              <div className="bilhete-lado2-imgs">
                                <img style={{width: 80, margin: 5}} src={'https://www.tailorbrands.com/wp-content/uploads/2020/07/twitter-logo.jpg'} alt="logo"/>
                                <QRCode
                                  style={{margin: 5}}
                                  value={"1254 8545 8965 7896"}
                                  size={80}
                                  bgColor={"#ffffff"}
                                  fgColor={"#000000"}
                                  level={"M"}
                                  includeMargin={false}
                                  renderAs={"svg"}
                                />

                              </div>
                              <span style={{fontSize: 11}}>Sorteio Diário</span>
                              <span style={{fontSize: 14}}>Sorte do Povo</span>
                              <span style={{fontSize: 11}}>Este nunca acumula</span>
                              <div style={{display: 'flex', flexDirection: 'row'}}>
                                <span>{item.numeros[0]}</span>
                                <span>{item.numeros[1]}</span>
                                <span>{item.numeros[2]}</span>
                                <span>{item.numeros[3]}</span>
                                <span>{item.numeros[4]}</span>
                              </div>
                            </div>
                          </div>
                      </div>
                    ))} */}
                    {/* <button className="btn" onClick={visualizarImpressao}>
                      Visualizar documento
                    </button> */}
                    {!novo && (
                      <MovieList bilhetes={bilhetes} qtobilhete={watch("qtobilhete")}/>
                    )}
                    {/* <GeneratePDF html={ref2}/> */}
                </Row>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Cadastrar número do sorteio</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Cadastrar número</Form.Label>
                        <Form.Control 
                        {...register("numerosorteio")}
                        name="numerosorteio"
                        type="text" 
                        placeholder="Número do sorteio" 
                        />
                    </Form.Group> 
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Fechar
                    </Button>
                    <Button variant="primary" onClick={() => {cadastrarNumeroSorteio()}}>
                      Salvar
                    </Button>
                  </Modal.Footer>
                </Modal>
            </Container>
        </Container>
    </div>
  )
}

export async function getServerSideProps(context) {
  console.log('context ', context)
  const apiClient = getAPIClient(context)
  const { ['sorte_do_povo_token'] : token } = parseCookies(context)
  
  if(!token){
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // await apiClient.get('/users')?

  return {
    props: {}, // will be passed to the page component as props
  }
}