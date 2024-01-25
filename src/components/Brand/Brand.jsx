import "./Brand.css";
import React from "react";
export default function Brand({ isDarkMode }) {
  return (
    <div>
      <img
        id="branding-logo"
        src={
          isDarkMode
            ? "components/SearchWidget/images/Sentisys3.jpg"
            : "components/SearchWidget/images/SentiSys2.jpg"
        }
      />
    </div>
  );
}
