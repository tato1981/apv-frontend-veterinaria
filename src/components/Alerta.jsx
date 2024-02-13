

const Alerta = ({alerta}) => {
  return (

    <div className={`${alerta.error ? 'from-red-400 to-red-600': 'from-green-400 to-green-600' } bg-gradient-to-r text-center p-3 rounded-xl text-white uppercase font-bold text-sm mb-10`  }>
        {alerta.msg}
    </div>
  )
}

export default Alerta