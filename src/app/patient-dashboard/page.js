import React from 'react';
import Link from 'next/link'

import Navbar from '../components/navbar';
import PatientSidebar from '../components/patient/patientSidebar';
import Charts from '../components/patient/chart';
import Appointment from '../components/patient/appointment';
import Payment from '../components/patient/payment';
import Chat from '../components/patient/chat';
import AdminFooter from '../components/dashboard/adminFooter';
import ScrollTop from '../components/scrollTop';

import {FiArrowRight} from '../assets/icons/vander'

import {MonthlyReport, adminFeature} from '../data/data'

export default function PatientDashboard(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>

        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <PatientSidebar/>

                    <div className="col-xl-9 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <h5 className="mb-0">Dashboard</h5>
                        <div className="row">
                            <Charts/>

                            <Appointment/>

                            <Payment/>

                            <Chat/>

                            <div className="col-xl-4 col-lg-6 mt-4 pt-2">
                                <div className="card border-0 shadow rounded p-4">
                                    <h6 className="mb-0">Monthly Reports</h6>

                                    <div className="pt-2">
                                        {MonthlyReport.map((item, index) =>{
                                            return(
                                                <div className="progress-box mt-4" key={index}>
                                                    <h6 className="title text-muted fw-normal">{item.title}</h6>
                                                    <div className="progress">
                                                        <div className="progress-bar position-relative bg-primary" style={{width:item.progress}}>
                                                            <div className="progress-value d-block text-muted">{item.progress}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>

                            <div className="col-xl-4 mt-4 pt-2">
                                <h6 className="mb-0">Contact us</h6>
                                <div className="row">
                                    {adminFeature.slice(0,2).map((item, index) =>{
                                        let Icon = item.icon
                                        return(
                                            <div className="col-xl-12 col-md-6 mt-4" key={index}>
                                                <div className="card features feature-primary text-center border-0 p-4 rounded shadow">
                                                    <div className="icon text-center rounded-lg mx-auto">
                                                        <Icon className="align-middle h3 mb-0"/>
                                                    </div>
                                                    <div className="card-body p-0 mt-3">
                                                        <Link href="#" className="title text-dark h5 d-block">{item.title}</Link>
                                                        <Link href="#" className="link">Read more <FiArrowRight className="align-middle "/></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <AdminFooter/>

        <ScrollTop/>
        </>
    )
}