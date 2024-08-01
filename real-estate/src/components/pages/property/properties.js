import React, {useEffect} from "react";
import "./properties.css";
import { IoHome } from "react-icons/io5";
import Container1 from "./container1/container1";


function Properties() {

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <div className="p-container-home">
        <div className="p-content-home">
          <div className="p-nav-bar"></div>
          <div className="p-heading">
            <h1>Properties</h1>
            <div className="p-link">
              <a href="/">
                <IoHome className="p-icon-home" />
              </a>
              <div className="p-text-property">
                <span>{`//`}</span>
                <p>Peoperties</p>
              </div>
            </div>
          </div>
        </div>
      </div>
        <Container1 />
    </>
  );
}

export default Properties;
