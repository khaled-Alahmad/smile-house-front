'use client'
import React from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';

import { blogData } from "../data/data"

import { FiCalendar, FiClock } from '../assets/icons/vander'

export default function BlogSlider(){

    let settings = {
        container: '.slider-range-three',
        items: 3,
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 24,
        responsive: {
            992: {
                items: 3
            },

            767: {
                items: 2
            },

            320: {
                items: 1
            },
        },
      };
      
    return(
        <div className="row">
            <div className="col-lg-12 mt-4 pt-2">
                <div className="slider-range-three">
                    <TinySlider settings={settings}>
                        {blogData.slice(0,5).map((item,index) =>{
                            return(
                                <div className="tiny-slide" key={index}>
                                    <div className="card blog blog-primary border-0 shadow rounded overflow-hidden m-1" key={index}>
                                        <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                        <div className="card-body p-4">
                                        <ul className="list-unstyled mb-2">
                                            <li className="list-inline-item text-muted small me-3 d-inline-flex align-items-center"><FiCalendar className="mb-0 text-dark h6 me-1"/>{item.date}</li>
                                            <li className="list-inline-item text-muted small d-inline-flex align-items-center"><FiClock className="mb-0 text-dark h6 me-1"/>{item.time}</li>
                                        </ul>
                                            <Link href={`/blog-detail/${item.id}`} className="text-dark title h5">{item.title}</Link>
                                            <div className="post-meta d-flex justify-content-between mt-3">
                                                <ul className="list-unstyled mb-0">
                                                    <li className="list-inline-item me-2 mb-0"><Link href="#" className="text-muted like"><i className="mdi mdi-heart-outline me-1"></i>33</Link></li>
                                                    <li className="list-inline-item"><Link href="#" className="text-muted comments"><i className="mdi mdi-comment-outline me-1"></i>08</Link></li>
                                                </ul>
                                                <Link href={`/blog-detail/${item.id}`} className="link">Read More <i className="mdi mdi-chevron-right align-middle"></i></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </TinySlider>
                </div>
            </div>
        </div> 
    )
}
