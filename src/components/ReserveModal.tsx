// import { useState } from "react";
import { ITour } from "../models/ITour";

interface IProps {
    closeModal: () => void;
    tour: ITour
}

export const ReserveModal = ({}: IProps) => {
  console.log(new Date().toISOString().slice(0, -14))
  return (
    <div className="space-y-4">
        <form className="flex flex-col justify-center items-center space-y-4">
            <div className="inputContainer">
                <label className="inputLabel" htmlFor="email">
                <span>Fecha</span>
                </label>
                <input
                    type="date"
                    placeholder="Ingresa tu email"
                    className="input"
                    min={new Date().toISOString().slice(0, -14)}
                    required
                />
            </div>
            <button type="submit" className="btn-primary ">
                Reservar
            </button>
        </form>
    </div>
  );
};
