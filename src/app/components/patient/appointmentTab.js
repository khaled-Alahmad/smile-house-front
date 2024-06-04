"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function AppointmentTab() {
  let [activeIndex, setActiveIndex] = useState(2);
  return (
    <section className="section">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow rounded overflow-hidden">
              <ul className="nav nav-pills nav-justified flex-column flex-sm-row rounded-0 shadow overflow-hidden bg-light mb-0">
                {/* <li className="nav-item">
                                    <Link scroll={false} className={`${activeIndex === 1 ? 'active' : ''} nav-link rounded-0`} onClick={()=>setActiveIndex(1)}  href="#">
                                        <div className="text-center pt-1 pb-1">
                                            <h5 className="fw-medium mb-0">Clinic Appointment</h5>
                                        </div>
                                    </Link>
                                </li> */}

                <li className="nav-item">
                  <Link
                    scroll={false}
                    className={`${
                      activeIndex === 2 ? "active" : ""
                    } nav-link rounded-0`}
                    onClick={() => setActiveIndex(2)}
                    href="#"
                  >
                    <div className="text-center pt-1 pb-1">
                      <h5 className="fw-medium mb-0">الحجز عبر الإنترنت</h5>
                    </div>
                  </Link>
                </li>
              </ul>

              <div className="tab-content p-4">
                {/* {activeIndex === 1 ? 
                                    <div className="tab-pane fade show active">
                                        <form>
                                            <div className="row">
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Patient Name <span className="text-danger">*</span></label>
                                                        <input name="name" id="name" type="text" className="form-control" placeholder="Patient Name :"/>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Departments</label>
                                                        <select className="form-select form-control">
                                                            <option value="EY">Eye Care</option>
                                                            <option value="GY">Gynecologist</option>
                                                            <option value="PS">Psychotherapist</option>
                                                            <option value="OR">Orthopedic</option>
                                                            <option value="DE">Dentist</option>
                                                            <option value="GA">Gastrologist</option>
                                                            <option value="UR">Urologist</option>
                                                            <option value="NE">Neurologist</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Doctor</label>
                                                        <select className="form-select form-control">
                                                            <option value="CA">Dr. Calvin Carlo</option>
                                                            <option value="CR">Dr. Cristino Murphy</option>
                                                            <option value="AL">Dr. Alia Reddy</option>
                                                            <option value="TO">Dr. Toni Kovar</option>
                                                            <option value="JE">Dr. Jessica McFarlane</option>
                                                            <option value="EL">Dr. Elsie Sherman</option>
                                                            <option value="BE">Dr. Bertha Magers</option>
                                                            <option value="LO">Dr. Louis Batey</option>
                                                        </select>
                                                    </div>
                                                </div>
                
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Your Email <span className="text-danger">*</span></label>
                                                        <input name="email" id="email" type="email" className="form-control" placeholder="Your email :"/>
                                                    </div> 
                                                </div>
                
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label">Your Phone <span className="text-danger">*</span></label>
                                                        <input name="phone" id="phone" type="tel" className="form-control" placeholder="Your Phone :"/>
                                                    </div> 
                                                </div>
                
                                                <div className="col-lg-12">
                                                    <div className="mb-3">
                                                        <label className="form-label">Comments <span className="text-danger">*</span></label>
                                                        <textarea name="comments" id="comments" rows="4" className="form-control" placeholder="Your Message :"></textarea>
                                                    </div>
                                                </div>
                
                                                <div className="col-lg-12">
                                                    <div className="d-grid">
                                                        <button type="submit" className="btn btn-primary">Book An Appointment</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div> :''
                                } */}
                {activeIndex === 2 ? (
                  <div className="tab-pane fade show active" dir="rtl">
                    <form>
                      <div className="row">
                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              اسم المريض <span className="text-danger">*</span>
                            </label>
                            <input
                              name="name"
                              id="name2"
                              type="text"
                              className="form-control"
                              placeholder="اسم المريض :"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الأقسام</label>
                            <select className="form-select form-control">
                              <option value="EY">Eye Care</option>
                              <option value="GY">Gynecologist</option>
                              <option value="PS">Psychotherapist</option>
                              <option value="OR">Orthopedic</option>
                              <option value="DE">Dentist</option>
                              <option value="GA">Gastrologist</option>
                              <option value="UR">Urologist</option>
                              <option value="NE">Neurologist</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">الأطباء</label>
                            <select className="form-select form-control">
                              <option value="CA">Dr. Calvin Carlo</option>
                              <option value="CR">Dr. Cristino Murphy</option>
                              <option value="AL">Dr. Alia Reddy</option>
                              <option value="TO">Dr. Toni Kovar</option>
                              <option value="JE">Dr. Jessica McFarlane</option>
                              <option value="EL">Dr. Elsie Sherman</option>
                              <option value="BE">Dr. Bertha Magers</option>
                              <option value="LO">Dr. Louis Batey</option>
                            </select>
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              بريدك الاكتروني
                              <span className="text-danger">*</span>
                            </label>
                            <input
                              name="email"
                              id="email2"
                              type="email"
                              className="form-control"
                              placeholder="بريدك الالكتروني :"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label">
                              رقم هاتفك<span className="text-danger">*</span>
                            </label>
                            <input
                              name="phone"
                              id="phone2"
                              type="tel"
                              className="form-control"
                              placeholder="رقم هاتفك :"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label"> التاريخ : </label>
                            <input
                              name="date"
                              type="date"
                              className="form-control start"
                              placeholder="اختر التاريخ :"
                            />
                          </div>
                        </div>

                        <div className="col-md-6">
                          <div className="mb-3">
                            <label className="form-label" htmlFor="input-time">
                              الوقت :{" "}
                            </label>
                            <input
                              name="time"
                              type="time"
                              className="form-control timepicker"
                              id="input-time"
                              placeholder="اختر الوقت :"
                            />
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="mb-3">
                            <label className="form-label">
                              ملاحظات <span className="text-danger">*</span>
                            </label>
                            <textarea
                              name="comments"
                              id="comments2"
                              rows="4"
                              className="form-control"
                              placeholder="اكتب رسالتك :"
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-lg-12">
                          <div className="d-grid">
                            <button type="submit" className="btn btn-primary">
                              ارسل الحجز الآن
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
