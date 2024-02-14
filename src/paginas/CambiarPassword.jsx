import { useState } from "react"
import AdminNav from "../components/AdminNav"
import Alerta from "../components/Alerta"
import useAuth from "../hook/useAuth"
import clienteAxios from "../../config/axios"

const CambiarPassword = () => {

  const {guardarPassword} = useAuth()

  const  [alerta, setAlerta] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const  [password, setPassword] = useState({
    pwd_actual: '',
    pwd_nuevo: '',
    pwd_repetir: '',
  })


  const handleSubmit = async (e) => {
    e.preventDefault()

  if(Object.values(password).some(campo => campo === '')) {
    setAlerta({
      msg: 'Todos los campos son obligatorios',
      error: true
    })
      return

  }

  if(password.pwd_nuevo !== password.pwd_repetir) {
      setAlerta({
        msg: 'Los Password son diferentes',
        error: true,
    })    
    return  
  }

  if(password.pwd_nuevo.length < 6) {
    setAlerta({
      msg: 'El password debe tener mínimo 6 caracteres',
      error: true,
  })    
  return  
}

  const respuesta = await guardarPassword(password)
  setAlerta(respuesta)  

}

//mostrar checkbox password
const handleCheckboxChange = () => {
  setShowPassword(!showPassword);
};

  const {msg} = alerta;


  return (
    <>
    
        <AdminNav />

        <h2 className=" font-black text-3xl text-center mt-10">Cambiar Password</h2>
        <p className="text-xl mt-5 mb-10 text-center">Modifica tu {''}<span className="text-indigo-600 font-bold">Password Aquí</span></p>

        <div className="flex justify-center">

            <div className="w-full md:w-1/2 bg-white shadow rounded-lg p-5 ">
            {msg && <Alerta
                    alerta={alerta}
                />}
                <form
                    onSubmit={handleSubmit}
                >
                    
                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Password Actual</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                                name="pwd_actual"
                                placeholder="Escribe tu password actual"
                                onChange={e => setPassword({
                                  ...password,
                                  [e.target.name] : e.target.value
                                })}
                                
                            />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">password Nuevo</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                                name="pwd_nuevo"
                                placeholder="Escribe tu nuevo password"
                                onChange={e => setPassword({
                                  ...password,
                                  [e.target.name] : e.target.value
                                })}
                            />
                        </div>

                        <div className="my-3">
                            <label className="uppercase font-bold text-gray-600">Repetir password Nuevo</label>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="border bg-gray-50 w-full p-2 mt-5 rounded-lg "
                                name="pwd_repetir"
                                placeholder="Repetir password nuevo"
                                onChange={e => setPassword({
                                  ...password,
                                  [e.target.name] : e.target.value
                                })}
                            />

                            <input
                                type="checkbox"
                                id="showPassword"
                                className="ml-2 mt-5"
                                checked={showPassword}
                                onChange={handleCheckboxChange}
                              />
                              <label htmlFor="showPassword" className="ml-1  text-gray-500">
                                Mostrar Password
                              </label>
                        </div>


                        

                        <input 
                            type="submit"
                            value="Actualizar Password"
                            className="bg-indigo-700 w-full p-3 rounded-md text-white text-center uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 "
                            
                        
                        />
                </form>
            </div>

        </div>
    </>
  )
}

export default CambiarPassword