import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import DOMAIN_NAME from '../../utilities/DOMAIN_NAME';

const MyOrders = () => {
    const { user } = useContext(AuthContext)

    const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(`${DOMAIN_NAME}/bookings?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    console.log(bookings)

    return (
        <div className="overflow-x-auto">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Phone Image</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Price</th>
                        <th>Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bookings.map((booking, index) => {
                            return (
                                <tr key={booking._id}>
                                    <th>{index + 1}</th>
                                    <td><img src={booking.phoneImage} alt="Phone Pic" className='w-10 h-10 rounded-full' /></td>
                                    <td>{booking.brandName}</td>
                                    <td>{booking.modelName}</td>
                                    <td>{`$${booking.resalePrice}`}</td>
                                    <td>
                                            {
                                                booking.resalePrice && !booking.paid && (
                                                    <Link to={`/dashboard/payment/${booking._id}`}>
                                                        <button className='btn btn-sm btn-success text-white'>Pay Now</button>
                                                    </Link>
                                                )
                                            }
                                            {
                                                booking.resalePrice && booking.paid && <span className='text-green-600'>Paid</span>
                                            }
                                        </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrders;