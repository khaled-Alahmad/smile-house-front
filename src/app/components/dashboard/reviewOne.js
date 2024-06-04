'use client'
import React from "react";
import dynamic from "next/dynamic";

const TinySlider = dynamic(()=>import('tiny-slider-react'),{ssr:false})
import 'tiny-slider/dist/tiny-slider.css';

import { patientsData } from "../../data/data";
import Image from "next/image";

const settings = {
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

  export default function ReviewOne(){
    return(
        <div className="client-review-slider">
            <TinySlider settings={settings}>
                {patientsData.map((item,index) =>{
                    return(
                        <div className="tiny-slide" key={index}>
                            <p className="text-muted fst-italic">{item.desc2}</p>
                            
                            <div className="d-inline-flex align-items-center">
                                <Image src={item.image} width={65} height={65} className="img-fluid avatar avatar-small rounded-circle mx-auto shadow my-3" alt=""/>
                                <div className="ms-3">
                                    <ul className="list-unstyled d-block mb-0">
                                        <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                        <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                        <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                        <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                        <li className="list-inline-item"><i className="mdi mdi-star text-warning"></i></li>
                                    </ul>
                                    <h6 className="text-primary">{item.name}<small className="text-muted">{item.title}</small></h6>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </TinySlider>
        </div>
    )
  }