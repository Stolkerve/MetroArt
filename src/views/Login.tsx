import { Link, useNavigate } from "react-router-dom";
import { homeURL, registerURL } from "../constants/urls";
import { useState } from 'react';
import {
  emailPasswordLogin,
  googleLogin,
 } from "../firebase/auth-service";
 import campusBackground from "../assets/campus.jpg";


export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const onSuccess = () => {
    navigate(homeURL);
  };

  const onFail = (_error: any) => {
    console.log("LOGIN FAILED, Try Again");
  };

  const onSubmit = async (event: any) => {
    event.preventDefault();

    await emailPasswordLogin({userData: formData}, onSuccess, onFail );
  };

  const onChange = (event: any) => {
    const { name, value } = event.target;

    setFormData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleGoogleClick = async () => {
    await googleLogin( {onSuccess: () => navigate(homeURL)},
      {onFail: () => window.alert("Ha ocurrido un error")},
    );
  };
  
    return (
<div className="container flex flex-row justify-center items-center w-screen   h-screen">
      <img src={campusBackground} className="w-1/2 h-full" />
      <form className="w-1/2 h-full bg-[#1D3557] grid grid-cols-1 p-6 place-items-center items-center">
        <h1 className="text-4xl font-bold p-0">Inicio de sesión</h1>
        <p className="text-white mb-2 text-lg">
          Inicia sesión para acceder 
        </p>

  
             {/*Email*/}
             <div className="inputContainer">
          <label className="inputLabel" htmlFor="email">
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Ingresa tu email"
          />
        </div>
  
          {/*Password*/}
          <div className="inputContainer">
          <label className="inputLabel" htmlFor="password">
            <span>Contraseña</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Ingresa tu contraseña"
          />
        </div>
  
        <button
            type="submit"
            className= "bg-[#F77F00] w-4/5 mt-6 h-10 rounded-lg font-bold"
          >
            Iniciar sesión
          </button>
          <button
              type="button"
              className="border-2 border-white rounded p-4 font-semibold w-1/3 mt-2"
              onClick={handleGoogleClick}
            >
              Google
            </button>
            
            <button
              type="button"
              className="border-2 border-white rounded p-4 font-semibold w-1/3 mt-2"
              onClick={handleGoogleClick}
            >
              Facebook
            </button>
  
          <Link to={registerURL} >
            No account?{" "}
            <span >Sign up</span>
          </Link>
        </form>
      </div>
    );
}