import { createContext, useEffect, useState } from "react";
import { recuperarInformacoesUsuario, signInRequest } from "../services/auth";
import Router from "next/router";
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { api } from "../services/api";
import { getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";



export const AuthContext = createContext({})
// export const AuthContext = React.createContext(defaultValue);

export function AuthProvider({ children }){
    const [user, setUser] = useState(null)
    const isAuthenticated = !!user
    const auth = getAuth();

    useEffect(() => {
        const { 'sorte_do_povo_token' : token } = parseCookies()

        if(token){

            onAuthStateChanged(auth, (user) => {
                if (user) {
                  const email = user.email;
                  recuperarInformacoesUsuario(email).then(response => {
                      console.log("Response usuario logado", response)
                      if(response.role != 'Administrativo'){
                        destroyCookie(undefined, 'sorte_do_povo_token')
                        setUser(null)
                        return 
                      }
                      setUser(response)
                  })
                } 
              });
        }
    }, [])

    async function signIn({ email, password }){
        // const { token, user } = await signInRequest({
        //     email,
        //     password
        // })

        await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;

            signInRequest(email).then(response => {
                console.log("Response usuario signInWithEmailAndPassword", response, response.role )
                if(response.role != 'Administrativo'){
                    alert('Você não é administrador')
                    console.log("Saindo do usuario")
                    destroyCookie(undefined, 'sorte_do_povo_token')
                    setUser(null)
                    Router.push('/login')
                    return
                }
                setUser(response)
            })

            setCookie(undefined, 'sorte_do_povo_token', user.accessToken, {
                maxAge: 60 * 60 * 1 // 1 hour
            })
    
            api.defaults.headers['Autorization'] = `Bearer ${user.accessToken}`;

            
            // async function buscarDados(){
            //     const q = query(collection(db, "users"), where("email", "==", email));

            //     const querySnapshot = await getDocs(q);
            //     querySnapshot.forEach((doc) => {
            //         console.log('rrrr' ,doc.data())
            //     });
            // }


            Router.push('/dashboard')
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("Erro ao logar usuário", errorCode, errorMessage)
            if(errorCode === 'auth/user-not-found'){
                alert('Nenhuma usuário foi encontrado')
            }else{
                alert('Erro ao tentar fazer o login')
            }
        });

    }

    async function signout() {
        try {
            signOut(auth).then(() => {
                // Sign-out successful.
                console.log('Saiu do sistema')
                destroyCookie(undefined, 'sorte_do_povo_token')
                setUser(null)
                Router.push('/login')
            }).catch((error) => {
            // An error happened.
                console.log('Erro ao sair do sistema', error)
            });
        } catch (error) {
            console.log('Erro ao sair do sistema trycatch', error)
        }
    }
    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signout }} >
            {children}
        </AuthContext.Provider>
    )
}