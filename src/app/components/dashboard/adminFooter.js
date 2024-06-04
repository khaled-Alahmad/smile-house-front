import React from "react";
import Link from "next/link";

export default function AdminFooter(){
    return(
        <footer className="py-4">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-sm-6">
                        <div className="text-sm-start text-center">
                            <p className="mb-0">{new Date().getFullYear()} © Doctris. Design & Develop with <i className="mdi mdi-heart text-danger"></i> by <Link href="https://shreethemes.in/" target="_blank" className="text-reset">Shreethemes</Link>.</p>
                        </div>
                    </div>

                    <div className="col-sm-6 mt-4 mt-sm-0">
                        <ul className="list-unstyled footer-list text-sm-end text-center mb-0">
                            <li className="list-inline-item"><Link href="/terms" className="text-foot me-2">Terms</Link></li>
                            <li className="list-inline-item"><Link href="/privacy" className="text-foot me-2">Privacy</Link></li>
                            <li className="list-inline-item"><Link href="/aboutus" className="text-foot me-2">About</Link></li>
                            <li className="list-inline-item"><Link href="/contact" className="text-foot me-2">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}