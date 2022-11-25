import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import Main from '../layout/Main'
import Blogs from '../pages/Blogs'
import Brand from '../pages/Brand'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Register from '../pages/Register'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'

export const router = createBrowserRouter([
    {
        path: '/',
        errorElement: <NotFoundPage />,
        element: <Main />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/brands/:id',
                element: <Brand />,
                loader: ({ params }) => fetch(`${DOMAIN_NAME}/brands/${params.id}`)
            },
            {
                path: '/blogs',
                element: <Blogs />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    },
    {
        path: '/dashboard',
        errorElement: <NotFoundPage />,
        element: <DashboardLayout />,
        // children: [
        //     {

        //     },
        // ]
    }
])