import React, { useEffect, useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'
import toast from 'react-hot-toast'


const CheckoutForm = ({ booking }) => {
    const [cardError, setCardError] = useState('')
    const [success, setSuccess] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    const stripe = useStripe()
    const elements = useElements()
    const { _id, userEmail, username, resalePrice } = booking

    useEffect(() => {
        fetch(`${DOMAIN_NAME}/create-payment-intent`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ resalePrice }),
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.clientSecret));
    }, [resalePrice])

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement)
        if (card == null) {
            return
        }

        const { error } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            setCardError(error.message)
        } else {
            setCardError('')
        }

        setSuccess('')
        setProcessing(true)
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: username,
                    email: userEmail
                },
            },
        })

        if (confirmError) {
            setCardError(confirmError.message)
            return
        }

        // console.log(paymentIntent)
        const payment = {
            resalePrice,
            userEmail,
            bookingId: _id,
            transactionId: paymentIntent.id,
        }

        if (paymentIntent.status === "succeeded") {
            fetch(`${DOMAIN_NAME}/payments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(payment)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        setSuccess('Congrates! your payment is successfully done.')
                        setTransactionId(paymentIntent.id)
                        toast.success('Payment is sucessfully done!')
                    }
                })
                .catch(err => console.log(err))
        }
        setProcessing(false)
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <CardElement
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                {cardError && <p className='text-red-600 mt-4'>{cardError}</p>}
                {
                    success && (
                        <div className='mt-5 mb-2'>
                            <p className='text-green-600'>{success}</p>
                            <p>Your Transaction ID is <span className='font-bold'>{transactionId}</span></p>
                        </div>
                    )
                }
                <button
                    className='btn  btn-success mt-4 text-white'
                    type="submit"
                    disabled={!stripe || !clientSecret || processing}>
                    Pay Now
                </button>
            </form>
        </>
    )
}

export default CheckoutForm