import { initializeApp } from "firebase/app";
const initAuth = () => {
    // Import the functions you need from the SDKs you need
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
      apiKey: "AIzaSyC5dnyXrJXBO2C-z5saAop4j9UCw5y9EYY",
      authDomain: "autenticacaousuario-45044.firebaseapp.com",
      databaseURL: "https://autenticacaousuario-45044.firebaseio.com",
      projectId: "autenticacaousuario-45044",
      storageBucket: "autenticacaousuario-45044.appspot.com",
      messagingSenderId: "595413628134",
      appId: "1:595413628134:web:4eb459c0b1e2d8e6553727"
    };
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
}
export default initAuth