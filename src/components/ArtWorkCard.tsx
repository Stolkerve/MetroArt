import { useEffect, useState } from "react";
import campusBackground from "../assets/campus.jpg";
import { IArtWork } from "../models/IArtWork";

export const ArtWorkCard = ({ artwork }: { artwork: IArtWork }) => {
  const [imgIndex, setImgIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      if (imgIndex >= artwork.imagesUrl.length - 1) {
        setImgIndex(0);
        return;
      }
      setImgIndex(imgIndex + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex w-full rounded-2xl bg-[#F77F00] max-w-6xl h-[14.11rem] overflow-clip text-white tour-transitions active:scale-100 hover:cursor-default">
      <img className="w-56" src={campusBackground} />
      <div className="p-6 flex flex-col overflow-scroll">
        <h1 className="font-bold text-2xl">{artwork.name}</h1>
        <h1 className="mb-auto font-medium">{artwork.description}</h1>
        <div className="flex gap-2 font-medium">
          <p>Autor: {artwork.author}.</p>
          <p>Tipo: {artwork.kind}.</p>
          <p>Ubicacion: {artwork.location}.</p>
        </div>
      </div>
    </div>
  );
};
