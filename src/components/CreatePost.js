import { useEffect, useState } from 'react';
import {toast} from 'react-hot-toast'

import styles from '../styles/posts.module.css';
import {useAxios} from '../hooks/useAxios'
import {postApi} from '../api/postsApi'
import { useAuthContext } from '../context/AuthContext';
import { usePostContext } from '../context/PostContext';

const CreatePost=()=>{
    const [content,setContent]=useState('');
    const {error,isLoading,sendRequest:postCreate}=useAxios()
    const {user}=useAuthContext()
    const {posts,setPosts}=usePostContext()

    useEffect(() => {
        if (error?.errors) {
          error.errors.forEach((e) => {
            toast.error(e.msg);
          });
        } else if (error?.message) {
          toast.error(error.message);
        }
      }, [error]);

    const handleAddPost=async ()=>{
        postCreate({
            method:'POST',
            url:postApi.create(user._id),
            data:{
                content
            }
        },(data)=>{
            setPosts([data.data.post,...posts])
        })
        
    }

    return(
        <div className={styles.createPost}>
            <textarea 
                className={styles.addPost}
                value={content}
                onChange={(e)=>setContent(e.target.value)}
                placeholder='Type Here ...'
            ></textarea>
            <div>
                <button 
                    className={styles.addPostBtn}
                    onClick={handleAddPost}
                    disabled={isLoading}
                >
                {isLoading?'Adding Post':'Add Post'}
                </button>
            </div>
        </div>
    )
}

export default CreatePost;