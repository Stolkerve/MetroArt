import React from 'react'
import campusBackground from "../assets/campus.jpg";

export const TourCard = () => {
  return (
    <div
    className="flex w-full rounded-2xl bg-[#F77F00] max-w-6xl h-[15rem] overflow-clip text-white tour-transitions"
    >
    <img className="w-56" src={campusBackground} />
    <div className="p-6">
        <h1 className="font-bold text-2xl">Nombre del tour</h1>
        <h1 className="">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </h1>
    </div>
    <div className="h-full flex flex-col justify-center items-center py-2 px-4 space-y-2 fill-yellow-200">
        {[0, 1, 2, 3, 4].map(() => {
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

  )
}
