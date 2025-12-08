import React from "react";

const FurtherReading = ({ setCurrentPage, setActiveSection, activeSection }) => {
  return (
    <div className="content-body">
      <h3>Discover more about MDII</h3>
      
      <p><h4>Website:</h4> <a href="https://mdii.iwmi.org" target="_blank" rel="noopener noreferrer">
          mdii.iwmi.org
        </a></p>
      <h4>Resources</h4>
      
      <div className="grey-box box">
        <h5>A multi-dimensional framework for responsible and socially inclusive digital innovation in food, water, and land systems</h5>
        <p className="authors">
          Opola, F., Langan, S., Arulingam, I., Schumann, C., Singaraju, N., Joshi, D., Ghosh, S. (2025).
        </p>
        <a href="https://hdl.handle.net/10568/174461" target="_blank" rel="noopener noreferrer">
          https://hdl.handle.net/10568/174461
        </a>
      </div>

      <div className="grey-box box">
        <h5>Development of the conceptual framework (version 2.0) of the Multidimensional Digital Inclusiveness Index</h5>
        <p className="authors">
          Martins, C. I., Opola, F., Jacobs-Mata, I., Garcia Andarcia, M., Nortje, K., Joshi, D., Singaraju, N., Muller, A., Christen, R., Malhotra, A. (2023).
        </p>
        <a href="https://hdl.handle.net/10568/138705" target="_blank" rel="noopener noreferrer">
          https://hdl.handle.net/10568/138705
        </a>
      </div>
    </div>
  )}

  export default FurtherReading;