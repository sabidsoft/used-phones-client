import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../components/Loading';
import DOMAIN_NAME from '../../utilities/DOMAIN_NAME';

const AllSellers = () => {
    const { data: allSellers = [], isLoading, refetch } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            try {
                const res = await fetch(`${DOMAIN_NAME}/all-sellers`)
                const data = res.json()
                return data
            }
            catch (error) {
                console.log(error)
            }
        }
    })

    if (isLoading) {
        return <Loading />
    }

    const handleDelete = id => {
        fetch(`${DOMAIN_NAME}/all-sellers/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => res.json)
            .then(data => {
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
                        <th>Seller Name</th>
                        <th>Seller Email</th>
                        <th>Delete seller</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allSellers.map((seller, index) => {
                            return (
                                <tr key={seller._id}>
                                    <th>{index + 1}</th>
                                    <td>{seller.name}</td>
                                    <td>{seller.email}</td>
                                    <td><td><button onClick={() => handleDelete(seller._id)} className="btn btn-xs btn-error text-white">Delete</button></td></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllSellers;