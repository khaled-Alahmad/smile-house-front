'use client'
import React from "react"
import Link from "next/link"

import "../../../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css"
import { Carousel } from 'react-responsive-carousel';

export default function HeroSlider(){
    return(
        <section className="home-slider position-relative">
            <Carousel autoPlay={true} infiniteLoop={true} interval={5000} showArrows={false} showStatus={false} showThumbs={false}>
                <div className="carousel-item active">
                    <div className="bg-half-260 d-table align-items-center w-100" style={{backgroundImage:`url('/images/bg/slider01.jpg')`, backgroundPosition:'center'}}>
                        <div className="bg-overlay bg-overlay-dark"></div>
                        <div className="container">
                            <div className="row justify-content-center mt-5">
                                <div className="col-lg-12 text-center">
                                    <div className="heading-title">
                                        <p className="text-white-50">Trusted Care</p>
                                        <h1 className="fw-bold text-white title-dark mb-4">Provide Genuine medicine</h1>
                                        <p className="para-desc mx-auto text-white-50 mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#" className="btn btn-primary">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item active" >
                    <div className="bg-half-260 d-table align-items-center w-100" style={{backgroundImage:`url('/images/bg/slider02.jpg')`, backgroundPosition:'center'}}>
                        <div className="bg-overlay bg-overlay-dark"></div>
                        <div className="container">
                            <div className="row justify-content-center mt-5">
                                <div className="col-lg-12 text-center">
                                    <div className="heading-title">
                                        <p className="text-light title-dark">Comprohensive Information</p>
                                        <h1 className="fw-bold text-white title-dark mb-4">Know your medicines</h1>
                                        <p className="para-desc mx-auto text-white-50 mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#" className="btn btn-primary">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="carousel-item active">
                    <div className="bg-half-260 d-table align-items-center w-100" style={{backgroundImage:`url('/images/bg/slider03.jpg')`, backgroundPosition:'center'}}>
                        <div className="bg-overlay bg-overlay-dark"></div>
                        <div className="container">
                            <div className="row justify-content-center mt-5">
                                <div className="col-lg-12 text-center">
                                    <div className="heading-title">
                                        <p className="text-light title-dark">Available Everywhare</p>
                                        <h1 className="fw-bold text-white title-dark mb-4">Delivering in 100+ Cities</h1>
                                        <p className="para-desc mx-auto text-white-50 mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#" className="btn btn-primary">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </Carousel>
        </section>
    )
}