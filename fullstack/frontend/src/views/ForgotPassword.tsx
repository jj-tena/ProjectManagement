import React, { FormEvent } from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alert from '../components/Alert';
import axios from 'axios';
import { AxiosError } from 'axios';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [alert, setAlert] = useState({msg: '', error: false});

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (email === '' || email.length<6){
            setAlert({
                msg: 'Email obligatorio',
                error: true
            })
        }
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/users/forgot-password`, { email }
            );
            setAlert({msg: data.msg, error: false})
        } catch (error: any) {
            setAlert({msg: error.response.data.msg, error: true})
        }
        return;
    }

    const { msg } = alert;

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Cambia tu contraseña y no pierdas tus  
                <span className='text-slate-700'> Proyectos </span>
            </h1>
            { msg && <Alert alert={alert}/>}
            <form 
                className='my-10 bg-white shadow rounded-lg p-10'
                onSubmit={handleSubmit}
            >
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    value='Enviar instrucciones'
                    className='bg-sky-700 mb-5 mt-5 w-full py-3 text-white uppercase font-bold rounded
                    hover:cursor-pointer hover:bg-sly-800 transition-colors'
                />
            </form>
            <nav className='lg:flex lg:justify-between'>
                <Link 
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to='/'
                >
                    ¿Ya tienes cuenta? Inicia sesión
                </Link>
                <Link 
                    className='block text-center my-5 text-slate-500 uppercase text-sm'
                    to='/register'
                >
                    ¿No tienes cuenta? Regístrate
                </Link>
            </nav>
        </>
    )
}

export default ForgotPassword;
