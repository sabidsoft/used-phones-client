import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import Footer from '../components/Footer'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'
import { CheckCircleIcon } from '@heroicons/react/24/solid'
import Loading from '../components/Loading'
import BookingModal from '../modal/BookingModal'

const Brand = () => {
    const [selectedPhone, setSelectedPhone] = useState(null)
    const brand = useLoaderData()

    const { data: phones = [], isLoading, refetch } = useQuery({
        queryKey: ['phones', brand.brand],
        queryFn: async () => {
            try {
                const res = await fetch(`${DOMAIN_NAME}/phones?brand=${brand.brand}`)
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

    if (phones.length === 0) {
        return (
            <div className='h-screen flex flex-col justify-center items-center'>
                <h1 className='text-4xl font-semibold mb-5'>We Are Sorry!</h1>
                <h1 className='text-2xl font-semibold'>Secon hand {brand.brand} not available</h1>
            </div>
        )
    }

    return (
        <div>
            <div className='max-w-[1440px] mx-auto px-5 lg:px-0'>
                <h1 className='text-center text-5xl font-bold mt-24 mb-20'>Used {brand.brand} Mobile Phones</h1>
                <div className='grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 mb-28'>
                    {
                        phones.map(phone => {
                            return (
                                <div key={phone._id} className="card bg-base-100 shadow-xl">
                                    <figure><img src={phone.image} alt="Brand Pic" className='h-72 w-full' /></figure>
                                    <div className="card-body">
                                        <h2 className="text-2xl font-semibold text-center mb-5">Phone Details</h2>
                                        <p><span className='font-bold'>Brand:</span> {phone.brand}</p>
                                        <p><span className='font-bold'>Model:</span> {phone.model}</p>
                                        <p><span className='font-bold'>Location:</span> {phone.location}</p>
                                        <p><span className='font-bold'>Original Price:</span> ${phone.original_price}</p>
                                        <p><span className='font-bold'>Resale Price:</span> ${phone.resale_price}</p>
                                        <p><span className='font-bold'>Years of Use:</span> {phone.years_of_use}</p>
                                        <p><span className='font-bold'>Posted Date:</span> {phone.post_time}</p>
                                        <p className='mb-5'>
                                            <span className='font-bold'>Seller's Name:</span> {phone.seller_name}
                                            {
                                                phone.is_seller_verified && <CheckCircleIcon title='Verified Seller' className="h-5 w-5 text-blue-500 inline-block ml-1" />
                                            }
                                        </p>
                                        <div className="card-actions justify-end">
                                            <label onClick={() => setSelectedPhone(phone)} htmlFor="booking-modal" className="btn btn-success text-white">Book Now</label>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
            {
                selectedPhone && (
                    <BookingModal
                        selectedPhone={selectedPhone}
                        refetch={refetch}
                        setSelectedPhone={setSelectedPhone}
                    />
                )
            }
        </div>
    )
}

export default Brand