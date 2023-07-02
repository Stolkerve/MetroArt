import React, { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaHome } from "react-icons/fa";
import campusBackground from "../assets/campus.jpg";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { LineWave } from "react-loader-spinner";
import { loginWithProvider } from "../firebase/auth-service";
import { facebookProvider, googleProvider } from "../firebase/client";
import { useNavigate } from "react-router-dom";
import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

interface IProps {
  submitHandlerFunc: UseFormHandleSubmit<any, undefined>;
  onSubmitFunc: SubmitHandler<any>;
  setErrMsg: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  redirectNode: ReactNode;
}

export const AuthFormLayout = ({
  submitHandlerFunc,
  onSubmitFunc,
  loading,
  setLoading,
  children,
  title,
  redirectNode,
}: IProps) => {
  const navigate = useNavigate();

  const login = async (provider: GoogleAuthProvider | FacebookAuthProvider) => {
    setLoading(true);
    try {
      await loginWithProvider(provider);
    } catch (e: any) {
      console.log(e);
      // const errorCode = error.code;
      // const errorMessage = error.message;
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center w-screen max-h-screen h-screen ">
      <img src={campusBackground} className="min-w-[60%] h-full" />
      <form
        onSubmit={submitHandlerFunc(onSubmitFunc)}
        className="relative w-full h-full max-h-screen bg-[#1D3557] flex overflow-y-scroll p-4"
      >
        {!loading ? (
          <button
            className="absolute rounded-full p-2 bg-[#F77F00] text-2xl"
            onClick={() => navigate("/")}
          >
            <FaHome />
          </button>
        ) : (
          <></>
        )}
        <fieldset className="flex flex-col items-center space-y-4 m-auto" disabled={loading}>
          <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
          {loading ? (
            <LineWave
              height="250"
              width="250"
              color="#F77F00"
              ariaLabel="line-wave"
              visible={true}
            />
          ) : (
            <>
              {children}

              <div className="flex justify-center items-center flex-col pt-6">
                <div className="flex flex-row gap-4 w-full justify-center">
                  <button
                    type="button"
                    className="btn-secondary flex justify-center items-center gap-4"
                    onClick={() => login(googleProvider)}
                  >
                    <span className="text-4xl">
                      <FcGoogle />
                    </span>
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn-secondary flex  justify-center items-center gap-4"
                    onClick={() => login(facebookProvider)}
                  >
                    <span className="text-4xl">
                      <FaFacebook />
                    </span>
                    Facebook
                  </button>
                </div>
                {redirectNode}
              </div>
            </>
          )}
        </fieldset>
      </form>
    </div>
  );
};
