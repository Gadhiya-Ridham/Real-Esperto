import React from "react";
import * as Icon from "react-icons/fa6";
import "./footer.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import img_1 from "../pages/images/img-1-footer.jpeg";
import img_2 from "../pages/images/img-2-footer.jpeg";
import img_3 from "../pages/images/img-3-footer.jpeg";
import img_4 from "../pages/images/img-4-footer.jpeg";
import img_5 from "../pages/images/img-5-footer.jpeg";
import img_6 from "../pages/images/img-6-footer.jpeg";

function Footer() {
  const email = sessionStorage.getItem("email");

  if (email === "admin@gmail.com") {
    return (
      <>
        <div className="display-none-header"></div>
      </>
    );
  }

  return (
    <>
      <div className="container-footer">
        <div className="content-footer">
          <div className="box-footer">
            <div className="box-1-footer">
              <div className="title-footer">
                <h2>About</h2>
              </div>
              <div className="disc-footer">
                <div className="text-footer">
                  <span>
                    "RealEsperto.com - Your Expert Guide to Real Estate. Find
                    your dream home with expert advice and resources tailored to
                    your needs."
                  </span>
                </div>
                <div className="icon-footer">
                  <div className="box-icon-footer">
                    <a href="/">
                      <Icon.FaFacebookF className="icon-ft" />
                    </a>
                  </div>
                  <div className="box-icon-footer">
                    <a href="/">
                      <Icon.FaInstagram className="icon-ft" />
                    </a>
                  </div>
                  <div className="box-icon-footer">
                    <a href="/">
                      <Icon.FaLinkedinIn className="icon-ft" />
                    </a>
                  </div>
                  <div className="box-icon-footer">
                    <a href="/">
                      <Icon.FaXTwitter className="icon-ft" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="box-2-footer">
              <div className="title-footer">
                <h2>Useful Links</h2>
              </div>
              <div className="links-footer">
                <ul>
                  <li>
                    <a href="/">About</a>
                  </li>
                  <li>
                    <a href="/">Services</a>
                  </li>
                  <li>
                    <a href="/">Projects</a>
                  </li>
                  <li>
                    <a href="/">Meet the Team</a>
                  </li>
                  <li>
                    <a href="/">Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="box-3-footer">
              <div className="title-footer">
                <h2>Portfolio</h2>
              </div>
              <div className="images-footer">
                <div className="img-box-footer">
                  <img src={img_1} alt="" className="img-ftr" />
                </div>
                <div className="img-box-footer">
                  <img src={img_2} alt="" className="img-ftr" />
                </div>
                <div className="img-box-footer">
                  <img src={img_3} alt="" className="img-ftr" />
                </div>
                <div className="img-box-footer">
                  <img src={img_4} alt="" className="img-ftr" />
                </div>
                <div className="img-box-footer">
                  <img src={img_5} alt="" className="img-ftr" />
                </div>
                <div className="img-box-footer">
                  <img src={img_6} alt="" className="img-ftr" />
                </div>
              </div>
            </div>
            <div className="box-4-footer">
              <div className="title-footer">
                <h2>Conatact</h2>
              </div>
              <div className="desc-4-footer">
                <div className="add-footer">
                  The Twin Tower, Kalawad Road, Rajkot
                </div>
                <div className="email-footer">
                  <Icon.FaEnvelope className="icon-cnt" />
                  real.esperto@gmail.com
                </div>
                <div className="phone-footer">
                  <Icon.FaPhone className="icon-cnt" />
                  +123 456 7890
                </div>
              </div>
            </div>
          </div>
          <div className="copyright-footer">
            <span>© Copyright 2024 by Real Esperto</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
