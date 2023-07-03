// import React from "react";

export const ReserveCard = () => {
  return (<div className="contenedor">
  <aside className="left">
      <img src="" alt="Imagen del tour"></img>
  </aside>
  <main className="content"> 
      <section className="TourInfo">
          <h3 className="text-center text-white text-4xl mb-10 font-semibold">TituloTour</h3> 
          <h3 id="descripcion">DescripcionTour</h3>
      </section>
      <section className="footer">
          <h3>Fecha</h3>
          <button type="submit" className="btn-primary">
              Feedback
          </button>
      </section>
  </main>
</div>);
};