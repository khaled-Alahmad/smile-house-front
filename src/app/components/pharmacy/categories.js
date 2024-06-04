'use client'
import React from "react"
import Link from "next/link"
import Image from "next/image"
import dynamic from "next/dynamic"

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';

import { pharmaCategories } from '../../data/data'

export default function Categories(){
    let settings = {
        container: '.slider-range-four',
        items: 4,
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
                items: 4
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
                <div className="slider-range-four">
                    <TinySlider settings={settings}>
                        {pharmaCategories.map((item,index) =>{
                            return(
                                <div className="tiny-slide" key={index}>
                                    <Link href="#" className="card pharpachy-categories border-0 rounded overflow-hidden">
                                        <Image src={item.image} width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                                        <div className="category-title">
                                            <span className="text-dark title-white"><span className="h5">{item.title1}</span><br/>{item.title2}</span>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })}
                    </TinySlider>
                </div>
            </div>
        </div>
    )
}