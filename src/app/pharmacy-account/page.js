import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import Navbar from '../components/navbar'
import AccountingTab from '../components/pharmacy/accountingTab'
import Footer from '../components/footer'
import ScrollTop from '../components/scrollTop'


export default function PharmacyAccount(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container"/>
        <section className="bg-half-170 d-table w-100 bg-light">
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h3 className="sub-title mb-4">My Account</h3>
                            <p className="para-desc mx-auto text-muted">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                        
                            <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                                <ul className="breadcrumb bg-light rounded mb-0 bg-transparent">
                                    <li className="breadcrumb-item"><Link href="/">Doctris</Link></li>
                                    <li className="breadcrumb-item"><Link href="/pharmacy">Pharmacy</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Account</li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div className="position-relative">
            <div className="shape overflow-hidden text-color-white">
                <svg viewBox="0 0 2880 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 48H1437.5H2880V0H2160C1442.5 52 720 0 720 0H0V48Z" fill="currentColor"></path>
                </svg>
            </div>
        </div>
        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="d-flex align-items-center">
                            <Image src='/images/client/09.jpg' width={80} height={80} className="avatar avatar-md-md rounded-circle" alt=""/>
                            <div className="ms-3">
                                <h6 className="text-muted mb-0">Hello,</h6>
                                <h5 className="mb-0">Mrs. Christopher</h5>
                            </div>
                        </div>
                    </div>
                </div>

                <AccountingTab/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}