import React from "react";
import Link from "next/link";
import Navbar from "../components/navbar";
import ShopSlider from "../components/pharmacy/shopSlider";
import Counter from "../components/pharmacy/counter";

import { FiHeart, FiEye, FiShoppingCart } from '../assets/icons/vander'

import { productData } from '../data/data'
import Image from "next/image";
import Footer from "../components/footer";
import ScrollTop from "../components/scrollTop";
import Categories from "../components/pharmacy/categories";

export default function PharmacyShop(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container"/>

        <ShopSlider/>

        <section className="section">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-0">Most Viewed Products</h5>
                    </div>
                </div>

                <div className="row">
                    {productData.slice(0,8).map((item, index) =>{
                        return(
                            <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2" key={index}>
                                <div className="card shop-list border-0">
                                    <ul className="label list-unstyled mb-0">
                                        <li><Link href="" className="badge rounded-pill badge-success">Featured</Link></li>
                                    </ul>
                                    <div className="shop-image position-relative overflow-hidden rounded shadow">
                                        <Link href={`/pharmacy-product-detail/${item.id}`}><Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/></Link>
                                        <ul className="list-unstyled shop-icons">
                                            <li><Link href="#" className="btn btn-icon btn-pills btn-soft-danger"><FiHeart className="icons"/></Link></li>
                                            <li className="mt-2"><Link href={`/pharmacy-product-detail/${item.id}`} className="btn btn-icon btn-pills btn-soft-primary"><FiEye className="icons"/></Link></li>
                                            <li className="mt-2"><Link href="/pharmacy-shop-cart" className="btn btn-icon btn-pills btn-soft-warning"><FiShoppingCart className="icons"/></Link></li>
                                        </ul>                                

                                       <Counter/>
                                    </div>
                                    <div className="card-body content pt-4 p-2">
                                        <Link href={`/pharmacy-product-detail/${item.id}`} className="text-dark product-name h6">{item.name}</Link>
                                        <div className="d-flex justify-content-between mt-1">
                                            <h6 className="text-muted small font-italic mb-0 mt-1">{item.price}</h6>
                                            <ul className="list-unstyled text-warning mb-0">
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-0">Categories</h5>
                    </div>
                </div>
                <Categories/>
            </div>

            <div className="container mt-100 mt-60">
                <div className="py-5 px-4 rounded shadow" style={{backgroundImage:`url('/images/pharmacy/cta.jpg')`}}>
                    <div className="row my-lg-5">
                        <div className="col-lg-12">
                            <div className="section-title">
                                <h1 className="title mb-4">Clinical Equipments <br/> Stellar Price</h1>
                                <p className="para-desc mb-0">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                
                                <div className="mt-4 pt-2">
                                    <Link href="#" className="btn btn-primary">Shop now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-0">Popular Products</h5>
                    </div>
                </div>

                <div className="row">
                    {productData.slice(8,12).map((item, index) =>{
                        return(
                            <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2" key={index}>
                                <div className="card shop-list border-0">
                                    <ul className="label list-unstyled mb-0">
                                        <li><Link href="" className="badge rounded-pill badge-success">Featured</Link></li>
                                    </ul>
                                    <div className="shop-image position-relative overflow-hidden rounded shadow">
                                        <Link href={`/pharmacy-product-detail/${item.id}`}><Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/></Link>
                                        <ul className="list-unstyled shop-icons">
                                            <li><Link href="#" className="btn btn-icon btn-pills btn-soft-danger"><FiHeart className="icons"/></Link></li>
                                            <li className="mt-2"><Link href={`/pharmacy-product-detail/${item.id}`} className="btn btn-icon btn-pills btn-soft-primary"><FiEye className="icons"/></Link></li>
                                            <li className="mt-2"><Link href="/pharmacy-shop-cart" className="btn btn-icon btn-pills btn-soft-warning"><FiShoppingCart className="icons"/></Link></li>
                                        </ul>                               

                                       <Counter/>
                                    </div>
                                    <div className="card-body content pt-4 p-2">
                                        <Link href={`/pharmacy-product-detail/${item.id}`} className="text-dark product-name h6">{item.name}</Link>
                                        <div className="d-flex justify-content-between mt-1">
                                            <h6 className="text-muted small font-italic mb-0 mt-1">{item.price}</h6>
                                            <ul className="list-unstyled text-warning mb-0">
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>

            <div className="container mt-100 mt-60">
                <div className="row">
                    <div className="col-12">
                        <h5 className="mb-0">Recent Products</h5>
                    </div>
                </div>

                <div className="row">
                    {productData.slice(12,16).map((item, index) =>{
                        return(
                            <div className="col-lg-3 col-md-6 col-12 mt-4 pt-2" key={index}>
                                <div className="card shop-list border-0">
                                    <div className="shop-image position-relative overflow-hidden rounded shadow">
                                        <Link href="/pharmacy-product-detail"><Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/></Link>
                                        <ul className="list-unstyled shop-icons">
                                            <li><Link href="#" className="btn btn-icon btn-pills btn-soft-danger"><FiHeart className="icons"/></Link></li>
                                            <li className="mt-2"><Link href={`/pharmacy-product-detail/${item.id}`} className="btn btn-icon btn-pills btn-soft-primary"><FiEye className="icons"/></Link></li>
                                            <li className="mt-2"><Link href="/pharmacy-shop-cart" className="btn btn-icon btn-pills btn-soft-warning"><FiShoppingCart className="icons"/></Link></li>
                                        </ul>                               

                                        <Counter/>
                                    </div>
                                    <div className="card-body content pt-4 p-2">
                                        <Link href="/pharmacy-product-detail" className="text-dark product-name h6">{item.name}</Link>
                                        <div className="d-flex justify-content-between mt-1">
                                            <h6 className="text-muted small font-italic mb-0 mt-1">{item.price}</h6>
                                            <ul className="list-unstyled text-warning mb-0">
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                                <li className="list-inline-item"><i className="mdi mdi-star"></i></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })} 
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}