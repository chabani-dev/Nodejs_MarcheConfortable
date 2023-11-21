import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <div className="justify-content-center d-flex">
        {/* <div className="card-name">
          <img
            alt="mastercard"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/1200px-MasterCard_Logo.svg.png"
          />
        </div> */}
        {/* <div className="card-name"> */}
        {/* <img
            alt="visa"
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          /> */}
        {/* </div>
        <div className="card-name"> */}
        {/* <img
            alt="paypal"
            src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Paypal_2014_logo.png"
          /> */}
        {/* </div>
        <div className="card-name"> */}
        {/* <img
            alt="express"
            src="https://icons.iconarchive.com/icons/designbolts/credit-card-payment/256/American-Express-icon.png"
          /> */}
        {/* </div>
        <div className="card-name"> */}
        {/* <img
            alt="discover"
            src="https://icons-for-free.com/iconfiles/png/512/cash+checkout+discover+network+online+shopping+payment+method-1320191225548835050.png"
          /> */}
        <div className="card-name">
          <p class="d-inline">© 2023 Shoeshop</p>
        </div>

        <div className="card-name">
          <Link to="#">Conditions générales</Link>
        </div>
        <div className="card-name">
          <span style="display: inline-block; height: 16px; width: 16px; fill: currentcolor;">
            Français (FR)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
