'use client'
import React,{ useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"

import {patientsData2} from '../../data/data'

import {FaEllipsisH, FiUser, FiSettings,FiTrash} from '../../assets/icons/vander'

export default function PatientData(){

    let [show, setShow] = useState('')

    useEffect(()=>{
        let modalClose =()=>{
            setShow(false)
        }
        document.addEventListener("mousedown", modalClose);
        return ()=>{
            document.removeEventListener("mousedown", modalClose);
        }
    },[])

    let handleShow =(id)=>{
        setShow(id)
    }

    return(
        <div className="row">
            {patientsData2.map((item, index) =>{
                return(
                    <div className="col-xl-3 col-lg-6 col-12 mt-4 pt-2" key={index}>
                        <div className="card border-0 shadow rounded p-4">
                            <div className="d-flex justify-content-between">
                                <Image src={item.image} width={80} height={80} className="avatar avatar-md-md rounded-pill shadow" alt=""/>
                                
                                <div className="dropdown dropdown-primary">
                                    <button type="button" className="btn btn-icon btn-pills btn-soft-primary dropdown-toggle p-0" onClick={()=>handleShow(item.id)} ><FaEllipsisH /></button>
                                    <div className={`${show === item.id ? 'show' : ''} dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3`} style={{right:'0'}}>
                                        <Link className="dropdown-item text-dark mb-1" href="#"><span className="mb-0 d-inline-flex align-items-center me-1"><FiUser className="align-middle h6 mb-0"/></span> Profile</Link>
                                        <Link className="dropdown-item text-dark mb-1" href="#"><span className="mb-0 d-inline-flex align-items-center me-1"><FiSettings className="align-middle h6 mb-0"/></span> Profile Settings</Link>
                                        <Link className="dropdown-item text-dark" href="#"><span className="mb-0 d-inline-flex align-items-center me-1"><FiTrash className="align-middle h6 mb-0"/></span> Delete</Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body p-0 pt-3">
                                <Link href="#" className="text-dark h6">{item.name}</Link>
                                <p className="text-muted">{item.id}</p>
                                
                                <ul className="mb-0 list-unstyled mt-2">
                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Gender:</span>{item.gender}</li>
                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Age:</span>{item.Age}</li>
                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Country:</span>{item.country}</li>
                                    <li className="mt-1 ms-0"><span className="text-muted me-2">Diagnosis:</span>{item.Diagnosis}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}