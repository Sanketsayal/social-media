import React, { useCallback, useEffect, useState } from 'react'
import {toast} from 'react-hot-toast'
import {HiOutlineRefresh} from 'react-icons/hi'
import { Link } from 'react-router-dom'

import Navbar from '../components/Navbar'
import styles from '../styles/login.module.css'
import { useAuthContext } from '../context/AuthContext';
import { useAxios } from '../hooks/useAxios';
import {authApi} from '../api/authApi'
import { useAvatar } from '../hooks/useAvatar'

function Signup() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatarImage,setAvatarImage]=useState('');

  const {setToken,setUser}=useAuthContext()
  const { error: submitError, isLoading: submitLoading, sendRequest: postRegister } = useAxios();
  const {isLoading:avatarLoading,fetchAvatar}=useAvatar()

  useEffect(() => {
    if (submitError?.errors) {
      submitError.errors.forEach((e) => {
        toast.error(e.msg);
      });
    } else if (submitError?.message) {
      toast.error(submitError.message);
    }
  }, [submitError]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    postRegister({
      method:'POST',
      url:authApi.signup,
      data:{
        name,email,password,avatarImage
      }
    },(data)=>{
      const { token, user } = data.data;
      setUser(user);
      setToken(token);
      toast.success(data.message)
    })

    // const response = await auth.signup(name, email, password, confirmPassword);

    // if (response.success) {
    //   navigate('/login');
    //   setSigningUp(false);

    //   return toast.success('User registered successfully, please login now');
    // } else {
    //   toast.success(response.message);
    // }
  };

  const generateAvatar=useCallback(async()=>{
    const avatar=await fetchAvatar()
    setAvatarImage(avatar)

  },[fetchAvatar])

  const handleGenerate=(e)=>{
    e.preventDefault()
    e.stopPropagation()
    generateAvatar()
  }


  useEffect(()=>{
    generateAvatar()
  },[generateAvatar])

  return (
    <div>
        <Navbar />
        <form className={styles.loginForm} onSubmit={handleFormSubmit}>
        <span className={styles.loginSignupHeader}> Signup</span>
        <div className={styles.field}>
          <input
            placeholder="Name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="new-password"
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Confirm password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.field}>
          <input
            placeholder="Password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className={`${styles.field} ${styles.avatarBox}`}>
        <div className={styles.avatar}>
          {avatarImage?
          <img 
            className={avatarLoading?'fade':''}
            src={`data:image/svg+xml;base64,${avatarImage}`}
            alt='user-avatar'
          />:null}
          
        </div>
        
        <button className={styles.generateButton} onClick={handleGenerate}>
          <HiOutlineRefresh className={avatarLoading?'spin':''} />
          &nbsp;{avatarLoading?'Generating...':'Generate Avatar'} 
        </button>
      </div>
      <div className={styles.field}>
        <button disabled={submitLoading}>
          {submitLoading ? 'Signing up...' : 'Signup'}
        </button>
      </div>
      <div style={{marginTop:'5px'}}>
        already have an account?&nbsp;
        <Link to='/sign-in'>
          <span>Login</span>
        </Link>
      </div>
      </form>
    </div>
  )
}

export default Signup