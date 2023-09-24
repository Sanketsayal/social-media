import { Link } from 'react-router-dom';
// import { toast } from 'react-hot-toast'

import Comment from './Comment';
import { useEffect, useState } from 'react'
import styles from '../styles/posts.module.css'
import { useAxios } from '../hooks/useAxios';
import {toast} from 'react-hot-toast'
import { postApi } from '../api/postsApi';
import { useAuthContext } from '../context/AuthContext';
import { usePostContext } from '../context/PostContext';

const Post=({post})=>{
    const [comment, setComment] = useState('');

    const { error, sendRequest } = useAxios();
    const {posts}=usePostContext()
    const {user}=useAuthContext()

    useEffect(() => {
      if (error?.errors) {
        error.errors.forEach((e) => {
          toast.error(e.msg);
        });
      } else if (error?.message) {
        toast.error(error.message);
      }
    }, [error]);

    const toggleLike=(data)=>{
      if(!data.deleted){
        post.likes.push(data.like._id)
      }else{
        let p=post.likes.filter((like)=> like!==data.like._id)
        post.likes=p
      }
      
    }

    const handleLike=async ()=>{
      sendRequest({
        method:'POST',
        url:postApi.toggleLike(user._id),
        data:{
          postId:post._id
        }
      },(data)=>{
        toggleLike(data.data)
      })
        
    }

    const addCommentToPost=(comment)=>{
      let newPosts=posts
      console.log(posts)
      newPosts.map((post)=>{
        if(post._id===comment.post){
          post.comments=[comment,...post.comments]
        }
        return post
      })
      console.log(newPosts)
    }

    const handleAddComment = async (e) => {

      if(e.key==='Enter'){
        sendRequest({
          method:'POST',
          url:postApi.postComment(user._id),
          data:{
            content:comment,
            post:post._id
          }
        },(data)=>{
          addCommentToPost(data.data)
        })
      }
        
    };

    return(
        <div className={styles.postWrapper} key={post._id}>
            <div className={styles.postHeader}>
                <div className={styles.postAvatar}>
                    <img
                        src={`data:image/svg+xml;base64,${post.user.avatar}`}
                        alt="user-pic"
                    />
                    <div>
                        <Link 
                            to={`/user/${post.user._id}`}
                            state= {{user: post.user}}
                            className={styles.postAuthor}
                            >
                            {post.user.name}
                        </Link>
                        <span className={styles.postTime}>a minute ago</span>
                    </div>
                </div>
                <div className={styles.postContent}>{post.content}</div>

                <div className={styles.postActions}>
                    <div className={styles.postLike}>
                        <button onClick={handleLike}>
                            <img
                                src="https://cdn-icons-png.flaticon.com/512/594/594907.png?w=740&t=st=1682256055~exp=1682256655~hmac=a0649dbfaccd7f80af6961956fa82650f099e6491753b78d89ddab57244d1c49"
                                alt="likes-icon"
                            />
                        </button>
                        <span>{post.likes.length}</span>
                    </div>

                    <div className={styles.postCommentsIcon}>
                        <img
                        src="https://cdn-icons-png.flaticon.com/512/1230/1230203.png?w=740&t=st=1682256160~exp=1682256760~hmac=0c2bb61167e53ecf07213cd2b50e50acb5915c16c118a1a25d09f379a0a54230"
                        alt="comments-icon"
                        />
                        <span>{post.comments.length}</span>
                    </div>
                </div>
                <div className={styles.postCommentBox}>
                <input
                    placeholder="Start typing a comment"
                    onKeyDown={handleAddComment}
                    onChange={(e)=>setComment(e.target.value)}
                />
                </div>

                <div className={styles.postCommentsList}>
                {post.comments.map((comment) => (
                    <Comment comment={comment} key={`post-comment-${comment._id}`} />
                ))}
                </div>
            </div>
        </div>
    )
}

export default Post;