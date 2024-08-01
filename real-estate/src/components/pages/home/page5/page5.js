import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./page5.css";
import * as Icon from "react-bootstrap-icons";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";
import axios from "axios";

function Page5() {
  const navigate = useNavigate();
  const [propertyDetails, setPropertyDetails] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const CardOpenByID = (id) => {
    navigate(`/Property/${id}`);
  };

  const moreProperties = () => {
    navigate(`/Properties`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:4040/getPropertyDetails")
      .then((response) => {
        setPropertyDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error fetching data. Please try again later.");
        setIsLoading(false);
      });
  };

  if (error) {
    return <div className="p-erroe-1">{error}</div>;
  }

  return (
    <>
      <div className="conatiner-5">
        <div className="content-5">
          <div className="heading-5">
            <h2>Featured places to stay</h2>
            <span>Popular places to stay that Chisfis recommends for you</span>
          </div>
          <div className="option-5">
            <div className="viewAll-5" onClick={moreProperties}>
              <p>
                View all <span>&#8594;</span>
              </p>
            </div>
          </div>
          {isLoading ? (
            <div className="loding-screen-1">
              <div className="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
              </div>
            </div>
          ) : (
            <div className="card-box-5">
              {propertyDetails.slice(0, 8).map((e) => {
                return (
                  <div className="card-5" key={e.id}>
                    <div className="img-card-5">
                      {e.discount !== 0 && (
                        <div className="discount-badge-5">
                          -{e.discount}% today{" "}
                        </div>
                      )}
                      <div className="img-scroll-5">
                        <img
                          src={`data:image/png;base64,${e.mainImage}`}
                          alt=""
                          className="img-5"
                        />
                      </div>
                    </div>
                    <div className="desc-card-5">
                      <div className="bagde-5">
                        <div className="bg-5 bg-clr-1">
                          <Icon.Share className="icon-bg-5 bg-clr-1" />
                          <span className="bg-clr-1">4 Network</span>
                        </div>
                        <div className="bg-5 bg-clr-2">
                          <Icon.PeopleFill className="icon-bg-5 bg-clr-2" />
                          <span className="bg-clr-2">Family</span>
                        </div>
                      </div>
                      <div className="title-5">
                        <h2>{e.propertyName}</h2>
                      </div>
                      <div className="facility-5">
                        <div className="fac-5">
                          <IoBedOutline className="icon-fac-5" />
                          <span>{e.beds} beds</span>
                        </div>
                        <div className="fac-5">
                          <PiBathtub className="icon-fac-5" />
                          <span>{e.baths} baths</span>
                        </div>
                        <div className="fac-5">
                          <LiaExpandArrowsAltSolid className="icon-fac-5" />
                          <span>{e.area} Sq. Fit</span>
                        </div>
                      </div>
                      <div className="line-5"></div>
                      <div className="ls-box-5">
                        <div className="review-5">
                          <Icon.StarFill className="icon-rev-5" />
                          {e.rating}
                        </div>
                        <Link exact="true" to={`/Property/${e.id}`}>
                          <div
                            className="price-5"
                            onClick={() => CardOpenByID(e._id)}
                          >
                            $ {e.price}
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <div className="box-btn-5">
            <div className="btn-5" onClick={moreProperties}>
              Show me more
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Page5;
