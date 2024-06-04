'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link"

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import {FaEllipsisH, MdOutlineLibraryAdd, FiTrash} from '../../assets/icons/vander'

import {appointment} from '../../data/data'

export default function Appointment(){
    let [open, setOpen] = useState(false)

    useEffect(()=>{
        let closeModal = ()=>{
            setOpen(false)
        }
       
        document.addEventListener("mousedown", closeModal);
        return ()=>{
            document.removeEventListener("mousedown", closeModal);
        }
    },[])
    
    return(
        <div className="col-xl-3 col-lg-6 col-12 mt-4 pt-2">
            <div className="card border-0 rounded shadow">
                <div className="d-flex justify-content-between align-items-center px-4 pt-4">
                    <h6 className="mb-0">Doctors Appointment</h6>
                    
                    <div className="dropdown dropdown-primary">
                        <button type="button" className="btn btn-icon btn-pills btn-soft-primary dropdown-toggle p-0" onClick={() =>setOpen(!open)}><FaEllipsisH/></button>
                        <div className={`${open === true ? 'show' : ''} dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3`} style={{right:'0'}}>
                            <Link className="dropdown-item text-dark" href="#"><span className="mb-0 d-inline-block me-1"><MdOutlineLibraryAdd className="align-middle h6 mb-0"/></span> Add New</Link>
                            <Link className="dropdown-item text-dark" href="#"><span className="mb-0 d-inline-block me-1"><FiTrash className="align-middle h6 mb-0"/></span> Delete</Link>
                        </div>
                    </div>
                </div>

                <div className="mt-4 px-4">
                    <form>
                        <div className="mb-0">
                            <input name="date" type="text" className="form-control start" placeholder="Select date :"/>
                        </div>
                    </form>
                </div>
                
                <SimpleBar className="p-4 pt-0" style={{maxHeight:'340px'}}>
                    {appointment.map((item, index) =>{
                        let Icon = item.icon
                        return(
                            <div className="d-flex justify-content-between align-items-center rounded py-1 px-3 shadow mt-3" key={index}>
                                <Icon className={item.class}/>
                                <div className="flex-1 overflow-hidden ms-2">
                                    <h6 className="mb-0">{item.title}</h6>
                                    <p className="text-muted mb-0 text-truncate small">{item.name}</p>
                                </div>
                                <span className="mb-0">{item.date}</span>
                            </div>
                        )
                    })}
                </SimpleBar>
            </div>
        </div>
    )
}