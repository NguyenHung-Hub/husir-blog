import React, { createContext, useReducer } from 'react';
import PostReducer, { initPosts } from './PostReducer';

export const PostContext = createContext();

function PostProvider({ children }) {
    const [postsState, postsDispatch] = useReducer(PostReducer, initPosts);

    console.log({ postsState });

    return (
        <>
            <PostContext.Provider value={{ postsState, postsDispatch }}>{children}</PostContext.Provider>
        </>
    );
}

export default PostProvider;
