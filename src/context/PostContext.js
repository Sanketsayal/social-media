import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const PostContext = createContext(null);

export const usePostContext = () => useContext(PostContext);

export default function PostContextProvider({ children }) {
  const [posts, setPosts] = useState([])

  return <PostContext.Provider value={{ posts, setPosts,}}>{children}</PostContext.Provider>;
}

PostContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};