import config from '~/config';
import SinglePostLayout from '~/layouts/SinglePostLayout';

import Home from '~/pages/Home';
import SinglePost from '~/pages/SinglePost';

const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.post,
        component: SinglePost,
        layout: SinglePostLayout,
    },
];

export { publicRoutes };
