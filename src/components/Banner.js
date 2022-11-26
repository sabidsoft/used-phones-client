import React from 'react'
import { Link } from 'react-router-dom'
import bannerImage from '../assets/images/banner.png'
const Banner = () => {
    return (
        <section
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundRepeat: 'no-repeat',
                height: '768px',
                backgroundSize: 'cover',
                // backgroundAttachment: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '10px',
                paddingRight: '10px',
                backgroundPosition: 'center'
            }}
        >
            <h1 className='text-5xl text-center text-white font-bold mb-8'>Used Phones</h1>
            <p className='text-center text-white '>Used mobile phones store. Yon can buy or sell second hand phone easily.</p>
            <p className='text-center text-white mb-10'>Buy and sell with us.</p>
            <Link to='/'>
                <button className="btn btn-success">Get Started</button>
            </Link>
        </section>
    )
}

export default Banner