import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'

const Register = () => {
    const [signupError, setSignupError] = useState('')
    const { signup, updateUserProfile, googleLogin } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()

    // email/password signup
    const handleOnSubmit = data => {
        signup(data.email, data.password)
            .then(result => {
                const profile = {
                    displayName: data.name
                }
                updateUserProfile(profile)
                    .then(() => {
                        saveUserToDatabase(data.email, data.name, data.user_type)
                        setSignupError('')
                        navigate('/')
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    setSignupError('Email already in use!')
                }
            })
    }

    // google login
    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const { email, displayName } = result.user
                const user_type = 'Buyer'
                saveUserToDatabase(email, displayName, user_type)
                navigate('/')
            })
            .catch(err => console.log(err))
    }

    // save user to database
    const saveUserToDatabase = (email, name, user_type) => {
        const user = {
            email,
            name,
            user_type
        }
        fetch(`${DOMAIN_NAME}/users`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                getUserToken(email)
            })
            .catch(err => console.log(err))
    }

    // fetch jwt token from server and save to localstorage
    const getUserToken = email => {
        fetch(`${DOMAIN_NAME}/jwt?email=${email}`)
            .then(res => res.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token)
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='h-[800px] flex justify-center items-center px-3 lg:px-0'>
            <div className='w-[385px] shadow-lg rounded-lg px-8 py-6'>
                <h1 className='text-xl text-center mb-9'>Register</h1>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='name' className="font-semibold mb-1">Name</label>
                        <input
                            type="text"
                            id='name'
                            className="input input-bordered w-full"
                            {...register("name", {
                                required: 'Name is required!',
                                minLength: { value: 3, message: 'Name is too short!' }
                            })}
                        />
                        {errors.name && <span className='text-red-600'>{errors.name?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='email' className="font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            id='email'
                            className="input input-bordered w-full"
                            {...register("email", { required: 'Email is required!' })}
                        />
                        {errors.email && <span className='text-red-600'>{errors.email?.message}</span>}
                    </div>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='password' className="font-semibold mb-1">Password</label>
                        <input
                            type="password"
                            id='password'
                            className="input input-bordered w-full"
                            {...register("password", {
                                required: 'Password is required!',
                                minLength: { value: 6, message: 'Password must be 6 characters long!' },
                                pattern: { value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/, message: 'Password must contain at least a lowercase, a uppercase and a number!' }
                            })}
                        />
                        {errors.password && <span className='text-red-600'>{errors.password?.message}</span>}
                    </div>
                    <div className="flex mb-3">
                        <input
                            type="radio"
                            name="user_type"
                            value='Buyer'
                            defaultChecked
                            className="radio radio-success mr-2"
                            {...register("user_type")}
                        />
                        <span>As a Buyer</span>
                    </div>
                    <div className='flex mb-5'>
                        <input
                            type="radio"
                            name="user_type"
                            value='Seller'
                            className="radio radio-success mr-2"
                            {...register("user_type")}
                        />
                        <span>As a Seller</span>
                    </div>
                    {signupError && <p className='mb-5 text-red-600'>{signupError}</p>}
                    <input type="submit" value='Register' className='btn btn-success text-white w-full mb-5' />
                </form>
                <p className='text-sm text-center'>Old to Doctors Portal? <Link to='/login' className='text-info underline'>Login here</Link></p>
                <div className="divider mb-8">OR</div>
                <button onClick={handleGoogleLogin} className='btn btn-outline w-full mb-5'>Continue with google</button>
            </div>
        </div>
    )
}

export default Register