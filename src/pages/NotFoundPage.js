import React from 'react'
import { Link } from 'react-router-dom'
import _404_page from '../assets/images/404_image.webp'

const NotFoundPage = () => {
    return (
        <div className='h-screen flex justify-center items-center flex-col'>
            <img src={_404_page} alt="Not Found Pic" className='w-96 mb-8' />
            <h1 className='text-5xl font-bold mb-8'>Page Not Found</h1>
            <p className='text-center mb-8'>
                The link may be broken, or the page may have been removed.<br />Check to see if the link you're trying to open is correct.
            </p>
            <Link to='/'>
                <button className="btn btn-success">Back Home</button>
            </Link>
        </div>
    )
}

export default NotFoundPage