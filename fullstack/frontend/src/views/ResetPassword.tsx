import React, { FormEvent } from 'react'
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';

const ResetPassword = () => {
    
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({msg: '', error: false});
    const [passwordModified, setPasswordModified] = useState(false);

    const { token } = useParams();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password.length<6) {
            setAlert({
                msg: 'La contraseña debe tener al menos 6 carácteres',
                error: true
            })
            return;
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/users/forgot-password/${token}`;
            const {data} = await axios.post(url, {password});
            setAlert({
                msg: data.msg,
                error: false
            });
            setPasswordModified(true);
        } catch (error: any) {
            setAlert({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

    const {msg} = alert;

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Restablece tu contraseña y no pierdas acceso a tus 
                <span className='text-slate-700'> Proyectos </span>
            </h1>
            {msg && <Alert alert={alert}/>}
            <form 
                className='my-10 bg-white shadow rounded-lg p-10'
                onSubmit={handleSubmit}
            >
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    value='Restablecer contraseña'
                    className='bg-sky-700 mb-5 mt-5 w-full py-3 text-white uppercase font-bold rounded
                    hover:cursor-pointer hover:bg-sly-800 transition-colors'
                />
            </form>
            {passwordModified && 
            <Link 
                className='block text-center my-5 text-slate-500 uppercase text-sm'
                to='/'
            >
                ¿Ya has cambiado tu contraseña? Inicia sesión
            </Link>}
        </>
    )
}

export default ResetPassword;