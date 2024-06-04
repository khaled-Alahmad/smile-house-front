'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import ModalVideo from 'react-modal-video';
import '../../../node_modules/react-modal-video/scss/modal-video.scss'

export default function AboutImage({colClass}){
    let [isOpen, setOpen] = useState(false);
    return(
    <div className={colClass}>
        <div className="position-relative">
            <Image src='/images/about/about-2.png' width={0} height={0} sizes='100vw' style={{width:'100%', height:'auto'}} className="img-fluid" alt=""/>
            <div className="play-icon">
                <Link href="#" scroll={false} onClick={() => setOpen(true)} className="play-btn lightbox video-play-icon">
                    <i className="mdi mdi-play text-primary rounded-circle shadow"></i>
                </Link>
            </div>
            <ModalVideo
				channel="youtube"
				youtube={{ mute: 1, autoplay: 1 }}
				isOpen={isOpen}
				videoId="yba7hPeTSjk"
				onClose={() => setOpen(false)} 
			/>
        </div>
    </div>
    )
}