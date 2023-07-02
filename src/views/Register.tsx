import { SubmitHandler, useForm } from "react-hook-form";

import { useState } from "react";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { IRegisterForm } from "../models/IRegisterForm";
import { Link, useNavigate } from "react-router-dom";
import { dashboardURL, loginURL } from "../constants/urls";
import { emailPasswordRegister } from "../firebase/auth-service";

export function Register() {
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<IRegisterForm>();

  const onSubmit: SubmitHandler<IRegisterForm> = async ({
    email,
    password,
    rePassword,
    phone,
    username,
  }) => {
    setLoading(true);
    if (password != rePassword) {
      setErrMsg("Las contrasenas no coinciden.");
      setLoading(false);
      return;
    }

    console.log(email, password, username, phone);
    try {
      await emailPasswordRegister(email, password, username, phone)
      navigate(dashboardURL)
    } catch (e: any) {
      setLoading(false);
      setErrMsg("Error creando usuario...");

      // const errorCode = error.code;
      // const errorMessage = error.message;
    }
  };

  return (
    <AuthFormLayout
      title="Registro de Usuario"
      submitHandlerFunc={handleSubmit}
      onSubmitFunc={onSubmit}
      setErrMsg={setErrMsg}
      loading={loading}
      setLoading={setLoading}
      redirectNode={
        <Link to={loginURL} className="mt-4 whitespace-normal">
          <span className="">Ya tienes una cuenta? </span>
          <span className="underline font-semibold">Inicia sesión</span>
        </Link>
      }
    >
      {/*Name*/}
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="name">
          <span>Nombre</span>
        </label>
        <input
          className="input"
          type="text"
          placeholder="Ingresa tu nombre"
          {...register("username")}
          required
          minLength={3}
          maxLength={50}
        />
      </div>

      {/*Email*/}
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="email">
          <span>Email</span>
        </label>
        <input
          className="input"
          type="email"
          placeholder="Ingresa tu email"
          {...register("email")}
          required
        />
      </div>

      {/*Password*/}
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="password">
          <span>Contraseña</span>
        </label>
        <input
          className="input"
          type="password"
          placeholder="Ingresa tu contraseña"
          required
          minLength={6}
          maxLength={18}
          {...register("password")}
        />
      </div>

      {/*Repeat Password*/}
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="password">
          <span>Repetir Contraseña</span>
        </label>
        <input
          className="input"
          type="password"
          placeholder="Ingresa tu contraseña"
          required
          {...register("rePassword")}
        />
      </div>

      {/*Teléfono*/}
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="telefono">
          <span>Teléfono</span>
        </label>
        <input
          className="input"
          type="tel"
          placeholder="+54 4140000000"
          pattern="([\+][0-9]{2}) [0-9]{10}"
          required
          {...register("phone")}
        />
      </div>

      <div className="text-red-500 font-medium">{errMsg}</div>

      <button type="submit" className="btn-primary">
        Registrarse
      </button>
    </AuthFormLayout>
  );
}
