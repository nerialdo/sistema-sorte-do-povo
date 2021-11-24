import '../assets/app.scss';
import {AuthProvider} from '../contexts/AuthContext';
import initAuth from '../services/firebase';

function MyApp({ Component, pageProps }) {

  initAuth()
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
  
}

export default MyApp
