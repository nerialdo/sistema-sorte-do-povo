import Head from 'next/head'
import Image from 'next/image'
import { parseCookies } from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { api } from '../services/api'
import { getAPIClient } from '../services/axios'
// import styles from '../styles/Home.module.css'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc, query, collection, orderBy, getDocs } from "firebase/firestore";
import { 
  Container, Row, Col, Table, Navbar, Nav, NavDropdown
} from 'react-bootstrap';
import logo from '../public/logo_sorte_do_povo.png'
import woman from '../public/woman.png'
import txt from '../public/txt.png';
import HeaderSite from '../components/HeaderSite';
import { format, parseISO } from 'date-fns'

export default function Home() {
  const { user } = useContext(AuthContext);
  const [sorteios, getSorteios] = useState([])
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    // api.get('/users');
    listarSorteio()
  }, [])

  
  async function listarSorteio(){
    try {
        var list = []
        const q = query(collection(db, "sorteiosRealizado"), orderBy("numeroSorteio"));
    
        const querySnapshot = await getDocs(q);
        
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log("sorteios realizados", doc.id, " => ", doc.data());
            list.push(doc.data())
        });
        console.log("LISTA", list)
        getSorteios(list)

    } catch (error) {
        console.log('Erro ao listar ganhadores', error)
    }
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
                      {sorteios.map((item, key) => (
                        <tr key={key}>
                          <td className="tdlDia">
                            <span>{format(parseISO(item.data), 'dd')}</span>
                            <span>/{format(parseISO(item.data), 'MMM')}</span>
                            <span>/{format(parseISO(item.data), 'yyyy')}</span>
                          </td>
                          <td className="tdlGanhador">{item.name}</td>
                          <td className="tdlVendedor">{item.nomeVendendor}</td>
                          <td className="tdlVendedor">{item.numeroSorteio}</td>
                          <td className="tdlVendedor">{item.numeroBilhete}</td>
                          <td className="tdlNumero">{item.numeroSorteado}</td>
                        </tr>
                      ))}
                     
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