import React, { useEffect, } from 'react'
import {toast} from 'react-hot-toast'

import CreatePost from './CreatePost'
import Post from './Post'
import styles from '../styles/posts.module.css'
import { useAxios } from '../hooks/useAxios'
import { postApi } from '../api/postsApi'
import { usePostContext } from '../context/PostContext'

function Posts() {

    const {posts,setPosts}=usePostContext()
    const { error, sendRequest: getPosts } = useAxios();

    useEffect(() => {
        if (error?.errors) {
          error.errors.forEach((e) => {
            toast.error(e.msg);
          });
        } else if (error?.message) {
          toast.error(error.message);
        }
      }, [error]);
      

    useEffect(()=>{
        console.log('hi')
        getPosts({
            method:'GET',
            url:postApi.getpost
        },(data)=>{
            setPosts(data.data.post)
        })

    },[getPosts,setPosts])
  return (
    <div className={styles.home}>
            
        <div className={styles.postsList}>
            <CreatePost />
            {posts.map(post=>{
                return <Post post={post} key={`post-${post._id}`}/>
            })}

        </div>

    </div>
  )
}

export default Posts