import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Link } from 'react-router-dom'
import Loading from '../components/Loading'
import DOMAIN_NAME from '../utilities/DOMAIN_NAME'

const Brands = () => {
    const { data: brands = [], isLoading } = useQuery({
        queryKey: ['brands'],
        queryFn: async () => {
            try {
                const res = await fetch(`${DOMAIN_NAME}/brands`)
                const data = res.json()
                return data
            }
            catch (error) {
                console.log(error)
            }
        }
    })

    if(isLoading){
        return <Loading/>
    }

    return (
        <section className='max-w-[1440px] mx-auto my-28 px-5 lg:px-0'>
            <h1 className='text-center text-5xl mb-20'>Second Hand Phone Brands</h1>
            <div className='grid gap-8 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
                {
                    brands.map(brand => {
                        return (
                            <div key={brand._id} className="card bg-base-100 shadow-xl">
                                <figure><img src={brand.image} alt="Brand Pic" className='h-80 w-full' /></figure>
                                <div className="card-body">
                                    <h2 className="card-title">{brand.brand}</h2>
                                    <p>Please click the select button to buy second hand {brand.brand} mobile phone</p>
                                    <div className="card-actions justify-end">
                                        <Link to={`/brands/${brand._id}`}>
                                            <button className="btn btn-success text-white">Select Used {brand.brand}</button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default Brands