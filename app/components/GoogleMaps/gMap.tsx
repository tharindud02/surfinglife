import React from "react";

const GMap = () => {
  return (
    <div>
      <div className="mapouter">
        <div className="gmap_canvas">
          <iframe
            title="Google Map"
            className="gmap_iframe"
            width="100%"
            src="https://maps.google.com/maps?width=600&amp;height=200&amp;hl=en&amp;q=surfinglife&amp;t=&amp;z=15&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
      <style>
        {`
          .mapouter {
            position: relative;
            text-align: right;
            width: 100%;
            height: 200px;
          }
          .gmap_canvas {
            overflow: hidden;
            background: none!important;
            width: 100%;
            height: 200px;
          }
          .gmap_iframe {
            height: 200px!important;
          }
        `}
      </style>
    </div>
  );
};

export default GMap;
