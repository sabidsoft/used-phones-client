import React, { useContext, useState } from 'react'
import { useForm } from "react-hook-form"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthProvider'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'

const Login = () => {
    const [loginError, setLoginError] = useState('')
    const { login, googleLogin } = useContext(AuthContext)
    const { register, handleSubmit, formState: { errors } } = useForm()
    const navigate = useNavigate()
    const location = useLocation()

    // email/password login
    const handleOnSubmit = data => {
        login(data.email, data.password)
            .then(result => {
                getUserToken(data.email)
                setLoginError('')
                navigate(location.state?.from?.pathname || '/', { replace: true })
            })
            .catch(err => {
                console.log(err.code, err.message)
                if (err.code === 'auth/user-not-found') {
                    setLoginError("Email or password didn't match!")
                }
                if (err.code === 'auth/wrong-password') {
                    setLoginError("Email or password didn't match!")
                }
                if (err.code === 'auth/too-many-requests') {
                    setLoginError("Too many requests!")
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
                navigate(location.state?.from?.pathname || '/', { replace: true })
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
                <h1 className='text-xl text-center mb-9'>Login</h1>
                <form onSubmit={handleSubmit(handleOnSubmit)}>
                    <div className="form-control w-full mb-5">
                        <label htmlFor='email' className="font-semibold mb-1">Email</label>
                        <input
                            type="email"
                            id='email'
                            className="input input-bordered w-full"
                            {...register("email", {
                                required: 'Email is required!'
                            })}
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
                            })}
                        />
                        {errors.password && <span className='text-red-600'>{errors.password?.message}</span>}
                    </div>
                    {loginError && <p className='mb-5 text-red-600'>{loginError}</p>}
                    <input type="submit" value='Login' className='btn btn-success text-white w-full mb-5' />
                </form>
                <p className='text-sm text-center'>New to Doctors Portal? <Link to='/register' className='text-info underline'>Create new account</Link></p>
                <div className="divider mb-8">OR</div>
                <button onClick={handleGoogleLogin} className='btn btn-outline w-full mb-5'>Continue with google</button>
            </div>
        </div>
    )
}

export default Login