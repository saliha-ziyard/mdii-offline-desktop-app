import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";

const AdditionalSupport = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Additional Support</h3>
      <p>
        If you encounter issues not covered in the Troubleshooting section or need further assistance with the MDII Desktop App, our support team is here to help.
      </p>
      <div className="grey-box box">
        <h4>Technical Support</h4>
          
          <p>For technical issues or system-related questions</p>
        <p>
          Email: <a href="mailto:mdii@cgiar.org">mdii@cgiar.org</a>
        </p>
        <br/>
        <h4>Methodology Questions</h4>
       

        <p>For evaluation methodology and process guidance</p>
        <p>
          Email: <a href="mailto:mdii@cgiar.org">mdii@cgiar.org</a>
        </p>

        
      </div>
      <div className="box purple-box">
        <p>
          <strong>Response Time:</strong> We typically respond to support requests within 1–2 business days. For urgent technical issues, please indicate <em>"URGENT"</em> in your subject line.
        </p>
      </div>
    </div>
  );
};

export default AdditionalSupport;