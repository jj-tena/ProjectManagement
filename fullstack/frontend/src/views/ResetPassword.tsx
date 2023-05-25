import React from 'react'

const ResetPassword = () => {
  return (
    <>
        <h1 className='text-sky-600 font-black text-6xl'>Restablece tu contraseña y no pierdas acceso a tus 
            <span className='text-slate-700'> Proyectos </span>
        </h1>
        <form className='my-10 bg-white shadow rounded-lg p-10'>
            <div className='my-5'>
                <label 
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='password'
                >
                    Nueva contraseña
                </label>
                <input
                    id='password'
                    type='password'
                    placeholder='Nueva contraseña de registro'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                />
            </div>
            <input
                type='submit'
                value='Restablecer contraseña'
                className='bg-sky-700 mb-5 mt-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-sly-800 transition-colors'
            />
        </form>
    </>
  )
}

export default ResetPassword;