import httpRequest from '~/utils/httpRequest';

export const uploadImage = async (image) => {
    try {
        const res = await httpRequest.post('/upload', image);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
