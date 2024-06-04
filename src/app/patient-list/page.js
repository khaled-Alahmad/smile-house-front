import React from "react";
import Link from "next/link";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import PatientData from "../components/dashboard/patientData";
import AdminFooter from "../components/dashboard/adminFooter";
import ScrollTop from "../components/scrollTop";

export default function PatientList(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar colClass="col-xl-3 col-lg-4 col-md-5 col-12"/>

                    <div className="col-xl-9 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <h5 className="mb-0">Patients List</h5>
                        <PatientData/>

                        <div className="row text-center">
                            <div className="col-12 mt-4 pt-2">
                                <ul className="pagination justify-content-center mb-0 list-unstyled">
                                    <li className="page-item"><Link className="page-link" href="#" aria-label="Previous">Prev</Link></li>
                                    <li className="page-item active"><Link className="page-link" href="#">1</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">2</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                                    <li className="page-item"><Link className="page-link" href="#" aria-label="Next">Next</Link></li>
                                </ul>
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