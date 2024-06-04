'use client'
import React from "react"
import dynamic from "next/dynamic"

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';

import { franchiseProcess } from '../../data/data'


export default function Franchise(){
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
            <div className="col-12 mt-4 pt-2">
                <div className="col-md-12">
                    <div className="slider-range-four tiny-timeline">
                        <TinySlider settings={settings}>
                            {franchiseProcess.map((item, index) =>{
                                let Icon = item.icon
                                return(
                                    <div className="tiny-slide text-center" key={index}>
                                        <div className="card border-0 p-4 item-box mb-1 shadow rounded">
                                            <div><Icon className="h4 text-primary"/></div>
                                            <h6 className="mt-1 mb-0">{item.title}</h6>
                                        </div>
                                    </div>
                                )
                            })}
                        </TinySlider>    
                    </div>
                </div>
            </div>
        </div>
    )
}