import React, { useContext } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Login.module.css';
import Link from 'next/link'
import Layout from "../../components/Layout";
import { Form, FormControl, Button, FormLabel, FormGroup } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { AuthContext } from '../../contexts/AuthContext';
import { getAPIClient } from '../../services/axios';
import { parseCookies } from 'nookies'


export default function Login() {
    const { register, handleSubmit, watch} = useForm();
    const { signIn } = useContext(AuthContext);

    async function onSubmit(data){
        try {
            console.log("Dados form", data);
            await signIn(data)
        } catch (error) {
            console.log("Erro onSubmit", error)
        }
    }
    console.log(watch("email")); 
    
    return (
        <>
        <Head>
          <title>Login administrativo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
            <div className="login-wrap">
                <Form className="form-signin" onSubmit={handleSubmit(onSubmit)}>
                    <img className="mb-4" alt="" width="72" height="72" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" />
                    <h1 className="h3 mb-3 font-weight-normal">Entre com seus dados</h1>
                    <FormGroup>
                        <FormLabel>Email</FormLabel>
                        <FormControl 
                            {...register("email")}
                            name="email"
                            type="text" 
                            placeholder="useremail@domain.com" 
                            className="mr-sm-2" 
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Senha 
                            {/* <Link href="/"><a>Forgot Password?</a></Link> */}
                        </FormLabel>
                        <FormControl 
                            {...register("password")}
                            name="password"
                            type="password" 
                            className="mr-sm-2" 
                        />
                    </FormGroup>
                    <Button 
                        type="submit"
                        style={{width: '100%', marginTop: 30, background: 'red'}} 
                        className="btn-lg btn-block" 
                        variant="primary"
                    >
                        Entrar
                    </Button>
                </Form>
            </div>
        </Layout>
      </>
    )
}

export async function getServerSideProps(context) {
    const apiClient = getAPIClient(context)
    const { ['sorte_do_povo_token'] : token } = parseCookies(context)
    
    if(token){
      return {
        redirect: {
          destination: '/dashboard',
          permanent: false
        }
      }
    }
  
    // await apiClient.get('/users')?
  
    return {
      props: {}, // will be passed to the page component as props
    }
}