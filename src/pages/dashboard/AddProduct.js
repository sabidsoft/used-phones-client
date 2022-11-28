import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import { AuthContext } from '../../contexts/AuthProvider'
import DOMAIN_NAME from '../../utilities/DOMAIN_NAME'

const AddProduct = () => {
    const { user } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()

    const onSubmit = data => {
        const formData = new FormData()
        formData.append('image', data.image[0])

        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbb_key}`, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imageData => {
                if (imageData.success) {
                    const phone = {
                        brand: data.brand,
                        model: data.model,
                        image: imageData.data.url,
                        location: data.location,
                        phone_number: data.phoneNumber,
                        resale_price: data.resalePrice,
                        original_price: data.originalPrice,
                        years_of_use: data.yearsOfUse,
                        condition_type: data.conditionType,
                        post_time: new Date(),
                        seller_name: user?.displayName,
                        is_seller_verified: false
                    }

                    fetch(`${DOMAIN_NAME}/phones`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `Bearer ${localStorage.getItem('token')}`
                        },
                        body: JSON.stringify(phone)
                    })
                        .then(res => res.json())
                        .then(result => {
                            console.log(result)
                            toast.success(`Phone added successfully`)
                        })
                        .catch(err => console.log(err))
                }
            })
            .catch(err => console.log(err))
    }
    return (
        <section className='px-5 mb-20'>
            <div className='max-w-[700px] mx-auto px-8 pt-10 pb-5 shadow-lg rounded-xl'>
                <h1 className='text-2xl font-semibold text-center mb-10'>Add A Product</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='brand' className="font-semibold mb-1">Phone Brand</label>
                        <select
                            name='brand'
                            id='brand'
                            className="select select-bordered w-full"
                            {...register("brand", {
                                required: 'Phone brand is required!'
                            })}
                        >
                            <option value='iPhone'>iPhone</option>
                            <option value='Samsung'>Samsung</option>
                            <option value='Oppo'>Oppo</option>
                        </select>
                        {errors.brand && <span className='text-red-600'>{errors.brand?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='model' className="font-semibold mb-1">Phone Model</label>
                        <input
                            type="text"
                            id='model'
                            className="input input-bordered w-full"
                            {...register("model", {
                                required: 'Model is required!'
                            })}
                        />
                        {errors.model && <span className='text-red-600'>{errors.model?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='resalePrice' className="font-semibold mb-1">Resale Price</label>
                        <input
                            type="text"
                            id='resalePrice'
                            className="input input-bordered w-full"
                            {...register("resalePrice", {
                                required: 'Resale price is required!'
                            })}
                        />
                        {errors.resalePrice && <span className='text-red-600'>{errors.resalePrice?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='originalPrice' className="font-semibold mb-1">Original Price</label>
                        <input
                            type="text"
                            id='originalPrice'
                            className="input input-bordered w-full"
                            {...register("originalPrice", {
                                required: 'Original price is required!'
                            })}
                        />
                        {errors.originalPrice && <span className='text-red-600'>{errors.originalPrice?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='location' className="font-semibold mb-1">Location</label>
                        <input
                            type="text"
                            id='location'
                            className="input input-bordered w-full"
                            {...register("location", {
                                required: 'Location is required!'
                            })}
                        />
                        {errors.location && <span className='text-red-600'>{errors.location?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='phoneNumber' className="font-semibold mb-1">Phone Number</label>
                        <input
                            type="text"
                            id='phoneNumber'
                            className="input input-bordered w-full"
                            {...register("phoneNumber", {
                                required: 'Phone number is required!'
                            })}
                        />
                        {errors.phoneNumber && <span className='text-red-600'>{errors.phoneNumber?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='yearsOfUse' className="font-semibold mb-1">Year of Use</label>
                        <input
                            type="number"
                            id='yearsOfUse'
                            className="input input-bordered w-full"
                            {...register("yearsOfUse", {
                                required: 'Year of use is required!'
                            })}
                        />
                        {errors.yearsOfUse && <span className='text-red-600'>{errors.yearsOfUse?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='conditionType' className="font-semibold mb-1">Condition Type</label>
                        <select
                            name='conditionType'
                            id='conditionType'
                            className="select select-bordered w-full"
                            {...register("conditionType", {
                                required: 'Condition type is required!'
                            })}
                        >
                            <option value='Excellent'>Excellent</option>
                            <option value='Good'>Good</option>
                            <option value='Fair'>Fair</option>
                        </select>
                        {errors.conditionType && <span className='text-red-600'>{errors.conditionType?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='image' className="font-semibold mb-1">Phone Image</label>
                        <input
                            type="file"
                            id='image'
                            className="input input-bordered w-full"
                            {...register("image", {
                                required: 'Image is required!'
                            })}
                        />
                        {errors.image && <span className='text-red-600'>{errors.image?.message}</span>}
                    </div>
                    <input type="submit" value='Add Product' className='btn btn-success text-white w-full mb-5' />
                </form>
            </div>
        </section>
    )
}

export default AddProduct