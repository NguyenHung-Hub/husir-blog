import config from '~/config';
import OnlyHeader from '~/layouts/OnlyHeader';
import SinglePostLayout from '~/layouts/SinglePostLayout';

import Home from '~/pages/Home';
import SinglePost from '~/pages/SinglePost';
import Write from '~/pages/Write';

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
    {
        path: config.routes.write,
        component: Write,
        layout: OnlyHeader,
    },
];

export { publicRoutes };
