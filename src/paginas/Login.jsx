import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Alerta from '../components/Alerta'
import useAuth from '../hook/useAuth'
import clienteAxios from '../../config/axios';


const Login = () => {

  const  [email, setEmail] = useState('')
  const  [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const  [alerta, setAlerta] = useState({})

  const {setAuth} = useAuth()

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

   
    //iniciar sesionS
    if([email, password,].includes('')){
      setAlerta({msg: "Todos los campos son obligatorios", error: true})
      return;      
  }
  setAlerta({})  

  //comprobar si existe el veterinario
      try {
            
        const {data} = await clienteAxios.post('/veterinarios/login', {email, password});

        //inicio sesión
        localStorage.setItem("token", data.token);

        setAuth(data)
        navigate('/admin')

      } catch (error) {
          setAlerta({msg: error.response.data.msg, error: true}) //mensaje del backend
        }

  }

  //mostrar checkbox password
  const handleCheckboxChange = () => {
    setShowPassword(!showPassword);
  };

  const {msg} = alerta;

  
  return (
    <>

      
          <div>
            <h1 className="text-indigo-600 font-black text-4xl md:text-6xl">
              Inicia Sesión y Administra tus {''}
              <span className="text-black"> Pacientes </span> 
            </h1> 
          </div>

          <div className='mt-10 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

              {msg && <Alerta
                      alerta={alerta}
                  />}
              <form 
                onSubmit={handleSubmit}
              >
                <div className="my-5">
                  <label 
                    htmlFor=""
                    className="uppercase  text-gray-600 block text-xl font-bold"
                  >
                    Email
                  </label>
                  <input 
                    type="email" 
                    placeholder="Email de Registro"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={email}
                    onChange={ e => setEmail(e.target.value)}
                  
                  />
                </div>

                <div className="my-4 relative">
                  <label 
                    htmlFor=""
                    className="uppercase  text-gray-600 block text-xl font-bold"
                  >
                    Password
                  </label>
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Tu Password"
                    className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                    value={password}
                    onChange={ e => setPassword(e.target.value)}                   
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
                  value="Iniciar Sesión"
                  className="bg-indigo-700 w-full p-3 px-10 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
                />
              </form>

              <nav className='mt-10 lg:flex lg:justify-between'>
                <Link 
                  className='block text-center my-5 text-gray-500'
                  to="/registrar">No tienes una cuenta? Regístrate</Link>
                <Link 
                  className='block text-center my-5 text-gray-500'
                  to="/olvide-password">Olvidaste tu password?</Link>
              </nav>

          </div>
     
    </>
  )
}

export default Login