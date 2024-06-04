'use client'
import React,{useState, useEffect} from "react"
import Link from "next/link"
import Image from "next/image"

import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

import {FaEllipsisH, FiUser, FiSettings, FiTrash, FiClock, BiSend, FaRegSmile, FiPaperclip} from '../../assets/icons/vander'

export default function Chat(){
    let [chatSetting, setChatSetting] = useState(false);

    useEffect(()=>{
        let closeModal3 = ()=>{
            setChatSetting(false)
        }
        document.addEventListener("mousedown", closeModal3);
        return ()=>{
            document.removeEventListener("mousedown", closeModal3);
        }
    },[])
    return(
        <div className="col-xl-4 col-lg-6 mt-4 pt-2">
            <div className="card chat chat-person border-0 shadow rounded">
                <div className="d-flex justify-content-between border-bottom p-4">
                    <div className="d-flex">
                        <Image src='/images/doctors/02.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                        <div className="flex-1 overflow-hidden ms-3">
                            <Link href="#" className="text-dark mb-0 h6 d-block text-truncate">Cristino Murphy</Link>
                            <small className="text-muted"><i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i> Online</small>
                        </div>
                    </div>

                    <ul className="list-unstyled mb-0">
                        <li className="dropdown dropdown-primary list-inline-item">
                            <button type="button" className="btn btn-icon btn-pills btn-soft-primary dropdown-toggle p-0" onClick={()=>setChatSetting(true)}><FaEllipsisH/></button>
                            <div className={`${chatSetting === true ? 'show' : ''} dropdown-menu dd-menu dropdown-menu-end shadow border-0 mt-3 py-3`} style={{right:'0'}}>
                                <Link className="dropdown-item text-dark" href="#"><span className="mb-0 d-inline-block me-1"><FiUser className="align-middle h6 mb-0"/></span> Profile</Link>
                                <Link className="dropdown-item text-dark my-2" href="#"><span className="mb-0 d-inline-block me-1"><FiSettings className="align-middle h6 mb-0"/></span> Profile Settings</Link>
                                <Link className="dropdown-item text-dark" href="#"><span className="mb-0 d-inline-block me-1"><FiTrash className="align-middle h6 mb-0"/></span> Delete</Link>
                            </div>
                        </li>
                    </ul>
                </div>
                <SimpleBar style={{maxHeight:'300px', backgroundImage:`url('/images/bg/bg-chat.png')`, backgroundPosition:'center'}}>
                    <ul className="p-4 list-unstyled mb-0 chat">
                        <li>
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative">
                                        <Image src='/images/doctors/02.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Hey Christopher</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>59 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="chat-right">
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative chat-user-image">
                                        <Image src='/images/client/09.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Hello Cristino</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>45 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="chat-right">
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative chat-user-image">
                                        <Image src='/images/client/09.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">How can i help you?</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>44 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative">
                                        <Image src='/images/doctors/02.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Nice to meet you</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>42 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative">
                                        <Image src='/images/doctors/02.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Hope you are doing fine?</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>40 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="chat-right">
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative chat-user-image">
                                        <Image src='/images/client/09.jpg' width={0} height={0} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Im good thanks for asking</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>45 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative">
                                        <Image src='/images/doctors/02.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">I am intrested to know more about your prices and services you offer</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>35 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="chat-right">
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative chat-user-image">
                                        <Image src='/images/client/09.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Sure please check below link to find more useful information <Link href="https://1.envato.market/doctris-template" target="_blank" className="text-primary">https://shreethemes.in/Doctris/</Link></p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>25 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li>
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative">
                                        <Image src='/images/doctors/02.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Thank you 😊</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>20 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>

                        <li className="chat-right">
                            <div className="d-inline-block">
                                <div className="d-flex chat-type mb-3">
                                    <div className="position-relative chat-user-image">
                                        <Image src='/images/client/09.jpg' width={45} height={45} className="avatar avatar-md-sm rounded-circle border shadow" alt=""/>
                                        <i className="mdi mdi-checkbox-blank-circle text-success on-off align-text-bottom"></i>
                                    </div>
                                        
                                    <div className="flex-1 chat-msg" style={{maxWidth:'500px'}}>
                                        <p className="text-muted small shadow px-3 py-2 bg-light rounded mb-1">Welcome</p>
                                        <small className="text-muted msg-time"><FiClock className="me-1"/>18 min ago</small>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </SimpleBar>
                <div className="p-2 rounded-bottom shadow">
                    <div className="row">
                        <div className="col">
                            <input type="text" className="form-control border" placeholder="Enter Message..."/>
                        </div>
                        <div className="col-auto">
                            <Link href="#" className="btn btn-icon btn-primary"><BiSend /></Link>
                            <Link href="#" className="btn btn-icon btn-primary mx-1"><FaRegSmile /></Link>
                            <Link href="#" className="btn btn-icon btn-primary"><FiPaperclip /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}