import React from "react";
import { GoGlobe } from "react-icons/go";
import { FaShieldAlt } from "react-icons/fa";

const InternetNeeds = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Internet Needs</h3>
      <div className="box grey-box">
        <b>Connection Required For:</b>
          <p><FaShieldAlt />Data fetching during compilation and score generation</p>
          <p><FaShieldAlt />Opening KoboToolbox form URL for the first time (caching for offline use)</p>
       
      </div>
      <p>
        The MDII Desktop App is designed to work effectively in environments
        with limited or intermittent internet access.
      </p>

      <div className="box green-box">
        <p>For more information on how to use KoboToolbox in offline settings, please consult: </p>
        <p>
          <a
            href="https://support.kobotoolbox.org/data_through_webforms.html?highlight=offline"
            target="_blank"
            rel="noopener noreferrer"
          >
            KoboToolbox Offline Documentation
          </a>

        </p>
      </div>
    </div>
  );
};

export default InternetNeeds;
