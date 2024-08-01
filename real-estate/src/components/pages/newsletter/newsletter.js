import React from "react";
import * as Icon from "react-bootstrap-icons";
import "./newsletter.css";
import img_ns from "../images/img-ns.png";

function NewsLetter() {
  return (
    <div className="container-ns">
      <div className="content-ns">
        <div className="box-ns">
          <div className="discription-ns">
            <div className="heading-ns">
              <h2>Join our newsletter 🎉</h2>
            </div>
            <div className="sub-heading-ns">
              <span>
                Read and share new perspectives on just about any topie.
                Everyone’s welcome.
              </span>
            </div>
            <div className="point-ns">
              <div className="line-ns-1">
                <div className="badge-ns clr-ns-1"><span>01</span></div>
                <div className="text-ns"><span>Get more discount</span></div>
              </div>
              <div className="line-ns-2">
                <div className="badge-ns clr-ns-2"><span>02</span></div>
                <div className="text-ns"><span>Get premium magazines</span></div>
              </div>
            </div>
            <div className="input-ns">
              <input type="text" placeholder="Enter your email" />
              <div className="btn-ns">
                <Icon.ArrowRight className="icon-ns"/>
              </div>
            </div>
          </div>
          <div className="image-ns">
            <img src={img_ns} alt="" className="img-ns"/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsLetter;
