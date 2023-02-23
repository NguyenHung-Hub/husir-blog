import httpRequest from '~/utils/httpRequest';

export const getPost = async () => {
    try {
        const res = await httpRequest.get('/post');

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

/**
 *
 * @param {number} numberPost
 */
export const getRecentPost = async (numberPost) => {
    try {
        const res = await httpRequest.get(`/post?recent=${numberPost}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
