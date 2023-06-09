import PostActionType from './PostConstants';

export const addAllPost = (posts) => {
    return {
        type: PostActionType.ADD_POST,
        payload: posts,
    };
};

export const addPostBanner = (posts) => {
    return {
        type: PostActionType.ADD_POST_BANNER,
        payload: posts,
    };
};
export const addPostEdit = (post) => {
    return {
        type: PostActionType.ADD_POST_EDIT,
        payload: post,
    };
};
