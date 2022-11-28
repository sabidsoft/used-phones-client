import DOMAIN_NAME from '../utilities/DOMAIN_NAME'
import Loading from './Loading'
import { format, parseISO } from 'date-fns'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import axios from 'axios'

const AdvertisedItems = () => {
    const [advertisedItems, setAdvertisedItems] = useState([])
    const [loading, setLoading] = useState([])

    useEffect(() => {
        axios.get(`${DOMAIN_NAME}/advertised-items`)
        .then(res => {
            setAdvertisedItems(res.data)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading />
    }

    return (
        <div>
            {
                advertisedItems.length !== 0 && (
                    <div className='max-w-[1440px] mx-auto px-5 lg:px-0'>
                        <h1 className='text-center text-5xl mt-24 mb-20'>Advertised Items</h1>
                        <div className='grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-28'>
                            {
                                advertisedItems.map(phone => {
                                    return (
                                        <div key={phone._id} className="card bg-base-100 shadow-xl">
                                            <figure><img src={phone.image} alt="Brand Pic" className='h-72 w-full' /></figure>
                                            <div className="card-body">
                                                <h2 className="text-2xl font-semibold text-center mb-5">Phone Details</h2>
                                                <p><span className='font-bold'>Brand:</span> {phone.brand}</p>
                                                <p><span className='font-bold'>Model:</span> {phone.model}</p>
                                                <p><span className='font-bold'>Location:</span> {phone.location}</p>
                                                <p><span className='font-bold'>Phone Number:</span> {phone.phone_number}</p>
                                                <p><span className='font-bold'>Original Price:</span> ${phone.original_price}</p>
                                                <p><span className='font-bold'>Resale Price:</span> ${phone.resale_price}</p>
                                                <p><span className='font-bold'>Years of Use:</span> {phone.years_of_use}</p>
                                                <p><span className='font-bold'>Condition Type:</span> {phone.condition_type}</p>
                                                <p><span className='font-bold'>Posted Date:</span> {format(parseISO(phone.post_time), 'PP')}</p>
                                                <p className='mb-5'>
                                                    <span className='font-bold'>Seller's Name:</span> {phone.seller_name}
                                                    {
                                                        phone.is_seller_verified && <CheckCircleIcon title='Verified Seller' className="h-5 w-5 text-blue-500 inline-block ml-1" />
                                                    }
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default AdvertisedItems