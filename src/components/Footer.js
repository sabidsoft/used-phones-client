import React from 'react'
import logo from '../assets/images/brand_logo.png'

const Footer = () => {
    return (
        <footer>
            <div className="footer p-20 bg-base-200 text-base-content">
                <div>
                    <img src={logo} alt="Brand Logo" className='w-20' />
                    <p>Used Phones.<br />Providing reliable tech since 2020</p>
                </div>
                <div>
                    <span className="footer-title">Services</span>
                    <a className="link link-hover" href='/'>Branding</a>
                    <a className="link link-hover" href='/'>Design</a>
                    <a className="link link-hover" href='/'>Marketing</a>
                    <a className="link link-hover" href='/'>Advertisement</a>
                </div>
                <div>
                    <span className="footer-title" href='/'>Company</span>
                    <a className="link link-hover" href='/'>About us</a>
                    <a className="link link-hover" href='/'>Contact</a>
                    <a className="link link-hover" href='/'>Jobs</a>
                    <a className="link link-hover" href='/'>Press kit</a>
                </div>
                <div>
                    <span className="footer-title" href='/'>Legal</span>
                    <a className="link link-hover" href='/'>Terms of use</a>
                    <a className="link link-hover" href='/'>Privacy policy</a>
                    <a className="link link-hover" href='/'>Cookie policy</a>
                </div>
            </div>
            <div className='text-center py-8'>
                <p>Copyright &copy; 2022 - All right reserved by Used Phones</p>
            </div>
        </footer>
    )
}

export default Footer