import React from 'react'
import AdvertisedItems from '../components/AdvertisedItems'
import Banner from '../components/Banner'
import Brands from '../components/Brands'
import Footer from '../components/Footer'
import WhyCooseUs from '../components/WhyCooseUs'

const Home = () => {
    return (
        <div>
            <Banner />
            <Brands/>
            <AdvertisedItems/>
            <WhyCooseUs />
            <Footer />
        </div>
    )
}

export default Home