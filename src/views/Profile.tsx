
import { LineWave } from "react-loader-spinner";
import { UserContext, useUser } from "../contexts/UserContext";
import { ChangeEvent, useState, useEffect } from "react";
import { getProfilePicture, updateProfilePicture, updateUser } from "../firebase/users-service";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { updateProfile } from "firebase/auth";

export function Profile() {
    const { user, isLoadingUser } = useUser() as UserContext;
    const [formData, setData] = useState({
      id: "",
      username: "",
      email: "",
      phone: "",
    })
    
    const [file, setFile] = useState<File | undefined>(undefined);
    const [profilePicture, setProfilePicture] = useState("");


    

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFile = event.target.files?.[0];

      setFile(selectedFile);
  
    }

    const whenChange = (event: any) => {
        const {name, value} = event.target;
        console.log(formData)
        setData((oldData: any) => ({
          ...oldData,
          [name]: value,
        }));
      }
    
    async function fetchProfilePicture() {
        try {
          const downloadURL = await getProfilePicture(user.id);
          setProfilePicture(downloadURL);
        } catch (error) {
          console.error("Error al obtener la foto de perfil:", error);
        }
      }  
    
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      
  
      if (formData.email == "") {
        formData.email = user.email
      }

      if (formData.username == "") {
        formData.username = user.username
      }
      
      if (formData.phone == "") {
        formData.phone = user.phone
      
      }

      if (file !== undefined) {
        updateProfilePicture(user.id, file); // actualizar la variable profilePicture en el estado
      }

      console.log(formData);
      await updateUser(user.id, formData);
      window.alert("Información guardada exitosamente!")
    }

    useEffect(() => {
      fetchProfilePicture() 
      console.log(profilePicture)
    }, [handleSubmit])
      

  return (
    <div className="mt-14 max-w-full w-full h-full flex flex-col justify-center items-center">
        
      {!isLoadingUser ? (
        

        <form className="flex flex-col" >
        <h1 className="text-center text-white text-4xl mb-10 font-semibold">Modificar tu perfil</h1>

        <div className="mt-5 justify-center self-center w-[200px] h-[200px] rounded-full bg-[#F77F00] mb-4 drop-shadow-sm">
          <img className="h-full w-full rounded-full border-[#F77F00] border" src={profilePicture} alt="" />
        </div>
        <label className="self-center">
              <input type="file" onChange={handleFileChange} className="mb-6 p-2 text-sm text-grey-500
              file:mr-5 file:py-1 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-medium
              file:bg-white file:text-[#F77F00]
              hover:file:cursor-pointer
              hover:file:scale-[1.03]
              
            " />
          </label>
       
        <div className="text-center text-white text-4xl mb-20 font-semibold drop-shadow-sm">{user.username}</div>
        {/*Name*/}
        <div className="">
          <label className="inputLabel" htmlFor="name">
            <span>Nombre</span>
          </label>
          <input
            className="input"
            type="text"
            name="username"
            id="username"
            placeholder={user.username}
            onChange={whenChange}
          />
        </div>

        {/*Email*/}
        <div className="inputContainer">
          <label className="inputLabel" htmlFor="email">
            <span>Email</span>
          </label>
          <input
            className="input"
            type="email"
            name="email"
            id="email"
            placeholder={user.email}
            onChange={whenChange}
          />
        </div>

        {/*Teléfono*/}
        {user.phone == "" || user.phone == null ? (
          <div className="inputContainer">
          <label className="inputLabel" htmlFor="phone">
            <span>Teléfono</span>
          </label>
          <input
            className="input"
            type="tel"
            name="phone"
            placeholder="Ej. +54 4140000000"
            pattern="([\+][0-9]{2}) [0-9]{10}"
            onChange={whenChange}
          />
        </div>
        ):(
          <div className="inputContainer">
            <label className="inputLabel" htmlFor="phone">
              <span>Teléfono</span>
            </label>
            <input
              className="input"
              type="tel"
              name="phone"
              placeholder={user.phone}
              pattern="([\+][0-9]{2}) [0-9]{10}"
              onChange={whenChange}
            />
          </div>
        )}

      <button type="button" className="btn-primary self-center mt-4 mb-20" onClick={handleSubmit} onChange={whenChange}>
        Guardar Cambios
      </button>
        </form>

      ) : (
        <LineWave
        height="250"
        width="250"
        color="#F77F00"
        ariaLabel="line-wave"
        wrapperStyle={{}}
        visible={true}
        />
      )}
    </div>
  )
}
