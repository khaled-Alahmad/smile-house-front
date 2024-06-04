import React from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../../components/navbar";
import CounterTwo from "../../components/pharmacy/counterTwo";
import RelatedProduct from "../../components/pharmacy/relatedProduct";
import Footer from "../../components/footer";
import ScrollTop from "../../components/scrollTop";
import { productData } from "@/app/data/data";

export default function PharmacyProductDetail(props){

    let id = props.params.id
    let data = productData.find((product) =>product.id === parseInt(id))

    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container"/>
        <section className="bg-half-170 d-table w-100 bg-light">
            <div className="container">
                <div className="row mt-5 justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center">
                            <h3 className="sub-title mb-4">{data?.name}</h3>
                            <p className="para-desc mx-auto text-muted">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                        
                            <nav aria-label="breadcrumb" className="d-inline-block mt-3">
                                <ul className="breadcrumb bg-light rounded mb-0 bg-transparent">
                                    <li className="breadcrumb-item"><Link href="/">Doctris</Link></li>
                                    <li className="breadcrumb-item"><Link href="/pharmacy">Pharmacy</Link></li>
                                    <li className="breadcrumb-item active" aria-current="page">Product Detail</li>
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
                <div className="row align-items-center">
                    <div className="col-md-5">
                       <Image src={data?.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid rounded" alt=""/>
                    </div>

                    <div className="col-md-7 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="section-title ms-md-4">
                            <h4 className="title">{data?.name}</h4>
                            <h5 className="text-muted">$21.00</h5>
                            <ul className="list-unstyled text-warning h5 mb-0">
                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                <li className="list-inline-item me-2 h6 text-muted">(20 Ratting)</li>
                            </ul>
                            
                            <h5 className="mt-4 py-2">Overview :</h5>
                            <p className="text-muted">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero exercitationem, unde molestiae sint quae inventore atque minima natus fugiat nihil quisquam voluptates ea omnis. Modi laborum soluta tempore unde accusantium.</p>
                        
                            <div className="d-flex shop-list align-items-center">
                                <h6 className="mb-0">Quantity:</h6>
                                <CounterTwo/>
                            </div>

                            <div className="mt-4 pt-2">
                                <Link href="#" className="btn btn-primary">Shop Now</Link>
                                <Link href="/pharmacy-shop-cart" className="btn btn-soft-primary ms-2">Add to Cart</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-0">Related Products:</h5>
                    </div>
                </div>

                <RelatedProduct/>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}