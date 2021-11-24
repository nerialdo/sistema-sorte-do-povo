import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { api } from '../../services/api'
import { getAPIClient } from '../../services/axios'
import styles from '../../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import Header from '../../components/Header'
import { 
    Container, Row, Col, Table
} from 'react-bootstrap';

export default function Index() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const auth = getAuth();
  const db = getFirestore();
console.log('isAuthenticated', isAuthenticated)
  useEffect(() => {
    // api.get('/users');
    // cadastrarUsuario()
  }, [])

  
    function cadastrarUsuario(){
        createUserWithEmailAndPassword(auth, 'nerialdomoreira3@hotmail.com', '123456')
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
            console.log("usuario cadastrado", user)
            // Add a new document in collection "cities"
            enviar()
            async function enviar(
              uid = user.uid,
              name = 'Nerialdo Ferreira Moreira',
              email = user.email,
              role = 'vendedor'
            ){
                try {
                    console.log("Adicionando no banco")
                    await setDoc(doc(db, "users", uid), {
                        name: name,
                        email: email,
                        role: role,
                        telefone: '',
                        whatsapp: '',
                        endereco: ''
                    });
                    console.log("Adicinou no banco")
                } catch (error) {
                    console.log("error cadastro de dados do usuário", error)
                }
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
            console.log("Erros usuario cadastrado ", errorCode, errorMessage)
        });
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
                                Sorteio: <span>0001</span>
                            </div>
                            <div>
                                Bilhetes emitidos: <span>2500</span>
                            </div>
                        </div> 
                    </Col>
                    <Col>
                        <div className={'colBloco bloco100'}> 
                            <div>
                                Bilhetes vendidos: <span>1500</span>
                            </div>
                            <div>
                                Valor: <span>3000,00</span>
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
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Cod</th>
                                    <th>Nome</th>
                                    <th>Vendendor</th>
                                    <th>Contato</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>1</td>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                    <tr>
                                    <td>2</td>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                    </tr>
                                    <tr>
                                    <td>3</td>
                                    <td colSpan="2">Larry the Bird</td>
                                    <td>@twitter</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div> 
                    </Col>
                    {/* <Col xs={5}>
                        <div className={'colBloco'}> teste </div> 
                    </Col>
                    <Col>
                        <div className={'colBloco'}> teste </div> 
                    </Col> */}
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