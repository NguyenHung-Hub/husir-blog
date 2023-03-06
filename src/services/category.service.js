import httpRequest from '~/utils/httpRequest';

export const getCategories = async () => {
    try {
        const res = await httpRequest.get('/categories');

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const save = async (name) => {
    try {
        const res = await httpRequest.post('/categories', { name });

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
