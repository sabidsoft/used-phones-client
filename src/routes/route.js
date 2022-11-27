import { createBrowserRouter } from 'react-router-dom'
import DashboardLayout from '../layout/DashboardLayout'
import Main from '../layout/Main'
import Blogs from '../pages/Blogs'
import Brand from '../pages/Brand'
import Dashboard from '../pages/dashboard/Dashboard'
import MyOrders from '../pages/dashboard/MyOrders'
import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NotFoundPage'
import Register from '../pages/Register'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/brands/:id',
                element: <PrivateRoute><Brand /></PrivateRoute>,
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
        element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/dashboard/my-orders',
                element: <MyOrders />
            },
            {
                path: '/dashboard/payment/:id',
                element: <Payment/>,
                loader: ({params}) => fetch(`${DOMAIN_NAME}/bookings/${params.id}`)
            }
        ]
    }
])