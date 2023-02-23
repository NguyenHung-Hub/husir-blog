import randomPosts from '~/utils/randomPosts';
import PostActionType from './PostConstants';

export const initPosts = {
    postsBanner: [],
    allPost: [],
    postsRecommand: [],
};

function PostReducer(state, action) {
    switch (action.type) {
        case PostActionType.ADD_POST: {
            const postsRecommand = randomPosts(action.payload, 3);
            return {
                ...state,
                allPost: [...state.allPost, ...action.payload],
                postsRecommand,
            };
        }
        case PostActionType.ADD_POST_BANNER: {
            return {
                ...state,
                postsBanner: [...state.postsBanner, ...action.payload],
            };
        }

        default: {
            throw new Error('Invalid post action');
        }
    }
}

export default PostReducer;
