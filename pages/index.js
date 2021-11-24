import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/api'
import { getAPIClient } from '../services/axios'
// import styles from '../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { 
  Container, Row, Col, Table, Navbar, Nav, NavDropdown
} from 'react-bootstrap';
import logo from '../public/logo_sorte_do_povo.png'
import woman from '../public/woman.png'
import txt from '../public/txt.png';
import HeaderSite from '../components/HeaderSite'

export default function Home() {
  const { user } = useContext(AuthContext);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // api.get('/users');
    cadastrarUsuario()
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
    <div>
      <HeaderSite head />
      <Container style={{background: 'rgb(233, 233, 233)', marginTop: '-30px'}} fluid>
        <Container>
          <Row>
            <Col md={6}>
              <div className="blocoTxt">
                <img src={txt.src} alt='Ganhando dinheiro' />
              </div>
            </Col>
            <Col md={6}>
              <div className="blocoImagem">
                <img src={woman.src} alt='Ganhando dinheiro' />
              </div>
            </Col>
          </Row>
        </Container>
      </Container>
      <Container fluid>
        <Container>
          <Row>
            <Col md={12}>
              <div className="tituloBloco">
                <h1>Últimos sorteios</h1>  
              </div>
            </Col>
            <Col md={12}>
              <div className="blocoTxt">
                <div className="tabelaSorteio">
                  {/* <table>
                    <tr>
                      <th className="thTable"></th>
                      <th className="thTable">Ganhador</th>
                      <th className="thTable">Vendedor</th>
                      <th className="thTable">Sorteio</th>
                      <th className="thTable">N° bilhete</th>
                      <th className="thTable">Número sorteado</th>
                    </tr>
                  
                    <tr>
                      <td className="tdlDia">
                        <span>20</span>
                        <span>/Nov</span>
                      </td>
                      <td className="tdlGanhador">Nome do Ganhador</td>
                      <td className="tdlVendedor">Nome do Vendedor</td>
                      <td className="tdlVendedor">005</td>
                      <td className="tdlVendedor">35</td>
                      <td className="tdlNumero">9585</td>
                    </tr>
                  </table> */}
                  <Table responsive>
                    <thead>
                      <tr>
                        <th className="thTable"></th>
                        <th className="thTable">Ganhador</th>
                        <th className="thTable">Vendedor</th>
                        <th className="thTable">Sorteio</th>
                        <th className="thTable">N° bilhete</th>
                        <th className="thTable">Número sorteado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="tdlDia">
                          <span>20</span>
                          <span>/Nov</span>
                        </td>
                        <td className="tdlGanhador">Nome do Ganhador</td>
                        <td className="tdlVendedor">Nome do Vendedor</td>
                        <td className="tdlVendedor">005</td>
                        <td className="tdlVendedor">35</td>
                        <td className="tdlNumero">9585</td>
                      </tr>
                      <tr>
                        <td className="tdlDia">
                          <span>20</span>
                          <span>/Nov</span>
                        </td>
                        <td className="tdlGanhador">Nome do Ganhador</td>
                        <td className="tdlVendedor">Nome do Vendedor</td>
                        <td className="tdlVendedor">005</td>
                        <td className="tdlVendedor">35</td>
                        <td className="tdlNumero">9585</td>
                      </tr>
                      <tr>
                        <td className="tdlDia">
                          <span>20</span>
                          <span>/Nov</span>
                        </td>
                        <td className="tdlGanhador">Nome do Ganhador</td>
                        <td className="tdlVendedor">Nome do Vendedor</td>
                        <td className="tdlVendedor">005</td>
                        <td className="tdlVendedor">35</td>
                        <td className="tdlNumero">9585</td>
                      </tr>
                      <tr>
                        <td className="tdlDia">
                          <span>20</span>
                          <span>/Nov</span>
                        </td>
                        <td className="tdlGanhador">Nome do Ganhador</td>
                        <td className="tdlVendedor">Nome do Vendedor</td>
                        <td className="tdlVendedor">005</td>
                        <td className="tdlVendedor">35</td>
                        <td className="tdlNumero">9585</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
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
    // <div className={styles.container}>
    //   <Head>
    //     <title>Sistema sorte do povo</title>
    //     <meta name="description" content="Generated by create next app" />
    //     <link rel="icon" href="/favicon.ico" />
    //   </Head>

    //   <main className={styles.main}>
    //     <h1 className={styles.title}>
    //       {/* Welcome to {user?.name} */}
    //       Sorte do Povo
    //     </h1>
    //     <div className={styles.grid}>
    //       {/* <a href="https://nextjs.org/docs" className={styles.card}>
    //         <h2>Documentation &rarr;</h2>
    //         <p>Find in-depth information about Next.js features and API.</p>
    //       </a>

    //       <a href="https://nextjs.org/learn" className={styles.card}>
    //         <h2>Learn &rarr;</h2>
    //         <p>Learn about Next.js in an interactive course with quizzes!</p>
    //       </a>

    //       <a
    //         href="https://github.com/vercel/next.js/tree/master/examples"
    //         className={styles.card}
    //       >
    //         <h2>Examples &rarr;</h2>
    //         <p>Discover and deploy boilerplate example Next.js projects.</p>
    //       </a>

    //       <a
    //         href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
    //         className={styles.card}
    //       >
    //         <h2>Deploy &rarr;</h2>
    //         <p>
    //           Instantly deploy your Next.js site to a public URL with Vercel.
    //         </p>
    //       </a> */}
    //     </div>
    //   </main>

    //   {/* <footer className={styles.footer}>
    //     <a
    //       href="https://webativa.com.br"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       WebAtiva
    //     </a>
    //   </footer> */}
    // </div>
  )
}

// export async function getServerSideProps(context) {
//   console.log('context ', context)
//   const apiClient = getAPIClient(context)
//   const { ['sorte_do_povo_token'] : token } = parseCookies(context)
  
//   if(!token){
//     return {
//       redirect: {
//         destination: '/login',
//         permanent: false
//       }
//     }
//   }

//   // await apiClient.get('/users')?

//   return {
//     props: {}, // will be passed to the page component as props
//   }
// }