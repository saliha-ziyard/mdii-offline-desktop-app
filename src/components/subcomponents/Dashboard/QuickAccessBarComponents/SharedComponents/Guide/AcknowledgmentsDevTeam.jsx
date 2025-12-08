import React from "react";

const AcknowledgmentsDevTeam = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Acknowledgment and Development Team</h3>
      <h4> Development Team</h4>
      <p>
        The MDII framework and desktop application were developed through collaborative effort by researchers and practitioners dedicated to advancing digital inclusiveness in agricultural systems.
      </p>
      
      <div className="grey-box box">
        <h4>Core Development Team</h4>
        <p>
          Led by the International Water Management Institute (IWMI) in collaboration with various research institutions and development organizations worldwide.
        </p>
      </div>

      <h4>Acknowledgments</h4>
      <p>
        We extend our gratitude to the numerous experts, practitioners, and communities who contributed their insights and feedback during the development and testing phases of this framework.
      </p>
      
      <div className="grey-box box">
        <p>
          Special thanks to the domain experts, end-users, and innovators who participated in pilot evaluations and provided valuable input that shaped the current version of the MDII desktop application.
        </p>
      </div>

      <div className="orange-box box">
        <h4>Funding & Support</h4>
        <p>
          This work was supported by various funding organizations committed to promoting inclusive digital transformation in agriculture and development.
        </p>
      </div>
    </div>
  );
};

export default AcknowledgmentsDevTeam