import React from 'react'
import Image from 'next/image'

import Navbar from '../components/navbar'
import ProfileTab from '../components/patient/profileTab'
import Footer from '../components/footer'
import ScrollTop from '../components/scrollTop'

import {patientProfile} from '../data/data'

export default function PatientProfile(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container"/>

        <section className="bg-hero">
            <div className="container">
                <div className="row mt-lg-5">
                    <div className="col-md-6 col-lg-4">
                        <div className="rounded shadow overflow-hidden sticky-bar">
                            <div className="card border-0">
                                <Image src='/images/bg/bg-profile.jpg' width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
                            </div>

                            <div className="text-center avatar-profile margin-nagative mt-n5 position-relative pb-4 border-bottom">
                                <Image src='/images/client/09.jpg' width={80} height={80} className="rounded-circle shadow-md avatar avatar-md-md" alt=""/>
                                <h5 className="mt-3 mb-1">Christopher Burrell</h5>
                                <p className="text-muted mb-0">25 Years old</p>
                            </div>

                            <div className="list-unstyled p-4">
                                <div className="progress-box mb-4">
                                    <h6 className="title">Complete your profile</h6>
                                    <div className="progress">
                                        <div className="progress-bar position-relative bg-primary" style={{width:'89%'}}>
                                            <div className="progress-value d-block text-muted h6">89%</div>
                                        </div>
                                    </div>
                                </div>
                                {patientProfile.map((item,index) =>{
                                    let Icon = item.icon
                                    return(
                                    <div className="d-flex align-items-center mt-3" key={index}>
                                        <Icon className="align-text-bottom text-primary h5 mb-0 me-2"/>
                                        <h6 className="mb-0">{item.title}</h6>
                                        <p className="text-muted mb-0 ms-2">{item.name}</p>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <ProfileTab/>
                </div>
            </div>
        </section>
        <Footer/>
        <ScrollTop/>
        </>
    )
}