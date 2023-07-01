import React, { ReactNode } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import campusBackground from "../assets/campus.jpg";
import { SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { LineWave } from "react-loader-spinner";
import { loginWithProvider } from "../firebase/auth-service";
import { facebookProvider, googleProvider } from "../firebase/client";

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
  children,
  title,
  redirectNode,
}: IProps) => {
  return (
    <div className="flex justify-center items-center w-screen max-h-screen h-screen ">
      <img src={campusBackground} className="min-w-[60%] h-full" />
      <form
        onSubmit={submitHandlerFunc(onSubmitFunc)}
        className="w-full h-full max-h-screen bg-[#1D3557] flex overflow-y-scroll p-4"
      >
        <fieldset
          className="flex flex-col items-center space-y-4 m-auto"
          disabled={loading}
        >
          <h1 className="text-4xl font-bold text-center mb-8">{title}</h1>
          {loading ? (
            <LineWave
              height="250"
              width="250"
              color="#F77F00"
              ariaLabel="line-wave"
              wrapperStyle={{}}
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
                    onClick={() => loginWithProvider(googleProvider)}
                  >
                    <span className="text-4xl">
                      <FcGoogle />
                    </span>
                    Google
                  </button>
                  <button
                    type="button"
                    className="btn-secondary flex  justify-center items-center gap-4"
                    onClick={() => loginWithProvider(facebookProvider)}
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
