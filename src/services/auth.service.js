import httpRequest from '~/utils/httpRequest';

/**
 *
 * @param {Object} user
 * @returns
 */
export const register = async (user) => {
    console.log(`file: auth.service.js:9 > user:`, user);
    try {
        const result = await httpRequest.post('/auth/register', user);

        return result.data;
    } catch (error) {
        console.log(error);
    }
};
