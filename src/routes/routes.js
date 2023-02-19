import config from '~/config';
import OnlyHeader from '~/layouts/OnlyHeader';
import SinglePostLayout from '~/layouts/SinglePostLayout';

import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Profile from '~/pages/Profile';
import Register from '~/pages/Register';
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
    {
        path: config.routes.login,
        component: Login,
        layout: OnlyHeader,
    },
    {
        path: config.routes.register,
        component: Register,
        layout: OnlyHeader,
    },
    {
        path: config.routes.profile,
        component: Profile,
        layout: OnlyHeader,
    },
];

export { publicRoutes };
