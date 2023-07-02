import { useEffect, useState } from "react";
import campusBackground from "../assets/campus.jpg";
import { useNavigate, useParams } from "react-router-dom";
import db from "../db.json";
import { ITour } from "../models/ITour";
import { ArtWorkCard } from "../components/ArtWorkCard";
import { calculateStars } from "../constants/tools";
import { FaHome } from "react-icons/fa";
import Modal from 'react-modal';
import { ReserveModal } from "../components/ReserveModal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: "#1D3557"
  },
  overlay: {
    backgroundColor: '#000000AA',
    zIndex: 20
  },
};

export const Tour = () => {
  const weekdays = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  const [average, setAverage] = useState(0);
  const [tour, setTour] = useState<ITour | null>(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      // Revisar si ya la tengo reservado
      if (id != undefined) {
        const tour: ITour = db.tours[Number.parseInt(id)];
        setAverage(calculateStars(tour.feedback));
        setTour(tour);
      }
    })();
  }, []);

  const openModal = () => {
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const handleReserve = () => {
    const isLogin = true
    if (isLogin) {
      openModal()
    }
    navigate("/login")
  }

  const handleBackHome = () => {
    const isLogin = true
    if (isLogin) {
      navigate("/dashboard")
    }
    navigate("/")
  }

  return (
    <div className="">
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <ReserveModal tour={tour!} closeModal={closeModal}/>
      </Modal>

      <button
        className="absolute rounded-full p-2 bg-white text-[#F77F00] text-2xl m-3 z-10"
        onClick={handleBackHome}
      >
        <FaHome />
      </button>
      <div className="p-10 pb-24 flex flex-wrap justify-center gap-8 h-fit relative">
        <div
          className="m-auto flex flex-col justify-center items-center rounded-lg p-6 bg-white text-stone-900 max-w-lg space-y-6 text-center "
          style={{ boxShadow: "-8px 8px 0px 0px #1D3557" }}
        >
          <h1
            className="mt-5 text-center text-4xl text-[#F77F00] font-extrabold drop-shadow-lg"
            style={{ textShadow: "-2px 2px #1D3557" }}
          >
            {tour?.name}
          </h1>
          <p className="text-lg max-h-96 overflow-scroll text-left">{tour?.description}</p>
          <button className="w-40 p-4 btn-primary hover:bg-[#ff890a]" onClick={handleReserve}>Reservar</button>
          <div className="h-full flex justify-center items-center space-x-2 fill-yellow-400">
            {Array.from(Array(average).keys()).map(() => {
              return (
                <div className="w-6">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                    <path d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z" />
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
        <img
          className="rounded-2xl max-w-4xl w-auto"
          src={campusBackground}
          style={{ boxShadow: "8px 8px 0px 0px #1D3557" }}
        />

        <div
          className="absolute bg-[#1D3557] -bottom-2 left-0 w-full p-6 z-10"
          style={{ borderRadius: "80% 80% 0% 0%/120% 120% 0% 0%" }}
        />
        <div
          className="absolute bg-white -bottom-1 left-0 w-full p-6 "
          style={{ borderRadius: "80% 80% 0% 0%/120% 120% 0% 0%" }}
        />
      </div>

      <div className="bg-[#1D3557] text-white space-y-12 px-32 pb-12 pt-2 flex flex-col items-center">
        <h1
          className="text-5xl font-extrabold text-center"
          style={{ textShadow: "-3px 3px #F77F00" }}
        >
          Obras
        </h1>
        {tour?.artworks.map((a) => {
          return <ArtWorkCard artwork={a} />;
        })}

        <h1
          className="text-5xl font-extrabold text-center"
          style={{ textShadow: "-3px 3px #F77F00" }}
        >
          Feedbacks
        </h1>
        {tour?.feedback.map((a) => {
          return <div>{a.msg}</div>;
        })}
      </div>
    </div>
  );
};
