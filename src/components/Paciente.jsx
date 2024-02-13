import usePacientes from '../hook/usePacientes'


const Paciente = ({paciente}) => {

    const {setEdicion, eliminarPaciente} = usePacientes()

    const { email, fecha_alta, nombre, propietario, sintomas, _id } = paciente
    
    //formatear fecha
    /*const formatearFecha =(fecha) => {
        const nuevaFecha = new Date(fecha)
        return Intl.DateTimeFormat('es-ES', {dateStyle: 'long'}).format(nuevaFecha)      

    }*/

        // formatear fecha
        const formatearFecha = (fecha) => {
            let nuevaFecha
            if (fecha.includes('T00:00:00.000Z')) {
                nuevaFecha = new Date(fecha.split('T')[0].split('-'))
            } else {
                nuevaFecha = new Date(fecha)
            }
            const opciones = {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }
            return nuevaFecha.toLocaleDateString('es-ES', opciones)
          }

    

  return (

    <div className="mx-5 my-10 bg-white shadow-md px-5 py-10 rounded-xl">

        <p className="font-bold uppercase text-indigo-700 my-2">Nombre: {''}
            <span className="font-normal normal-case text-black">{nombre}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Propietario: {''}
            <span className="font-normal normal-case text-black">{propietario}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Email: {''}
            <span className="font-normal normal-case text-black">{email}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Fecha Alta: {''}
            <span className="font-normal normal-case text-black">{formatearFecha(fecha_alta)}</span>
        </p>

        <p className="font-bold uppercase text-indigo-700 my-2">Síntomas: {''}
            <span className="font-normal normal-case text-black">{sintomas}</span>
        </p>

        <div className="flex justify-between my-5">
            <button
                type="button"
                className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white uppercase font-bold rounded-lg"
                onClick={() => setEdicion(paciente)}
            
            >Editar</button>

            <button
                type="button"
                className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"
                onClick={() => eliminarPaciente(_id)}
            >Eliminar</button>

        </div>
        
        

    </div>
  )
}

export default Paciente