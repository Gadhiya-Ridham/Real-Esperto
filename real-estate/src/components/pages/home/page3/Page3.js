import React from "react";
import "./Page3.css";


function Page1() {
  return (
    <div className="container-3">
      <div className="content-3">
        <div className="title-3">
          <h2>How it work</h2>
          <span>Keep calm & travel on</span>
        </div>
        <div className="discription-3">
          <div className="line-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1431"
              height="105"
              viewBox="0 0 1431 105"
              fill="none"
            >
              <path
                d="M1 36.2274C308.531 219.886 521.943 -34.9837 778.073 28.7069C1105.98 110.245 1222.39 65.914 1430 1"
                stroke="#9CA3AF"
                strokeLinecap="round"
                strokeDasharray="6 14"
              />
            </svg>
          </div>
          <div className="desc-3">
            <div className="box-3-1">
              <div className="image-3 img-3-1"></div>
              <div className="heading-3">
                <h3>Smart search</h3>
              </div>
              <div className="sub-heading-3">
                <span>
                  Name the area or type of home you are looking for the search
                  bar. Our app will find you the perfect match.
                </span>
              </div>
            </div>
            <div className="box-3-2">
              <div className="image-3 img-3-2"></div>
              <div className="heading-3">
                <h3>Choose property</h3>
              </div>
              <div className="sub-heading-3">
                <span>
                  From the number of options our app will provide, you can
                  select any property that you like to explore.
                </span>
              </div>
            </div>
            <div className="box-3-3">
              <div className="image-3 img-3-3"></div>
              <div className="heading-3">
                <h3>Book you property</h3>
              </div>
              <div className="sub-heading-3">
                <span>
                  Find a home or space from our search bar. Enter your specific
                  location, property type and price range.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page1;
