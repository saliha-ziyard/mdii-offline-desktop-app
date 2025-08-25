import React from "react";

const Header = () => (
  <>
    <div className="header">
      <p className="header-title">MDII Evaluation Tool</p>
      <div className="header-logos">
        <img 
          src="./images/Wapor_Logo.png" 
          alt="Wapor Logo" 
          className="logo"
        />
        <img 
          src="./images/MDII_Logo.png" 
          alt="MDII Logo" 
          className="logo"
        />
      </div>
    </div>
    <hr/>
  </>
);

export default Header;