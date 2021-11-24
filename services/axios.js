import axios from 'axios';
import { parseCookies } from "nookies";

export function getAPIClient(ctx){
    // console.log("ctxctxctxctx", ctx)
    const { 'sorte_do_povo_token' : token } = parseCookies(ctx)

    const api = axios.create({
        baseURL: 'http://localhost:3333'
    })

    api.interceptors.request.use(config => {
        console.log("config getAPIClient", config);

        return config
    })

    if(token){
        api.defaults.headers['Autorization'] = `Bearer ${token}`
    }

    return api
}