import React from 'react'
import bg from '../assets/images/b.png'
import { Link } from 'react-router-dom'

const WhyCooseUs = () => {
    return (
        <section
            style={{
                backgroundImage: `url(${bg})`,
                backgroundRepeat: 'no-repeat',
                height: '768px',
                backgroundSize: 'cover',
                backgroundAttachment: 'fixed',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: '10px',
                paddingRight: '10px',
            }}
        >
            <p className='text-white text-xl text-center mb-3'>Why Choose Us</p>
            <h1 className='text-white text-5xl text-center mb-8'>When you need us, we are here.</h1>
            <p className='text-white text-base text-center mb-10'>We provide our best. We provide hassle free service. <br /> We are trying to improve our service more.</p>
            <Link to='/'>
                <button className='btn btn-success'>Get a Quote</button>
            </Link>
        </section>
    )
}

export default WhyCooseUs