import React, { FormEvent, useState } from 'react'
import { Link } from 'react-router-dom';
import Alert from '../components/Alert';
import axios, { AxiosError } from 'axios';

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const [alert, setAlert] = useState({msg: '', error: false});

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if ([name, email, password, repeatPassword].includes('')) {
            setAlert({
                msg: 'Todos los campos son obligatorios',
                error: true
            })
            return;
        }
        if (password !== repeatPassword) {
            setAlert({
                msg: 'Las contraseñas no coinciden',
                error: true
            })
            return;
        }
        if (password.length<6) {
            setAlert({
                msg: 'La contraseña debe tener al menos 6 carácteres',
                error: true
            })
            return;
        }
        setAlert({msg: '', error: false});
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/users`, {
                name, email, password
            });
            setAlert({msg: response.data.msg, error: false});
            setName('');
            setEmail('');
            setPassword('');
            setRepeatPassword('');
        } catch (error: any) {
            setAlert({msg: error.response.data.msg, error: true});
        }
    }

    const { msg } = alert;

    return (
        <>
            <h1 className='text-sky-600 font-black text-6xl'>Crea tu cuenta y administra tus 
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
                        htmlFor='name'
                    >
                        Nombre
                    </label>
                    <input
                        id='name'
                        type='text'
                        placeholder='Tu nombre'
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </div>
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className='my-5'>
                    <label 
                        className='uppercase text-gray-600 block text-xl font-bold'
                        htmlFor='repeat-password'
                    >
                        Repetir contraseña
                    </label>
                    <input
                        id='repeat-password'
                        type='password'
                        placeholder='Repite tu contraseña de registro'
                        className='w-full mt-3 p-3 border rounded-xl bg-gray-50'
                        value={repeatPassword}
                        onChange={e => setRepeatPassword(e.target.value)}
                    />
                </div>
                <input
                    type='submit'
                    value='Crear cuenta'
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
                    to='/forgot-password'
                >
                    ¿Olvidaste tu contraseña?
                </Link>
            </nav>
        </>
    )
}

export default Register;
