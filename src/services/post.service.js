import httpRequest from '~/utils/httpRequest';

export const getAllPost = async () => {
    try {
        const res = await httpRequest.get('/post');

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

/**
 *
 * @param {String} slug
 * @returns
 */
export const getPost = async (slug) => {
    try {
        const res = await httpRequest.get(`/post/${slug}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getPostByCategory = async (category) => {
    try {
        const res = await httpRequest.get(`/post?category=${category}`);

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

export const savePost = async (post) => {
    try {
        const res = await httpRequest.post('/post', post);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

/**
 *
 * @param {Number} number
 * @returns
 */
export const getRecommend = async (number) => {
    try {
        const res = await httpRequest.get(`/post/recommend?number=${number}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getByUser = async (id) => {
    try {
        const res = await httpRequest.get(`/post?id=${id}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const update = async (post) => {
    try {
        const res = await httpRequest.put(`/post/${post._id}`, post);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
