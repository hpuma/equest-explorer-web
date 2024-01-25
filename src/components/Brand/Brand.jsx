import "./Brand.css";
export default function Brand({ isDarkMode }) {
  return (
    <div>
      <img
        id="branding-logo"
        src={
          isDarkMode
            ? require("components/SearchWidget/images/Sentisys3.jpg")
            : require("components/SearchWidget/images/SentiSys2.jpg")
        }
      />
    </div>
  );
}
