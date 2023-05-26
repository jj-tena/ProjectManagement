import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Alert from '../components/Alert';
import { useState } from 'react';

const VerifyAccount = () => {

  const [alert, setAlert] = useState({msg: '', error: false});
  const [verified, setVerified] = useState(false);

  const params = useParams(); 
  const { id } = params;

  useEffect(() => {
    const verifyAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/users/verify/${id}`;
        const { data } = await axios(url);
        setAlert({msg: data.msg, error: false});
        setVerified(true);
      } catch (error: any) {
        setAlert({msg: error.response.data.msg, error: true});
      }
    }
    verifyAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
        <h1 className='text-sky-600 font-black text-6xl'>Confirma tu cuenta y comienza a crear tus 
            <span className='text-slate-700'> Proyectos </span>
        </h1>
        <div className='mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white'>
          {msg && <Alert alert={alert} />}
          {verified && (
            <Link 
              className='block text-center my-5 text-slate-500 uppercase text-sm'
              to='/'
            >
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          )}
        </div>
    </>
  )
}

export default VerifyAccount;