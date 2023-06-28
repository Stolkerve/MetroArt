import { Link, useNavigate } from "react-router-dom";
import { homeURL, loginURL } from "../constants/urls";
import {
  emailPasswordRegister,
  googleLogin,
} from "../firebase/auth-service";
import { useState } from "react";
import campusBackground from "../assets/campus.jpg";

export function Register() {
  const navigate = useNavigate();
  const [formData, setData] = useState({});

  const onSuccess = () => {
    navigate(homeURL);
  };

  const onFail = (_error: any) => {
    console.log("REGISTER FAILED, Try Again");
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    const {email, password, ...extraData}: any = formData;
    
    await emailPasswordRegister({
      userData: formData},
      onSuccess,
      onFail,
    );
  };

  const handleGoogleClick = async () => {
    await googleLogin( {onSuccess: () => navigate(homeURL)},
      {onFail: () => window.alert("Ha ocurrido un error")},
    );
  };

  const whenChange = (event: any) => {
    const {name, value} = event.target;

    setData((oldData) => ({
      ...oldData,
      [name]: value,
      favorites: [],
      role: "regular",
    }));
  };

  return (
    <div className="container flex flex-row justify-center items-center w-screen   h-screen">
      <img src={campusBackground} className="w-1/2 h-full" />
      <form className="w-1/2 h-full bg-[#1D3557] grid grid-cols-1 p-6 place-items-center items-center">
        <h1 className="text-4xl font-bold p-0">Registro de Usuario</h1>
        <p className="text-white mb-2 text-lg">
          Crea tu cuenta para acceder 
        </p>

        {/*Name*/}
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="name">
            <span>Nombre</span>
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Ingresa tu nombre"
            onChange={whenChange}
          />
        </div>

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
            onChange={whenChange}
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
            onChange={whenChange}
          />
        </div>

        {/*Repeat Password*/}
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="password">
            <span>Repetir Contraseña</span>
          </label>
          <input
            type="password"
            name="repeatPassword"
            id="repeatPassword"
            placeholder="Ingresa tu contraseña"
            onChange={whenChange}
          />
        </div>

        {/*Teléfono*/}
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="telefono">
            <span>Teléfono</span>
          </label>
          <input
            type="number"
            name="telefono"
            id="telefono"
            placeholder="Ingresa tu teléfono"
            onChange={whenChange}
          />

          <button
            type="submit"
            className= "bg-[#F77F00] w-4/5 mt-6 h-10 rounded-lg font-bold"
            onClick={handleSubmit}
          >
            Registrarse
          </button>
        </div>
        
        <div className="flex justify-center items-center flex-col w-full">
          <div className="flex flex-row gap-4 w-full justify-center">
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
          </div>
          
          <Link to={loginURL} className="mt-4">
            Ya tienes una cuenta?{" "}
            <span className="underline font-semibold">Inicia sesión</span>
          </Link>
        </div>
        
      </form>
    </div>
  );
}