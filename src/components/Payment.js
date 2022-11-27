import React from 'react'
import { useLoaderData } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'

const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk)

const Payment = () => {
    const booking = useLoaderData()
    const { brandName, modelName, resalePrice } = booking

    // const navigation = useNavigation()
    // if(navigation.state === 'loading'){
    //     return <Loading/>
    // }

    return (
        <div>
            <h1 className='text-2xl mb-6'>Payment for second hand mobile phone</h1>
            <p>Please pay <strong>${resalePrice}</strong> for your {brandName}, model {modelName}</p>
            <div className='w-96 my-12'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm
                        booking={booking}
                    />
                </Elements>
            </div>
        </div>
    )
}

export default Payment