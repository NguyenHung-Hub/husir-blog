import httpRequest from '~/utils/httpRequest';

export const getUser = async (id) => {
    try {
        const res = await httpRequest.get(`/user/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (user) => {
    console.log(`file: user.service.js:14 > user:`, user, `/user/${user.userId}`);
    try {
        const res = await httpRequest.put(`/user/${user.userId}`, user);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
