import { Link, useNavigate } from "react-router-dom";
import { dashboardURL, registerURL } from "../constants/urls";
import { useState } from "react";
import { emailPasswordLogin } from "../firebase/auth-service";
import { AuthFormLayout } from "../components/AuthFormLayout";
import { ILoginForm } from "../models/ILoginForm";
import { SubmitHandler, useForm } from "react-hook-form";

export function Login() {
  const [errMsg, setErrMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async ({ email, password }) => {
    setLoading(true);
    try {
      emailPasswordLogin(email, password)
      navigate(dashboardURL);
    } catch (e: any) {
      setLoading(false);
      setErrMsg("Ocurrio un error...");

      // const errorCode = error.code;
      // const errorMessage = error.message;
    }
  };

  return (
    <AuthFormLayout
      title="Ingreso de Usuario"
      submitHandlerFunc={handleSubmit}
      onSubmitFunc={onSubmit}
      setErrMsg={setErrMsg}
      loading={loading}
      setLoading={setLoading}
      redirectNode={
        <Link to={registerURL} className="mt-4 whitespace-normal">
          <span className="">No tienes una cuenta? </span>
          <span className="underline font-semibold">Registrate</span>
        </Link>
      }
    >
      {/*Email*/}
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="email">
          <span>Email</span>
        </label>
        <input
          type="email"
          placeholder="Ingresa tu email"
          className="input"
          required
          {...register("email")}
        />
      </div>

      {/*Password*/}
      <div className="inputContainer">
        <label className="inputLabel" htmlFor="password">
          <span>Contraseña</span>
        </label>
        <input
          type="password"
          placeholder="Ingresa tu contraseña"
          className="input"
          required
          minLength={6}
          maxLength={18}
          {...register("password")}
        />
      </div>

      <div className="text-red-500 font-medium">{errMsg}</div>

      <button type="submit" className="btn-primary">
        Ingresar
      </button>
    </AuthFormLayout>
  );
}
