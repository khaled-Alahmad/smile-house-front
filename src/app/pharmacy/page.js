import React from "react";
import Link from "next/link";
import Image from "next/image";

import Navbar from "../components/navbar";
import HeroSlider from "../components/pharmacy/heroslider";
import Franchise from "../components/pharmacy/franchise";
import Client from "../components/pharmacy/client";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";

import {pharmaCategories, partners} from '../data/data'

import { FiChevronRight, FiSmartphone } from '../assets/icons/vander'

export default function Pharmacy(){
    return(
        <>
        <Navbar manuClass="navigation-menu nav-left nav-light" containerClass="container"/>

        <HeroSlider/>

        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="section-title mb-4 pb-2">
                            <h4 className="title mb-4">Browse medicines & health products</h4>
                            <p className="text-muted para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                        </div>
                    </div>
                </div>

                <div className="row">
                    {pharmaCategories.map((item, index) =>{
                        return(
                            <div className="col-xl-3 col-lg-4 col-md-6 col-6 mt-4 pt-2" key={index}>
                                <Link href="#" className="card pharpachy-categories border-0 rounded overflow-hidden">
                                    <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                    <div className="category-title">
                                        <span className="text-dark title-white"><span className="h5">{item.title1}</span><br/>{item.title2}</span>
                                    </div>
                                </Link>
                            </div>
                        )
                    })}
                </div>

                <div className="row justify-content-center">
                    <div className="col-12 text-center mt-4 pt-2">
                        <Link href="#" className="btn btn-primary">See More</Link>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-4">Franchise Process</h4>
                            <p className="text-muted mx-auto para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                        </div>
                    </div>
                </div>
                <Franchise/>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row justify-content-center">
                    <div className="col-12">
                        <div className="section-title text-center mb-4 pb-2">
                            <h4 className="title mb-4">Our Trusted Customers</h4>
                            <p className="text-muted mx-auto para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    {partners.map((item, index) =>{
                        return(
                            <div className="col-lg-2 col-md-2 col-6 text-center mt-4 pt-2" key={index}>
                                <Image src={item} width={125} height={25} className="avatar avatar-client" alt=""/>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row">
                    <div className="col-md-6">
                        <Link href="#" className="section-title">
                            <p className="text-primary">Introducing consultation desk</p>
                            <h4 className="text-dark">Don’t self medicate. Talk to an expert. Consult a doctor in 2 minutes.</h4>

                            <div className="card mt-4 pharpachy-categories border-0 rounded-md overflow-hidden">
                                <Image src='/images/pharmacy/doctor.jpg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                <div className="category-title">
                                    <span className="text-white title-dark">Chat with a <br/><span className="h4">Doctor</span></span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-6 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <Link href="#" className="section-title">
                            <p className="text-primary">Introducing fast delivery</p>
                            <h4 className="text-dark">Tired of waiting in a queue? Too weak to go down and buy medicines?</h4>

                            <div className="card mt-4 pharpachy-categories border-0 rounded-md overflow-hidden">
                                <Image src='/images/pharmacy/delivery.jpg' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                <div className="category-title">
                                    <span className="text-white title-dark">Home delivery in <br/><span className="h4">2 Hours</span></span>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <Client/>

            <div className="container mt-100 mt-60">
                <div className="row align-items-center">
                    <div className="col-lg-5 col-md-5 col-12">
                        <Image src='/images/pharmacy/download.png' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                    </div>

                    <div className="col-lg-7 col-md-7 col-12 mt-4 mt-sm-0 pt-2 pt-sm-0">
                        <div className="section-title">
                            <div className="alert alert-light alert-pills" role="alert">
                                <span className="badge bg-primary rounded-pill me-1">Apps</span>
                                <span className="content">Download now <FiChevronRight className="fea icon-sm align-middle"/> </span>
                            </div>
                            <h4 className="title mb-3">Available for your <br/> Smartphones</h4>
                            <p className="text-muted para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                            
                            <div className="mt-3 mb-4">
                                <Link href="#" className="btn btn-lg btn-dark mt-2 me-2"><i className="mdi mdi-apple"></i> App Store</Link>
                                <Link href="#" className="btn btn-lg btn-dark mt-2"><i className="mdi mdi-google-play"></i> Play Store</Link>
                            </div>

                            <div className="d-inline-block">
                                <div className="pt-4 d-flex align-items-center border-top">
                                    <FiSmartphone className="fea icon-md me-2 text-primary"/>
                                    <div className="content">
                                        <h6 className="mb-0">Install app now on your cellphones</h6>
                                        <Link href="#" className="text-primary">Learn More <i className="mdi mdi-arrow-right"></i></Link> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}