import {v4 as uuid} from 'uuid';
import { getFirestore, doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
const delay = (amount = 750) => new Promise(resolve => setTimeout(resolve, amount))
export async function signInRequest(props){
    const db = getFirestore();
    // await delay()

    // return {
    //     token: uuid(),
    //     user: {
    //         name: 'Nerialdo Ferreira Moreira',
    //         email: 'nerialdo@gmail.com',
    //         avatar_url: 'https://github.com/nerialdo.png'
    //     }

    // }
    console.log('Buscar usuario props', props)
    var usuario = []
    const q = query(collection(db, "users"), where("email", "==", props));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        usuario.push(doc.data())
    });


    return usuario[0]
}

export async function recuperarInformacoesUsuario(props){
    // console.log('props recuperar usuario', props)
    const db = getFirestore();
    //  await delay()

    //  return {
    //     user: {
    //         name: 'Nerialdo Ferreira Moreira',
    //         email: 'nerialdo@gmail.com',
    //         avatar_url: 'https://github.com/nerialdo.png'
    //     }
    // }

    var usuario = []
    const q = query(collection(db, "users"), where("email", "==", props));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        usuario.push(doc.data())
    });


    return usuario[0]
      
}