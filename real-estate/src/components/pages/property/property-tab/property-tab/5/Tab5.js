import React from 'react';
import "./tab5.css";

function Tab5() {
  return (
    <div className='property-box-6'>
      <div className='prt-box-6-1'>
        <h2>Location</h2>
        <p>The Twin Tower, Kalawad Road, Rajkot</p>
      </div>
      <div className='prt-line-6'></div>
      <div className='prt-box-6-2'>
        <iframe title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.7434334638165!2d70.77662287514207!3d22.287706679695617!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959cbd8a66fa5f5%3A0xeb163ecb541893c2!2sThe%20Twin%20Towers!5e0!3m2!1sen!2sin!4v1709798432387!5m2!1sen!2sin" 
          width="736" 
          height="441" 
          style={{ border: 0, borderRadius: '24px' }}
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  )
}

export default Tab5;
