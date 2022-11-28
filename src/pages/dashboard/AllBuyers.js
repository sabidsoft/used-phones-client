import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Loading from '../../components/Loading';
import DOMAIN_NAME from '../../utilities/DOMAIN_NAME';

const AllBuyers = () => {
    const { data: allBuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            try {
                const res = await fetch(`${DOMAIN_NAME}/all-buyers`)
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
        fetch(`${DOMAIN_NAME}/all-buyers/${id}`, {
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
                        <th>Buyer Name</th>
                        <th>Buyer Email</th>
                        <th>Delete Buyer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allBuyers.map((buyer, index) => {
                            return (
                                <tr key={buyer._id}>
                                    <th>{index + 1}</th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td><td><button onClick={() => handleDelete(buyer._id)} className="btn btn-xs btn-error text-white">Delete</button></td></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default AllBuyers;