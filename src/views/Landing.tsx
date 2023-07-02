import { Fade, Zoom } from "react-awesome-reveal";
import campusBackground from "../assets/campus.jpg";
import { useState } from "react";
import { LineWave } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { loginURL, registerURL } from "../constants/urls";
import { TourCard } from "../components/TourCard";
import db from "../db.json";
import { ITour } from "../models/ITour";

export default function Landing() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLoginButton = () => {
    navigate(loginURL);
  };

  const handleRegisterButton = () => {
    navigate(registerURL);
  };

  function setTimer(a: any) {
    if (a) {
      setTimeout(() => {
        setLoading(false);
      }, 2500);
    }
  }

  return (
    <>
      <header
        className="flex items-center justify-center h-96 mb-12 bg-[url('./assets/campus.jpg')] bg-fixed bg-center bg-cover relative"
        // style={{backgroundImage: `url(${campusBackground})`}}
      >
        <div className="w-full h-full flex flex-col justify-center items-center backdrop-blur-lg">
          <h1
            className="mt-5 text-center text-8xl text-[#F77F00] font-extrabold drop-shadow-lg"
            style={{ textShadow: "-4px 4px #1D3557" }}
          >
            Bienvenido a MetroArt
          </h1>
        </div>
        <div
          className="absolute bg-[#F77F00] -bottom-2 w-full p-6 z-10"
          style={{ borderRadius: "80% 80% 0% 0%/120% 120% 0% 0%" }}
        />
        <div
          className="absolute bg-white -bottom-1 w-full p-6 "
          style={{ borderRadius: "80% 80% 0% 0%/120% 120% 0% 0%" }}
        />
      </header>

      <div className="flex flex-col justify-center leading-normal px-32  space-y-16 relative">
        <Fade cascade delay={100} duration={1000} damping={0.2} triggerOnce>
          <div className="flex justify-between w-full items-center">
            <div
              className="flex flex-col justify-center rounded-lg p-6 bg-white text-stone-900 max-w-lg h-fit space-y-6 text-center"
              style={{ boxShadow: "-8px 8px 0px 0px #1D3557" }}
            >
              <div className="flex w-full justify-center items-center">
                <h1 className="p-4 rounded-lg text-xl font-bold text-white bg-[#1D3557]">
                  Quienes somos
                </h1>
              </div>
              <p className="text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </p>
              <div className="flex flex-col items-center text-white border-collapse font-semibold">
                <button
                  className="w-40 p-4 bg-[#F77F00] rounded-t-lg border-x-2 border-t-2 border-b-2 border-[#1D3557] transition duration-200 hover:bg-[#ff890a]"
                  onClick={handleRegisterButton}
                >
                  Registrarse
                </button>
                <button
                  className="w-40 p-4 bg-[#F77F00] rounded-b-lg border-x-2 border-b-2 border-[#1D3557] hover:bg-[#ff890a]"
                  onClick={handleLoginButton}
                >
                  Iniciar Sesión
                </button>
              </div>
            </div>
            <div className="flex justify-center items-center px-10 space-x-4">
              <img
                className="rounded-2xl max-w-sm h-[38rem]"
                src={campusBackground}
                style={{ boxShadow: "0px 6px 0px 6px #1D3557" }}
              />
              <div className="space-y-4">
                <img
                  className="rounded-2xl max-w-xs"
                  src={campusBackground}
                  style={{ boxShadow: "8px 8px 0px 0px #1D3557" }}
                />
                <img
                  className="rounded-2xl max-w-xs"
                  src={campusBackground}
                  style={{ boxShadow: "8px 8px 0px 0px #1D3557" }}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full items-center pb-32">
            <div
              className="flex flex-wrap justify-center w-fit text-center text-lg bg-white text-stone-800 p-6 gap-8 rounded-lg"
              style={{ boxShadow: "0px 8px 0px 8px #1D3557" }}
            >
              <div className="max-w-md space-y-4">
                <div className="flex w-full justify-center items-center">
                  <h1 className="p-4 rounded-lg text-xl font-bold text-white bg-[#1D3557]">
                    Nuestra Misión
                  </h1>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </div>
              <div className="max-w-md space-y-4">
                <div className="flex w-full justify-center items-center">
                  <h1 className="p-4 rounded-lg text-xl font-bold text-white bg-[#1D3557]">
                    Objetivos
                  </h1>
                </div>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                  exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
                  officia deserunt mollit anim id est laborum.
                </p>
              </div>
            </div>
          </div>
        </Fade>

        <div
          className="absolute bg-[#1D3557] -bottom-2 left-0 w-full p-6 z-10"
          style={{ borderRadius: "80% 80% 0% 0%/120% 120% 0% 0%" }}
        />
        <div
          className="absolute bg-white -bottom-1 left-0 w-full p-6 "
          style={{ borderRadius: "80% 80% 0% 0%/120% 120% 0% 0%" }}
        />
      </div>
      <div className="bg-[#1D3557] text-white space-y-16 px-32 pb-12">
        <h1
          className="text-8xl font-extrabold text-center"
          style={{ textShadow: "-3px 3px #F77F00" }}
        >
          <Zoom cascade duration={250} delay={100} triggerOnce>
            Tours
          </Zoom>
        </h1>
        {!loading ? (
          <Zoom duration={250} triggerOnce>
            <div className="flex justify-center mt-16 space-y-12">
              <input
                className="rounded-2xl w-full h-fit max-w-xl text-black p-3"
                type="text"
                placeholder="Autor, nombre del tour y nombre de la obra..."
              />
            </div>
          </Zoom>
        ) : (
          <></>
        )}
        <div className="flex flex-col justify-center h-full w-full space-y-8">
          {loading ? (
            <Zoom
              duration={250}
              delay={100}
              triggerOnce
              onVisibilityChange={setTimer}
              className="flex justify-center"
            >
              <LineWave
                height="250"
                width="250"
                color="#F77F00"
                ariaLabel="line-wave"
                wrapperStyle={{}}
                visible={true}
              />
            </Zoom>
          ) : (
            <Zoom cascade duration={150} direction="up" triggerOnce className="flex justify-center">
              {db.tours.map((t: ITour) => {
                return <TourCard tour={t} />;
              })}
            </Zoom>
          )}
        </div>
      </div>
    </>
  );
}
