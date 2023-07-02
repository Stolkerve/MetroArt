import { TourCard } from "../components/TourCard";
import toursInfo from "../json/toursInfo.json";
import { useEffect, useState } from "react";

export const Dashboard = () => {

  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
      console.log(toursInfo)

  }, [])

  const whenChange = () =>{    
      
  }
  
  return (

  
    <div className="flex my-4 justify-center items-center flex-col min-h-screen min-w-screen">
        <div className="flex flex-row min-w-screen w-full justify-center m-4">
            <input 
              type='text' 
              name='tourSearch'
              id = 'tourSearchBox'
              className="text-center input h-12 w-3/5"
              placeholder='Nombre del Tour'
              onChange={whenChange}
            />

        </div>
        <div className="flex justify-center items-center gap-6 flex-col min-h-screen min-w-screen">
          {!isLoading && toursInfo["tours"].map((tour)=>{

              return(          
                <TourCard tour={tour} key={tour.id} />
              )
            })}
        </div>
      
    </div>

    );
}
