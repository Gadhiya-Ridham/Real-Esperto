import React from 'react';
import "./container4.css";
import logo_1 from "../../images/logo.png"
import img_4_1 from "../images/img-4.png";


function Container4() {
  return (
    <div className='a-container-4'>
     <div className='a-content-4'>
          <div className='a-desc-4'>
               <div className='a-logo-box-4'>
                    <img src={logo_1} alt='' className='a-logo-4'/>
               </div>
               <h3 className='a-title-4'>Effortless Escapes</h3>
               <div className='a-heading-4'>Why did you choose us?</div>
               <div className='a-sub-heading-4'>Accompanying us, you have a trip full of experiences. With Real-Esperto, booking accommodation, resort villas, hotels, private houses, apartments... becomes fast, convenient and easy.</div>
               <div className='a-btn-4'>Become an author</div>
          </div>
          <div className='a-img-box-4'>
               <img src={img_4_1} alt='' className='a-img-4'/>
          </div>
     </div>
    </div>
  )
}

export default Container4;