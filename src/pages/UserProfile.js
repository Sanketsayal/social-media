import React, { useState } from 'react'

import styles from '../styles/profile.module.css'
import Aside from '../components/Aside'
import { useAuthContext } from '../context/AuthContext'


function UserProfile() {
    const [edit,setEdit]=useState(false);

    const {user}=useAuthContext()

    const checkIfUserIsAFriend = () => {
    
    };

    const handleRemoveFriendClick = async () => {
    
    };

    const handleAddFriendClick = async () => {
    
    };

    return (
        <div className={styles.home}>
        <Aside />
        
        <div className={styles.settings}>
        <div className={styles.imgContainer}>
            <img alt="" src={`data:image/svg+xml;base64,${user.avatar}`} ></img>
        </div>
    
        <div className={styles.field}>
            <div className={styles.fieldLabel}>Email</div>
            <div className={styles.fieldValue}>{user?.email}</div>
        </div>
        <div className={styles.field}>
            <div className={styles.fieldLabel}>Name</div>
            {edit?(
                <input type='text' 
                placeholder={user?.name} 
                 />
            )
                
            :(<div className={styles.fieldValue}>{user?.name}</div>)}
            
        </div>
        {edit &&
        <>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Password</div>
                <input type='password' />
            </div>
            <div className={styles.field}>
                <div className={styles.fieldLabel}>Confirm Password</div>
                <input type='password' />
            </div>
        </>
        }
        
        <div className={styles.btnGrp}>
        {false?(
            <>
                <button 
                className={`button ${styles.saveBtn}`} 
                // onClick={updateProfile}
                disabled={true} >
                    {false?'Saving...':'Save'}
                </button>
                <button className={`button ${styles.editBtn}`} >
                    Go back
                </button>
            </>
        ):(
            <button className={`button ${styles.editBtn}`} onClick={()=>setEdit(!edit)} >
                Edit Profile
            </button>
        )}
            
        </div>

    </div>
    </div>
)
}

export default UserProfile