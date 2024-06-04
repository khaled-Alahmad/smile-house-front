import React from "react";
import Image from "next/image";

import Navbar from "../components/navbar";
import ProfileTab from "../components/dashboard/profileTab";
import AdminFooter from "../components/dashboard/adminFooter";
import ScrollTop from "../components/scrollTop";

export default function DoctorProfile(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container"/>
        <section className="bg-dashboard my-lg-5">
            <div className="container mt-xl-5">
                <div className="row">
                    <div className="col-12">
                        <div className="card border-0 rounded shadow">
                            <div className="row">
                                <div className="col-xl-4 col-lg-4 col-md-5 position-relative">
                                    <Image src='/images/doctors/dr-profile.png' width={0} height={0} sizes="100vw" style={{width:'100%', height:'auto'}} className="img-fluid dr-profile-img" alt=""/>
                                </div>

                                <div className="col-xl-8 col-lg-8 col-md-7">
                                    <div className="p-lg-5 p-4">
                                        <small className="text-muted">19th June, 2023 - 5:00PM</small>

                                        <h4 className="my-3">Good Morning ! <br/> <span className="text-primary h2">Dr. Christopher Burrell</span></h4>
                                        <p className="para-desc text-muted">Great doctor if you need your family member to get effective immediate assistance, emergency treatment or a simple consultation.</p>
                                    
                                        <h6 className="mb-0">You have <span className="text-primary">18 patients</span> remaining today!</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProfileTab/>
            </div>
        </section>
        <AdminFooter/>
        <ScrollTop/>
        </>
    )
}