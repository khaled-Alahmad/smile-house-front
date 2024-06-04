'use client'
import React,{useState} from "react"
import Link from "next/link"

import Carousel from 'react-bootstrap/Carousel';

export default function ShopSlider(){
    let [index, setIndex] = useState(0);

    let handleSelect = (selectedIndex) => {
        setIndex(selectedIndex);
    };
    return(
        <section className="home-slider position-relative">
        <Carousel activeIndex={index} onSelect={handleSelect} indicators={false} interval={2000} >
            <Carousel.Item>
                <div className="carousel-item active">
                    <div className="bg-half-170 d-table align-items-center w-100" style={{backgroundImage:`url('/images/bg/pharm01.jpg')`, backgroundPosition:'center'}}>
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-lg-12">
                                    <div className="heading-title">
                                        <h1 className="fw-bold mb-4">Doctors Prescribe <br/> Meko Products</h1>
                                        <p className="para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#" className="btn btn-primary">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-item active">
                    <div className="bg-half-170 d-table align-items-center w-100" style={{backgroundImage:`url('/images/bg/pharm02.jpg')`, backgroundPosition:'center'}}>
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-lg-12">
                                    <div className="heading-title">
                                        <h1 className="fw-bold mb-4">Virus Protection <br/> Gears @15% Off</h1>
                                        <p className="para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#" className="btn btn-primary">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div className="carousel-item active">
                    <div className="bg-half-170 d-table align-items-center w-100" style={{backgroundImage:`url('/images/bg/pharm03.jpg')`, backgroundPosition:'center'}}>
                        <div className="container">
                            <div className="row mt-5">
                                <div className="col-lg-12">
                                    <div className="heading-title">
                                        <h1 className="fw-bold mb-4">Cosmetics Body <br/> Lotion</h1>
                                        <p className="para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                        
                                        <div className="mt-4 pt-2">
                                            <Link href="#" className="btn btn-primary">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>
                </div>
            </Carousel.Item>
        </Carousel>
    </section>
    )
}