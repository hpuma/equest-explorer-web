import React from "react";
import Sentisys2 from "../../assets/Sentisys2.jpg";
import Sentisys3 from "../../assets/Sentisys3.jpg";
import "./Brand.css";

export default function Brand({ isDarkMode }) {
  return (
    <div>
      <img id="branding-logo" src={isDarkMode ? Sentisys3 : Sentisys2} />
    </div>
  );
}
