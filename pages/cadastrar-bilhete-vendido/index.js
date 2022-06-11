import { parseCookies } from 'nookies'
import { useContext, useState, useEffect, createRef, ReactDOM  } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { getAPIClient } from '../../services/axios'
import styles from '../../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, orderBy, limit, startAfter, startAt, endAt, endBefore, getDocs, addDoc } from "firebase/firestore";
import Header from '../../components/Header'
import { 
    Container, Row, Col, Form, Button, Table, Modal, ButtonGroup, Badge, ButtonToolbar
} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { format } from 'date-fns';

export default function Index() {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const db = getFirestore();
  const { register, handleSubmit, watch, setValue} = useForm();
  const [listaVendores, setListaVendedores] = useState([])
  const [listaBilhetes, setListaBilhetes] = useState([])
  const [numerosBilhete, setNumerosBilhetes] = useState(null)
  const [show, setShow] = useState(false);
  const [qto, setQto] = useState(2000);
  const [numerosSorteio, setNumerosSorteio] = useState([]);
  const [qtoBilheteVendido, setQtoBilheteVendido] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);


  useEffect(() => {
    // api.get('/users');
    // cadastrarUsuario()
    
    listarNumerosSorteio()
    listarVendores()
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setValue('bilhete', '')
    // setValue('vendedor', '')
    setValue('nome', '')
    setValue('whatsapp', '')
    setNumerosBilhetes(null)
    setShow(true)
  };


  function somarTotal(qto){
    var valor = qto * 2
    setValorTotal(valor)
  }

  async function listarNumerosdoBilhete(numero){
    var list = []
    const q = query(collection(db, "bilhetes"), where("numero", "==", parseInt(numero)));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      // list.push(doc.data().numeros)
      console.log("Lista de bilhetes vendidos", doc.data().numeros)
      setNumerosBilhetes(doc.data().numeros)
    });
    // setNumerosBilhetes(list)
  }

  async function listarVendores(){
    var list = []
    const q = query(collection(db, "users"), where("role", "==", 'vendedor'));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      list.push(doc.data())
    });
    console.log("LISTA", list)
    setListaVendedores(list)
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
    console.log("LISTA NUmeros", list)
    setNumerosSorteio(list)
  }


  async function listarBilhetes(sorteio){
    var list = []
    setListaBilhetes([])
    const q = query(collection(db, "bilhetesVendidos"),
    where('numeroSorteio', '==', sorteio),
    orderBy("numeroBilhete"),
    limit(qto));

    const querySnapshot = await getDocs(q);
    console.log('querySnapshot', querySnapshot.size)
    setQtoBilheteVendido(querySnapshot.size)
    somarTotal(querySnapshot.size)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      list.push(doc.data())
    });
    console.log("LISTA", list)
    setListaBilhetes(list)
  }

  async function listarBilhetesVendedor(vend){

    var list = []
    setListaBilhetes([])
    const q = query(collection(db, "bilhetesVendidos"),
    where('numeroSorteio', '==', watch('numeroSorteio')),
    where('cpfVendendor', '==', vend),
    orderBy("numeroBilhete"),
    limit(qto));

    const querySnapshot = await getDocs(q);
    console.log('querySnapshot', querySnapshot.size)
    setQtoBilheteVendido(querySnapshot.size)
    somarTotal(querySnapshot.size)
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      list.push(doc.data())
    });
    console.log("LISTA", list)
    setListaBilhetes(list)
  }
  async function cadastrarBilhetesFirebase(numerosbilh){
    console.log('numerosbilh', numerosbilh.toString())
    var nomeComprador = watch('nome')
    var telefone = watch('whatsapp')
    var numeroSorteio = watch('numeroSorteio')
    var numeroBilhete = watch('bilhete')
    var cpfVendendor = watch('vendedor')


    //busca o nome do vendedor
    const q = query(collection(db, "users"), where("cpf", "==", cpfVendendor.toString()));

    let nomevn = ''
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      nomevn = doc.data().name
    });

    if(nomeComprador && telefone && numeroSorteio && numeroBilhete && cpfVendendor){
      try {
          // const q = query(collection(fb, "bilhetesVendidos"), where("numeroBilhete", "==", valuesSQL.numero), where("numeroSorteio", "==", valuesSQL.sorteio), where("numerosBilhetes", "==", valuesSQL.numeros));
          const q = query(collection(db, "bilhetesVendidos"), where("numeroBilhete", "==", numeroBilhete), where("numeroSorteio", "==", numeroSorteio), where("numerosBilhetes", "==", numerosbilh.toString()));
          const querySnapshot = await getDocs(q);
  
          // setLoading(true)
  
          console.log('Buscando', querySnapshot.size);
  
          
          if(querySnapshot.size === 0) {
              var data = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
              try {
                  await addDoc(collection(db, "bilhetesVendidos"), {
                      name: nomeComprador,
                      telefone: telefone,
                      numeroSorteio: numeroSorteio, 
                      numeroBilhete: numeroBilhete,
                      numerosBilhetes: numerosbilh.toString(),
                      cpfVendendor: cpfVendendor,
                      nomeVendendor: nomevn,
                      data: data,
                      cidade: 'Pinheiro',
                      status: 'Ativo',
                      obs: ''
                  })
                  console.log("Adicinou no banco")
               
                  // setLoading(false)
                  listarBilhetesVendedor(cpfVendendor)
                  setValue('bilhete', '')
                  setNumerosBilhetes(null)
                  alert('Cadastrado com sucesso')
                  
              } catch (error) {
                  console.log("error cadastro de dados do usuário", error)
                  // setLoading(false)
              }
              
          }else{
              // setLoading(false)
              console.log("Bilhete já está vendido")
              alert('Bilhete já está vendido')
              // await new Promise(resolve => setTimeout(resolve, 2000))
          }
          
      } catch (error) {
          console.log("erro buscar bilhete no firebase", error)
      }
      
    }else{
      alert('Dados incompletos')
    }
    
  }


  // function cadastrarUsuario(){
  //     var nome = watch('nome')
  //     var email = watch('email')
  //     var cp = watch('cpf')
  //     var end = watch('endereco')
  //     var whats = watch('whatsapp')
  //     var pass = watch('password')
  //     createUserWithEmailAndPassword(auth, email, pass)
  //     .then((userCredential) => {
  //         // Signed in
  //         const user = userCredential.user;
  //         // ...
  //         console.log("usuario cadastrado", user)
  //         // Add a new document in collection "cities"
  //         enviar()
  //         async function enviar(
  //           uid = user.uid,
  //           name = nome,
  //           email = user.email,
  //           cpf = cp,
  //           endereco = end,
  //           whatsapp = whats,
  //           password = pass,
  //           role = 'vendedor'
  //         ){
  //             try {
  //                 console.log("Adicionando no banco")
  //                 await setDoc(doc(db, "users", uid), {
  //                     name: name,
  //                     email: email,
  //                     cpf: cpf,
  //                     telefone: whatsapp,
  //                     whatsapp: whatsapp,
  //                     endereco: endereco,
  //                     role: role,
  //                     password: password,
  //                     status: 'Ativo'
  //                 });
  //                 console.log("Adicinou no banco")
  //                 setValue('nome', '');
  //                 setValue('email', '');
  //                 setValue('cpf', '');
  //                 setValue('endereco', '');
  //                 setValue('whatsapp', '');
  //                 setValue('password', '');
  //                 // listarBilhetes()
  //             } catch (error) {
  //                 console.log("error cadastro de dados do usuário", error)
  //             }
  //         }
  //     })
  //     .catch((error) => {
  //         const errorCode = error.code;
  //         const errorMessage = error.message;
  //         // ..
  //         console.log("Erros usuario cadastrado ", errorCode, errorMessage)
  //     });
  // }

  function moedaBR(amount, decimalCount = 2, decimal = ",", thousands = "."){
    try {
      decimalCount = Math.abs(decimalCount);
      decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

      const negativeSign = amount < 0 ? "-" : "";

      let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
      let j = (i.length > 3) ? i.length % 3 : 0;

      return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
      console.log(e)
    }
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
                                Cadastrar bilhetes vendidos
                            </div>
                            <Button onClick={handleShow} variant="success">Adicionar</Button>
                        </div> 
                    </Col>
                </Row>

                <Row>
                    <Col xs={3}>
                      <div className={'colBloco bloco100 blocoFlexLado'}> 
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Número do sorteio</Form.Label>
                              <Form.Select 
                                {...register("numeroSorteio")}
                                onChange={(e) => {
                                  console.log('onChange', e.target.value)
                                  // alert('aqui')
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
                    </Col>
                    <Col xs={3}>
                      <div className={'colBloco bloco100 blocoFlexLado'}> 
                          <Form.Group className="mb-3" controlId="formBasicEmail">
                              <Form.Label>Vendedores</Form.Label>
                              <Form.Select 
                                {...register("vendedor")}
                                onChange={(e) => {
                                  console.log('onChange', e.target.value)
                                  // alert('aqui')
                                  listarBilhetesVendedor(e.target.value)
                                }}
                                name="vendedor"
                                aria-label="Default select example"
                              >
                                <option>Selecione</option>
                                {listaVendores.map((item, key) => (
                                  <option value={item.cpf} key={key}>{item.name}</option>
                                ))}
                              </Form.Select>
                          </Form.Group> 
                      </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className={'colBloco bloco100'}> 
                            <div>
                                Bolhetes vendidos
                            </div>
                            <div>
                                <span>{qtoBilheteVendido}</span>
                            </div>
                        </div> 
                    </Col>
                    <Col>
                        <div className={'colBloco bloco100'}> 
                            <div>
                                Valor total
                            </div>
                            <div>
                                <span>{moedaBR(valorTotal)}</span>
                            </div>
                        </div> 
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <Table striped bordered hover size="sm" responsive="md">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nome</th>
                          <th>Bilhete</th>
                          <th>Numeros</th>
                          <th>Status</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {listaBilhetes.map((item, key) => (
                          <tr key={key}>
                            <td>{key + 1}</td>
                            <td>
                              <p>Cliente: <strong>{item.name}</strong></p>
                              <p>Contato: <strong>{item.telefone}</strong></p>
                              <p>Vendendor: <strong>{item.nomeVendendor}</strong></p>
                            </td>
                            <td>
                              <p>N° Sorteio: <strong>{item.numeroSorteio}</strong></p>
                              <p>N° Bilhete: <strong>{item.numeroBilhete}</strong></p>
                              <p>Cidade: <strong>{item.cidade}</strong></p>
                            </td>
                            <td>
                              <p>Números comprados:</p>
                              <p><strong>{item.numerosBilhetes}</strong></p>
                            </td>
                            <td>
                              <p>{item.status === 'Ativo' ? <Badge bg="success"> {item.status} </Badge> : <Badge bg="danger">{ item.status }</Badge> }</p>
                              
                              <p><strong>Data: {format(new Date(item.data), 'dd/MM/yyyy')}</strong></p>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                    {/* <ButtonToolbar aria-label="Toolbar with button groups">
                      <ButtonGroup className="me-2" aria-label="First group">
                        <Button
                          onClick={() => {listarBilhetes()}}
                        >
                          Anterior
                        </Button>
                        <Button>Próximo</Button>
                      </ButtonGroup>
                    </ButtonToolbar> */}
                  </Col>
                </Row>
            </Container>
        </Container>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Adicionar novo vendedor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
             <Container fluid>
               <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Número do bilhete</Form.Label>
                        <Form.Control 
                          {...register("bilhete")}
                          name="bilhete"
                          type="number" 
                          placeholder="Número do bilhete" 
                        />
                    </Form.Group>
                  </Col>
                  <Col style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} md={4}>
                    <Button onClick={() => {listarNumerosdoBilhete(watch('bilhete'))}} variant="success">Buscar</Button>
                  </Col>
                  <Col md={12}>
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                      {numerosBilhete?.map((item, key) => (
                        <div key={key} style={{margin: 5, background: 'green', color: 'white', padding: 5}}>{item}</div>
                      ))}
                    </div>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control 
                          {...register("nome")}
                          name="nome"
                          type="text" 
                          placeholder="Nome do comprador" 
                        />
                    </Form.Group>
                  </Col>
                  <Col md={12}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Whatsapp/Celular</Form.Label>
                        <Form.Control 
                          {...register("whatsapp")}
                          name="whatsapp"
                          type="text" 
                          placeholder="Whatsapp do vendedor" 
                        />
                    </Form.Group>
                  </Col>
               
               </Row>
             </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Sair
            </Button>
            <Button onClick={() => {cadastrarBilhetesFirebase(numerosBilhete)}} variant="primary">Salvar</Button>
          </Modal.Footer>
        </Modal>
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