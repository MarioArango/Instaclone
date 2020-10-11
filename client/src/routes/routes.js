import Home from '../pages/Home/Home';
import Error404 from '../pages/Error404/Error404';
import User from '../pages/User';
import LayoutBasic from '../layouts/LayoutBasic';
import LayoutError from '../layouts/LayoutError';
//El sistema de rutas es para usuarios logeados

const routes = [
    {
        path: "/",
        layout: LayoutBasic,
        component: Home,
        exact: true
    },
    {
        path: "/:username",
        layout: LayoutBasic,
        component: User,
        exact: true
    },
    {
        layout: LayoutError,
        component: Error404
    }
];

export default routes;