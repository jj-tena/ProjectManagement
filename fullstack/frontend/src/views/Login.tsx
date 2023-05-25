import React from 'react'
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
        <h1 className='text-sky-600 font-black text-6xl'>Inicia sesión y administra tus 
            <span className='text-slate-700'> Proyectos </span>
        </h1>
        <form className='my-10 bg-white shadow rounded-lg p-10'>
            <div className='my-5'>
                <label 
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='email'
                >
                    Email
                </label>
                <input
                    id='email'
                    type='email'
                    placeholder='Email de registro'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                />
            </div>
            <div className='my-5'>
                <label 
                    className='uppercase text-gray-600 block text-xl font-bold'
                    htmlFor='password'
                >
                    Contraseña
                </label>
                <input
                    id='password'
                    type='password'
                    placeholder='Contraseña de registro'
                    className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                />
            </div>
            <input
                type='submit'
                value='Iniciar sesión'
                className='bg-sky-700 mb-5 mt-5 w-full py-3 text-white uppercase font-bold rounded
                hover:cursor-pointer hover:bg-sly-800 transition-colors'
            />
        </form>
        <nav className='lg:flex lg:justify-between'>
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to='/register'
            >
                ¿No tienes cuenta? Regístrate
            </Link>
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to='/register'
            >
                ¿Olvidaste tu contraseña?
            </Link>
        </nav>
    </>
  )
}

export default Login;
