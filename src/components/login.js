import {
  getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword,
} from 'firebase/auth';

import firebaseApp from './firebase.js';

function login(navigateTo) {
  const logo = document.createElement('img');
  logo.setAttribute('src', '/assets/Colective_isCool!_(1).png');
  logo.setAttribute('alt', 'Colective_isCool');
  logo.setAttribute('id', 'logo');

  const logoGoogle = document.createElement('img');
  logoGoogle.setAttribute('src', '/assets/logo-google.png');
  logoGoogle.setAttribute('alt', 'logo-google');
  logoGoogle.setAttribute('id', 'logo-google');

  const section = document.createElement('section');
  const titleLogin = document.createElement('h2');
  titleLogin.textContent = 'Inicio de sesión';
  titleLogin.classList.add('login-title');

  // elementos para correo y contraseña
  const emailInput = document.createElement('input');
  emailInput.setAttribute('type', 'email');
  emailInput.setAttribute('placeholder', 'Correo electronico');
  emailInput.setAttribute('id', 'emailInput');
  emailInput.setAttribute('name', 'emailInput');

  const passwordInput = document.createElement('input');
  passwordInput.setAttribute('type', 'password');
  passwordInput.setAttribute('placeholder', 'Contraseña');
  passwordInput.setAttribute('id', 'passwordInput');
  passwordInput.setAttribute('name', 'passwordInput');

  // Crear enlaces para registrarse y recuperar contraseña
  const signUpLink = document.createElement('a');
  signUpLink.textContent = 'Registrarse';
  signUpLink.setAttribute('href', '/newUser'); // hay que poner la url
  signUpLink.classList.add('sign-up');

  const forgotPasswordLink = document.createElement('a');
  forgotPasswordLink.textContent = '¿olvidasete tu contraseña?';
  forgotPasswordLink.setAttribute('href', '/recuperar-contraseña');// poner url
  forgotPasswordLink.classList.add('forgot-password');

  // crear boton de inicio de sesion
  const loginButton = document.createElement('button');
  loginButton.textContent = 'Iniciar Sesión';
  loginButton.classList.add('login-button');

  // evento a boton de login
  loginButton.addEventListener('click', async () => {
    const email = emailInput.value;
    const password = passwordInput.value;

    try {
      const Auth = getAuth(firebaseApp);
      await signInWithEmailAndPassword(Auth, email, password);
      window.location.href = '/preferences';
      // poner que la autenticacion fue existosa
      console.log('Inicio de sesion exitoso');
    } catch (error) {
      // poner errores de inicio de sesion
      console.log('Error al iniciar sesion', error);
    }
  });

  const btnShowPass = document.createElement('button');
  btnShowPass.setAttribute('id', 'btnShowPass');
  btnShowPass.classList = 'btnShowPassword';
  btnShowPass.style.backgroundImage = 'url(assets/shutEye.png)';
  btnShowPass.classList = 'buttonsShowHidePassword';

  passwordInput.insertAdjacentElement('afterend', btnShowPass);

  let passwordVisible = false; // vamos a rastrear si la contrasena es visible

  btnShowPass.addEventListener('click', () => {
    if (passwordVisible) {
      passwordInput.type = 'password'; // ocultar contrasena
      btnShowPass.style.backgroundImage = 'url(assets/shutEye.png)';
    } else {
      passwordInput.type = 'text'; // mostrar contrasena
      btnShowPass.style.backgroundImage = 'url(assets/openEye.png)';
    }
    passwordVisible = !passwordVisible; // Cambiar el estado de visibilidad
  });

  // creamos opcion para inicar sesion con google
  const googleSignInOption = document.createElement('p');
  const googleSignInLink = document.createElement('a');
  googleSignInLink.textContent = 'Iniciar Sesión con Google';
  googleSignInLink.setAttribute('href', '/auth/google'); // poner url

  googleSignInOption.appendChild(googleSignInLink);

  googleSignInLink.addEventListener('click', async (e) => {
    e.preventDefault(); // evita que el enlace cambie de pagina (usamos "#" como href)
    try {
      const auth = getAuth(firebaseApp);
      const provider = new GoogleAuthProvider();

      // Inicia sesion con Google utilizando SignInWithPopup
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Inicio de sesion con Google exitoso:', user);
    } catch (error) {
      console.error('Error al iniciar sesion con Google:', error);
    }
  });

  // poner todos los elmentos en el section
  section.append(
    logo,
    titleLogin,
    emailInput,
    passwordInput,
    btnShowPass,
    signUpLink,
    forgotPasswordLink,
    loginButton,
    googleSignInOption,
    logoGoogle,
  );
  return section;
}

export default login;
