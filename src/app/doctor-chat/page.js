import React from "react";
import Navbar from "../components/navbar";
import AdminFooter from "../components/dashboard/adminFooter";
import ScrollTop from "../components/scrollTop";
import Sidebar from "../components/sidebar";
import DrChat from "../components/drChat";

export default function DoctorChat(){
    return(
        <>
        <Navbar navDark={true} manuClass="navigation-menu nav-left" containerClass="container-fluid"/>
        <section className="bg-dashboard">
            <div className="container-fluid">
                <div className="row">
                    <Sidebar colClass="col-xl-3 col-lg-4 col-md-5 col-12 d-none d-lg-block"/>

                    <DrChat/>
                </div>
            </div>
        </section>
        <AdminFooter/>
        <ScrollTop/>
        </>
    )
}