import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { getAPIClient } from '../../services/axios'
import styles from '../../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, orderBy, limit, startAfter, startAt, endAt, endBefore, getDocs } from "firebase/firestore";
import Header from '../../components/Header'
import { 
    Container, Row, Col, Table, Badge
} from 'react-bootstrap';
import { format } from 'date-fns'

export default function Index() {
    const [listaBilhetes, setListaBilhetes] = useState([])
    const [numerosSorteio, setNumerosSorteio] = useState([]);
    const [qtoBilheteVendido, setQtoBilheteVendido] = useState(0)
    const [valorTotal, setValorTotal] = useState(0);
    const { user, isAuthenticated } = useContext(AuthContext);
    const auth = getAuth();
    const db = getFirestore();
    console.log('isAuthenticated', isAuthenticated)

    useEffect(() => {
        // listarBilhetesVendedor()
        listarNumerosSorteio()
    }, [])

    function somarTotal(qto){
        var valor = qto * 2
        setValorTotal(valor)
    }

    async function listarBilhetesVendedor(numerosorteio){
        var list = []
        setListaBilhetes([])
        const q = query(collection(db, "bilhetesVendidos"),
        where('numeroSorteio', '==', numerosorteio.numero),
        orderBy("numeroBilhete"),
        limit(3000));
    
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

    async function listarNumerosSorteio(){
        // var list = []
        const q = query(collection(db, "numerosSorteio"), orderBy("numero", 'desc'), limit(1));
    
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log("Número de sorteios => ", doc.data());
          // list.push(doc.data())
          setNumerosSorteio(doc.data())
          listarBilhetesVendedor(doc.data())
        });
        // console.log("LISTA NUmeros", list)
      }
    

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
        <Header user={user}/>
            <Container className={styles.container} fluid>
                <Container>
                    <Row>
                        <Col>
                            <div className={'colBloco bloco100'}> 
                                <div>
                                    Sorteio: <span>{numerosSorteio.numero}</span>
                                </div>
                            </div> 
                        </Col>
                        <Col>
                            <div className={'colBloco bloco100'}> 
                                <div>
                                    Bilhetes vendidos: <span>{qtoBilheteVendido}</span>
                                </div>
                                <div>
                                    Valor: <span>{moedaBR(valorTotal)}</span>
                                </div>
                            </div> 
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className={'colBloco'}>
                                <div className={'colBlocoHeader'}>
                                    Últimas vendas
                                </div>
                            </div> 
                        </Col>
                    </Row>
                    <Row>
                        {qtoBilheteVendido != 0 && (
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
                        )}
                        {qtoBilheteVendido === 0 && (
                            <Col>
                                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, background: '#ffff'}}>
                                    Nenhum bilhete foi vendido
                                </div>
                            </Col>
                        )}
                    </Row>
                </Container>
            </Container>
        </div>
    )
}

export async function getServerSideProps(context) {
  const apiClient = getAPIClient(context)
  console.log('context', context)
//   const authContext = AuthContext(context)
//   console.log('authContext', apiClient2)
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