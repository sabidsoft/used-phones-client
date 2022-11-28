import { useQuery } from '@tanstack/react-query'
import React, { useContext } from 'react'
import toast from 'react-hot-toast'
import { AuthContext } from '../../contexts/AuthProvider'
import DOMAIN_NAME from '../../utilities/DOMAIN_NAME'

const MyProducts = () => {
    const { user } = useContext(AuthContext)

    const { data: myProducts = [], refetch } = useQuery({
        queryKey: ['myProducts', user?.email],
        queryFn: async () => {
            const res = await fetch(`${DOMAIN_NAME}/my-products?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })

    const handleAdvertise = myProduct => {
        const phone = {
            phoneId: myProduct._id,
            brand: myProduct.brand,
            model: myProduct.model,
            image: myProduct.image,
            location: myProduct.location,
            phone_number: myProduct.phone_number,
            resale_price: myProduct.resale_price,
            original_price: myProduct.original_price,
            years_of_use: myProduct.years_of_use,
            condition_type: myProduct.condition_type,
            post_time: myProduct.post_time,
            seller_name: myProduct.seller_name,
            seller_email: myProduct.seller_email,
            sales_status: myProduct.sales_status,
            is_seller_verified: myProduct.is_seller_verified
        }
        fetch(`${DOMAIN_NAME}/advertised-items`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(phone)
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Advertisement done!')
            })
            .catch(err => console.log(err))
    }

    const handleDelete = id => {
        fetch(`${DOMAIN_NAME}/my-products/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                toast.success('Product deleted successfully!')
                refetch()
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="overflow-x-auto mb-20">
            <table className="table w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Phone Image</th>
                        <th>Brand</th>
                        <th>Model</th>
                        <th>Resale Price</th>
                        <th>Sales Status</th>
                        <th>Advertisement</th>
                        <th>Delete Product</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        myProducts.map((myProduct, index) => {
                            return (
                                <tr key={myProduct._id}>
                                    <th>{index + 1}</th>
                                    <td><img src={myProduct.image} alt="Phone Pic" className='w-10 h-10 rounded-full' /></td>
                                    <td>{myProduct.brand}</td>
                                    <td>{myProduct.model}</td>
                                    <td>{`$${myProduct.resale_price}`}</td>
                                    <td>{myProduct.sales_status}</td>
                                    <td>
                                        {
                                            myProduct.sales_status === 'Available' ? (
                                                <button onClick={() => handleAdvertise(myProduct)} className="btn btn-xs btn-success text-white">Advertise</button>
                                            ) : (
                                                'Already sold'
                                            )
                                        }
                                    </td>
                                    <td><button onClick={() => handleDelete(myProduct._id)} className="btn btn-xs btn-error text-white">Delete</button></td>

                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyProducts