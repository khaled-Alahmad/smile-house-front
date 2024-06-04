'use client'
import React from "react";
import Link from "next/link";

import { RiPrinterLine } from '../../assets/icons/vander'

export default function Print({className}){
    return(
        <div className={className}>
            <Link href="#" scroll={false} onClick={() => window.print()} className="btn btn-soft-primary d-print-none"><RiPrinterLine /> Print</Link>
        </div>
    )
}

