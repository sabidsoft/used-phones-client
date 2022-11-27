import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../contexts/AuthProvider';
import DOMAIN_NAME from '../utilities/DOMAIN_NAME';

const BookingModal = ({ selectedPhone, refetch, setSelectedPhone }) => {
    const { user } = useContext(AuthContext)
    const { brand, model, resale_price, image } = selectedPhone
    const handleOnSubmit = event => {
        event.preventDefault()
        const username = event.target.name.value
        const userEmail = event.target.email.value
        const brandName = event.target.brand.value
        const modelName = event.target.model.value
        const resalePrice = event.target.resalePrice.value
        const phoneNumber = event.target.phoneNumber.value
        const location = event.target.location.value

        const booking = {
            username,
            userEmail,
            phoneImage: image,
            brandName,
            modelName,
            resalePrice,
            phoneNumber,
            location
        }

        fetch(`${DOMAIN_NAME}/bookings`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    toast.success('Booked successfuly!')
                    refetch()
                    setSelectedPhone(null)
                }
                else {
                    toast.error(data.message)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-center text-2xl font-bold mb-6">Second Hand {brand}</h3>
                    <form onSubmit={handleOnSubmit}>
                        <div className='mb-6'>
                            <label className='font-medium inline-block mb-1'>Username</label>
                            <input
                                type="text"
                                name='name'
                                className="input input-bordered w-full"
                                defaultValue={user?.displayName}
                                disabled
                                required
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='font-medium inline-block mb-1'>Email Address</label>
                            <input
                                type="email"
                                name='email'
                                className="input input-bordered w-full"
                                defaultValue={user?.email}
                                disabled
                                required
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='font-medium inline-block mb-1'>Mobile Brand</label>
                            <input
                                type="text"
                                name='brand'
                                className="input input-bordered w-full"
                                defaultValue={brand}
                                disabled
                                required
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='font-medium inline-block mb-1'>Model</label>
                            <input
                                type="text"
                                name='model'
                                className="input input-bordered w-full"
                                defaultValue={model}
                                disabled
                                required
                            />
                        </div>
                        <div className='mb-6'>
                            <label className='font-medium inline-block mb-1'>Resale Price (tk)</label>
                            <input
                                type="number"
                                name='resalePrice'
                                className="input input-bordered w-full"
                                defaultValue={resale_price}
                                disabled
                                required
                            />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor='phoneNumber' className='font-medium inline-block mb-1'>Phone Number</label>
                            <input
                                type="text"
                                id='phoneNumber'
                                name='phoneNumber'
                                placeholder='Enter phone number'
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <div className='mb-6'>
                            <label htmlFor='location' className='font-medium inline-block mb-1'>Location</label>
                            <input
                                type="text"
                                id='location'
                                name='location'
                                placeholder='Enter your location'
                                className="input input-bordered w-full"
                                required
                            />
                        </div>
                        <input type="submit" value="Submit" className='btn btn-success w-full text-white' />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;