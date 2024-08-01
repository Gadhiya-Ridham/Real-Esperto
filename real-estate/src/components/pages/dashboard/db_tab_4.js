import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import "./dashboard.css";
import Property_Details from "../property/property-tab/propety-details";
import * as Icon from "react-bootstrap-icons";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtub } from "react-icons/pi";
import { LiaExpandArrowsAltSolid } from "react-icons/lia";

function Db_tab_4() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email");

  const CardOpenByID = (id) => {
    navigate(`/Property/${id}`);
  };

  const [likedCards, setLikedCards] = useState([]);

  const LikeProperty = (id) => {
    if (likedCards.includes(id)) {
      setLikedCards(likedCards.filter((cardId) => cardId !== id));
    } else {
      setLikedCards([...likedCards, id]);
    }
  };

  if (email === "admin@gmail.com") {
    return (
      <>
        <div className="db-box-4"></div>
      </>
    );
  } else {
    return (
      <>
        <div className="db-box-4">
          <div className="db-text-1">Your Properties</div>
          <div className="db-line-1"></div>
          <div className="card-db">
            {Property_Details.map((e, index) => {
              const isLiked = likedCards.includes(e._id);
              return (
                <div className="card-5" key={index}>
                  <div className="img-card-5">
                    <div className="discount-badge-5">
                      -{e.discount}% today{" "}
                    </div>
                    <div className="img-scroll-5">
                      <img src={e.house_image} alt="" className="img-5" />
                    </div>
                  </div>
                  <div className="desc-card-5">
                    <div className="like-btn-5">
                      <Icon.SuitHeartFill
                        className={`icon-like-5 ${isLiked ? "liked" : ""}`}
                        onClick={() => LikeProperty(e._id)}
                      />
                    </div>

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
                      <h2>{e.name}</h2>
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
        </div>
      </>
    );
  }
}

export default Db_tab_4;
