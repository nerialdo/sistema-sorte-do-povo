import { parseCookies } from 'nookies'
import { useContext, useState, useEffect, createRef, ReactDOM  } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { getAPIClient } from '../../services/axios'
import styles from '../../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, orderBy, limit, startAfter, startAt, getDocs } from "firebase/firestore";
import Header from '../../components/Header'
import { 
    Container, Row, Col, Form, Button, Table, Modal, ButtonGroup, Badge, ButtonToolbar, Image, Spinner
} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { format } from 'date-fns';
import logo from '../../public/logo_sorte_do_povo.png';
import Lottie from 'react-lottie';
import animationData from '../../public/sucess.json';

export default function Index() {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const db = getFirestore();
  const { register, handleSubmit, watch, setValue} = useForm();
  const [listaBilhetes, setListarBilhetes] = useState([])
  const [listaNumeros, setListaNumeros] = useState([])
  const [numerosSorteio, setNumerosSorteio] = useState([])
  const [listaGanhador, setListarGanhador] = useState()
  const [qtoBilhetes, setQtoBilhetes] = useState(0);
  const [qtoNumeros, setQtoNumeros] = useState(0);
  const [numeroSoteado, setNumeroSoteado] = useState('');
  const [sorteioSelecionado, setSorteioSelecionado] = useState('');
  const [habilitar, setHabilitar] = useState(false);
  const [habilitarInfo, setHabilitarInfo] = useState(false);
  const [numeroPosicao1, setNumeroPosicao1] = useState({'visivel' : false, 'numero': 0});
  const [numeroPosicao2, setNumeroPosicao2] = useState({'visivel' : false, 'numero': 0});
  const [numeroPosicao3, setNumeroPosicao3] = useState({'visivel' : false, 'numero': 0});
  const [numeroPosicao4, setNumeroPosicao4] = useState({'visivel' : false, 'numero': 0});
  
  const [show, setShow] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  useEffect(() => {
    // api.get('/users');
    // cadastrarUsuario()
    // listarBilhetes()
    listarNumerosSorteio()
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function listarNumerosSorteio(){
    var list = []
    const q = query(collection(db, "numerosSorteio"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      list.push(doc.data())
    });
    console.log("LISTA NUmeros", list)
    setNumerosSorteio(list)
  }


  function sortear(qto, listnumeros){
    if(!sorteioSelecionado){
      alert('Defina o número do sorteio')
      return
    }
    setListarGanhador('')
    setHabilitarInfo(false)
    // var te = listaBilhetes.find(el => {
    //   // console.log('el', el)
    //   var t = el.numerosBilhetes.includes('1111')
    //   console.log('ttt', t)
    //   return t
    // })
    // console.log('listaBilhetes', te)


    console.log("Lista de numeos", listnumeros)
    setHabilitar(true)
    var num = Math.floor(Math.random() * qto);
    console.log('Num', num, listnumeros)
    console.log('numeros', listnumeros[num])
    if(listnumeros[num]){
      mostrarNumero(listnumeros[num])
    }else{
      alert('Erro tente novamente')
      setHabilitar(false)
    }
  }

  async function mostrarNumero(num){
    const convertidoEmString = num.toString()
    const transformarArray = convertidoEmString.split("")
    console.log('transformarArray ', transformarArray)
    setNumeroPosicao1({'visivel' : true, 'numero': 0})
    setNumeroPosicao2({'visivel' : true, 'numero': 0})
    setNumeroPosicao3({'visivel' : true, 'numero': 0})
    setNumeroPosicao4({'visivel' : true, 'numero': 0})
    await new Promise(resolve => setTimeout(resolve, 4000))
      console.log('Aqui 1')
      setNumeroPosicao1({'visivel' : false, 'numero': transformarArray[0]})
    await new Promise(resolve => setTimeout(resolve, 4000))
      console.log('Aqui 2')
      setNumeroPosicao2({'visivel' : false, 'numero': transformarArray[1]})
    await new Promise(resolve => setTimeout(resolve, 4000))
      console.log('Aqui 3')
      setNumeroPosicao3({'visivel' : false, 'numero': transformarArray[2]})
    await new Promise(resolve => setTimeout(resolve, 4000))
      console.log('Aqui 4')
      setNumeroPosicao4({'visivel' : false, 'numero': transformarArray[3]})

    setHabilitar(false)
    buscarJogador(convertidoEmString)
  }

  async function cadastrarBilhetePremiado(dados){
    var data = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
    try {
      console.log("Adicionando no banco", dados)
      await setDoc(doc(db, "sorteiosRealizado", dados.numeroSorteio), {
        cidade: dados.cidade,
        cpfVendendor: dados.cpfVendendor,
        data: data,
        name: dados.name,
        nomeVendendor: dados.nomeVendendor,
        numeroBilhete: dados.numeroBilhete,
        numeroSorteio: dados.numeroSorteio,
        numerosBilhetes: dados.numerosBilhetes,
        obs: dados.obs,
        status: 'Ativo',
        telefone: dados.telefone
      });
      console.log("Adicinou no banco")
    } catch (error) {
        console.log("error cadastro bilhete premiado", error)
    }
  } 

  async function buscarJogador(num){

    var te = listaBilhetes.find(el => {
      // console.log('el', el)
      var t = el.numerosBilhetes.includes(num)
      console.log('ttt', t)
      return t
    })
    console.log('listaBilhetes', te)


    // adicionar bilhete premiado no banco
    cadastrarBilhetePremiado(te)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setListarGanhador(te)
    setHabilitarInfo(true)
  }

  async function listarBilhetes(numSort){
    // const jungle = [
    //   { name: "frog", threat: 0 },
    //   { name: "monkey", threat: 5 },
    //   { name: "gorilla", threat: 8 },
    //   { name: "lion", threat: 10 }
    // ];
    
    // // break the object down in order to use .includes() or .indexOf()
    // const names = jungle.map(el => el.name); // returns ['frog', 'monkey', 'gorilla', 'lion']
    // console.log(names.includes("gorilla")); // returns true
    // console.log(names.indexOf("lion")); // returns 3 - which corresponds correctly assuming no sorting was done
    
    // // methods we can do on the array of objects
    // console.log("====>", jungle.find(el => el.threat == 5)); // returns object - {name: "monkey", threat: 5}
    // console.log("======>", jungle.filter(el => el.threat > 5)); // returns array - [{name: "gorilla", threat: 8}, {name: 'lion', threat: 10}]

    var list = []
    var newList = []
    setHabilitar(true)
    setListaNumeros([])
    try {
      const q = query(collection(db, "bilhetesVendidos"),  
      where("cidade", "==", "Pinheiro"),  
      where("numeroSorteio", "==", numSort),
      where("status", "==", "Ativo"));

      const querySnapshot = await getDocs(q);
      setQtoBilhetes(querySnapshot.size)
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data().numerosBilhetes);
        console.log("doc.data()", doc.data())
        newList.push(doc.data())
        var docData = doc.data().numerosBilhetes;
        var replace = docData.replace(/"/g,"");
        var newArray = docData.split(',')
        // console.log("replace", parseInt(newArray))
        for (let n = 0; n < newArray.length; n++) {
          const element = newArray[n];
          // console.log("docData", element)
          list.push(parseInt(element))
        }
        setHabilitar(false)
      });
    } catch (error) {
      console.log('Erro ao listarBiletes', error)
      alert('Não conseguimos listar os bilhetes vendidos, tente novamente.')
    }
    console.log("LISTA", list)
    setQtoNumeros(list.length)
    setListarBilhetes(newList)
    setListaNumeros(list)
  }


  return (
    <div className={'contentSorteio'}>
      {/* <Header /> */}
        <Container className={styles.container} fluid>
            <Container>
                <Row>
                    <Col>
                        <div className={'colBlocoSorteioHeader'}>
                            <Button onClick={handleShow} variant="success">N</Button>
                            <span>Sorteio: {sorteioSelecionado}</span>
                            <span>Data: {format(new Date(), 'dd/MM/yyyy')}</span>
                            <span>Quantidade de bilhetes: {qtoBilhetes}</span>
                            {/* <Button onClick={handleShow} variant="success">ADD</Button> */}
                        </div> 
                        <div className={'colBlocoSorteio'}>
                          <Image style={{maxHeight: 200}} src={logo.src} rounded />
                        </div>
                        <div className={'colBlocoSorteio'}>
                            <div className={'numerosSorteio'}>
                                <span>{numeroPosicao1.numero}</span>
                                {numeroPosicao1.visivel && (
                                  <div className="loading1">
                                    <Spinner animation="grow" variant="warning" />
                                  </div>
                                )}
                            </div>
                            <div className={'numerosSorteio'}>
                                <span>{numeroPosicao2.numero}</span>
                                {numeroPosicao2.visivel && (
                                  <div className="loading1">
                                    <Spinner animation="grow" variant="warning" />
                                  </div>
                                )}
                            </div>
                            <div className={'numerosSorteio'}>
                                <span>{numeroPosicao3.numero}</span>
                                {numeroPosicao3.visivel && (
                                  <div className="loading1">
                                    <Spinner animation="grow" variant="warning" />
                                  </div>
                                )}
                            </div>
                            <div className={'numerosSorteio'}>
                                <span>{numeroPosicao4.numero}</span>
                                {numeroPosicao4.visivel && (
                                  <div className="loading1">
                                    <Spinner animation="grow" variant="warning" />
                                  </div>
                                )}
                            </div>
                        </div>
                        {habilitarInfo && (
                          <Row>
                            <Col md={4}>
                              <Lottie 
                                options={defaultOptions}
                                  height={100}
                                  width={200}
                              />
                            </Col>
                            <Col md={4}>
                              <div className={'colBlocoSorteio'}>
                                <div>
                                  <p>Ganhador: <strong>{listaGanhador.name}</strong></p>
                                  <p>Telefone do ganhador: <strong>{listaGanhador.telefone}</strong></p>
                                  <p>Vendedor: <strong>{listaGanhador.nomeVendendor}</strong></p>
                                </div>
                              </div>
                            </Col>
                            <Col md={4}>
                              <Lottie 
                                options={defaultOptions}
                                  height={100}
                                  width={200}
                              />
                            </Col>
                          </Row>
                        )}
                        <div className={'colBlocoSorteio'}>
                          {!habilitar && (
                            <Button style={{padding: 10, width: 200}} onClick={() => sortear(qtoNumeros, listaNumeros)} variant="success">Sortear</Button>
                          )}
                        </div>
                    </Col>
                </Row>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Selecione o sorteio</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                      <div className={'colBloco bloco100 blocoFlexLado'}> 
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Número do sorteio</Form.Label>
                              <Form.Select 
                                {...register("numeroSorteio")}
                                onChange={(e) => {
                                  console.log('onChange', e.target.value)
                                  // alert('aqui')
                                  setSorteioSelecionado(e.target.value)
                                  listarBilhetes(e.target.value)
                                }}
                                name="numeroSorteio"
                                aria-label="Default select example"
                              >
                                <option>Selecione</option>
                                {numerosSorteio.map((item, key) => (
                                  <option value={item.numero} key={key}>{item.numero}</option>
                                ))}
                              </Form.Select>
                          </Form.Group> 
                      </div>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Sair
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                      Selecionar
                    </Button>
                  </Modal.Footer>
                </Modal>
            </Container>
        </Container>
    </div>
  )
}

export async function getServerSideProps(context) {
  // console.log('context ', context)
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