import React, { useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import { Link } from 'react-router-dom';

import Navbar from '../components/Navbar'
import styles from '../styles/login.module.css'
import { useAxios } from '../hooks/useAxios';
import { authApi } from '../api/authApi';
import { useAuthContext } from '../context/AuthContext';


function Signin() {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');

  const { error: submitError, isLoading: submitLoading, sendRequest: postLogin } = useAxios();
  const {setUser,setToken}=useAuthContext()

  useEffect(() => {
    if (submitError?.errors) {
      submitError.errors.forEach((e) => {
        toast.error(e.msg);
      });
    } else if (submitError?.message) {
      toast.error(submitError.message);
    }
  }, [submitError]);


  const handleSubmit=async (e)=>{
    e.preventDefault();

    if (!email || !password) {
      toast.error('All fields are required!');
      return;
    }
    postLogin(
      {
        method: 'POST',
        url: authApi.signin,
        data: {email,password}
      },
      (data) => {
        const { token, user } = data.data;
        setUser(user);
        setToken(token);
      }
    );
    
  }


  return (
    <div>
        <Navbar />
        <form className={styles.loginForm} onSubmit={handleSubmit}>
        <span className={styles.loginSignupHeader}>Log In</span>
  
        <div className={styles.field}>
          <input
            type="email"
            placeholder="email..."
            value={email}
            onChange={(e)=> setEmail(e.target.value)}
          />
        </div>
  
        <div className={styles.field}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=> setPassword(e.target.value)}
          />
        </div>
  
        <div className={styles.field}>
          <button disabled={submitLoading}>
            {submitLoading?'Logging in ...':'Log In'}
          </button>
        </div>

        <div style={{marginTop:'5px'}}>
          Do not have an account?&nbsp;
          <Link to='/sign-up'>
            <span>Sign Up</span>
          </Link>
        </div>
      </form>

    </div>
  )
}

export default Signin