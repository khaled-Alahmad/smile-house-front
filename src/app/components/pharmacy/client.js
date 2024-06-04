'use client'
import React from "react"
import Image from "next/image"
import dynamic from "next/dynamic"

const TinySlider = dynamic(() =>import('tiny-slider-react'),{ssr:false});
import 'tiny-slider/dist/tiny-slider.css';

import {patientsData} from '../../data/data'

export default function Client(){
    let settings1 = {
        container: '.client-review-slider',
        items: 1,
        controls: false,
        mouseDrag: true,
        loop: true,
        rewind: true,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 3000,
        navPosition: "bottom",
        speed: 400,
        gutter: 16,
      };
    return(
        <div className="container mt-100 mt-60">
            <div className="row justify-content-center">
                <div className="col-lg-10 text-center">
                    <div className="client-review-slider">
                        <TinySlider settings={settings1}>
                            {patientsData.map((item,index) =>{
                                return(
                                    <div className="tiny-slide text-center" key={index}>
                                        <p className="text-muted fw-normal fst-italic">{item.desc}</p>
                                        <Image src={item.image} width={65} height={65} className="img-fluid avatar avatar-small rounded-circle mx-auto shadow my-3" alt=""/>
                                        <ul className="list-unstyled mb-0">
                                            <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                            <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                            <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                            <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                            <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                        </ul>
                                        <h6 className="text-primary">{item.name} <small className="text-muted">{item.title}</small></h6>
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
