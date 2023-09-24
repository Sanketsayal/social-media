export const postApi={
    create:(id)=> `/posts/create-post/${id}`,
    getpost:'/posts/get-posts',
    postComment:(id)=>`/posts/create-comment/${id}`,
    toggleLike:(id)=> `/posts/toggle-like/${id}`
}