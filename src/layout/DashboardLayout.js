import React, { useContext, useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Loading from '../components/Loading'
import Menubar from '../components/Menubar'
import { AuthContext } from '../contexts/AuthProvider'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'

const DashboardLayout = () => {
    const { user } = useContext(AuthContext)
    const [userType, setUserType] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch(`${DOMAIN_NAME}/users/${user?.email}`)
            .then(res => res.json())
            .then(data => {
                setUserType(data.user_type)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [user?.email])

    if(loading){
        return <Loading/>
    }

    return (
        <div>
            <Menubar />
            <div className='max-w-[1440px] mx-auto'>
                <div className='text-center mt-10 mb-10 px-10'>
                    {
                        userType === 'Buyer' && (
                            <>
                                <Link to='/dashboard/my-orders' className='inline-block mr-3 mb-5'>
                                    <button className="btn btn-outline btn-success rounded-full px-8">My Orders</button>
                                </Link>
                            </>
                        )
                    }
                    {
                        userType === 'Seller' && (
                            <>
                                <Link to='/dashboard/add-product' className='inline-block mr-3 mb-5'>
                                    <button className="btn btn-outline btn-success rounded-full px-8">Add A product</button>
                                </Link>
                                <Link to='/dashboard/my-products' className='inline-block mr-3 mb-5'>
                                    <button className="btn btn-outline btn-success rounded-full px-8">My Products</button>
                                </Link>
                            </>
                        )
                    }
                    {
                        userType === 'Admin' && (
                            <>
                                <Link to='/dashboard/all-sellers' className='inline-block mr-3 mb-5'>
                                    <button className="btn btn-outline btn-success rounded-full px-8">All Sellers</button>
                                </Link>
                                <Link to='/dashboard/all-buyers' className='inline-block mr-3 mb-5'>
                                    <button className="btn btn-outline btn-success rounded-full px-8">All Buyers</button>
                                </Link>
                            </>
                        )
                    }
                </div>
                <Outlet />
            </div>
        </div>
    )
}

export default DashboardLayout