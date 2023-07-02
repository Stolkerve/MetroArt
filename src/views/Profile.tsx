
import { LineWave } from "react-loader-spinner";
import { UserContext, useUser } from "../contexts/UserContext";
import { useState } from "react";
import { updateUser } from "../firebase/users-service";

export function Profile() {
    const { user, isLoadingUser } = useUser() as UserContext;
    const [formData, setData] = useState({
      id: "",
      username: "",
      email: "",
      phone: "",
    });

    const whenChange = (event: any) => {
        const {name, value} = event.target;
        console.log(formData)
        setData((oldData: any) => ({
          ...oldData,
          [name]: value,
        }));
      }
    
    const handleSubmit = async (event: any) => {
      event.preventDefault();
      console.log(formData)
      console.log("entro")
      console.log(user.id)
      if (formData.email == "") {
        formData.email = user.email
      }

      if (formData.username == "") {
        formData.username = user.username
      }
      
      if (formData.phone == "") {
        formData.phone = user.phone
      
      }

      console.log(formData);
      await updateUser(user.id, formData);
      window.alert("Información guardada exitosamente!")
    }

  return (
    <div className="mt-14 max-w-full w-full h-full flex flex-col justify-center items-center">
        <div className="mt-5 content-none justify-center w-[200px] h-[200px] rounded-full bg-[#F77F00] mb-4 drop-shadow-sm"></div>
        <div className="text-center text-white text-4xl mb-20 font-semibold drop-shadow-sm">{user.username}</div>
      {!isLoadingUser ? (
        

        <form className="flex flex-col" >
        <h1 className="text-center text-white text-4xl mb-10 font-semibold">Modificar tu perfil</h1>

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
