import React from "react";

import Navbar from "../components/navbar";
import Sidebar from "../components/sidebar";
import Messages from "../components/dashboard/message";
import AdminFooter from "../components/dashboard/adminFooter";
import ScrollTop from "../components/scrollTop";

export default function DoctorMessages(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                   <Sidebar colClass ="col-xl-3 col-lg-4 col-md-5 col-12"/>

                    <div className="col-xl-9 col-lg-8 col-md-7 mt-4 pt-2 mt-sm-0 pt-sm-0">
                        <h5 className="mb-0">Messages</h5>
                        <Messages/>
                    </div>
                </div>
            </div>
        </section>
        <AdminFooter/>
        <ScrollTop/>
        </>
    )
}