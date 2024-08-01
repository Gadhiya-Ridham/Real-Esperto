import React from "react";
import { useNavigate, useParams } from "react-router";
import "./dashboard.css";
import Tab1 from "./db_tab_1";
import Tab2 from "./db_tab_2";
import Tab3 from "./db_tab_3";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Dashboard() {
  const navigate = useNavigate();
  const { tabNumber } = useParams();

  return (
    <>
      <ToastContainer />
      <div className="db-container">
        <div className="db-box">
          <div className="db-lists">
            <ul>
              <li
                className={tabNumber === "1" ? "active-db" : ""}
                onClick={() => navigate("/dashboard/1")}
              >
                Account info
              </li>
              <li
                className={tabNumber === "2" ? "active-db" : ""}
                onClick={() => navigate("/dashboard/2")}
              >
                Listings
              </li>
              <li
                className={tabNumber === "3" ? "active-db" : ""}
                onClick={() => navigate("/dashboard/3")}
              >
                Change password
              </li>
              
              <li onClick={() => navigate("/")}>Back</li>
            </ul>
          </div>
        </div>
        {tabNumber === "1" && <Tab1 />}
        {tabNumber === "2" && <Tab2 />}
        {tabNumber === "3" && <Tab3 />}
        {/* {tabNumber === "4" && <Tab4 />} */}
      </div>
    </>
  );
}

export default Dashboard;
