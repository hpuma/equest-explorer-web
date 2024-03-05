import { theme } from "antd";
export default class Theme {
  static getBackgroundColor(isDarkMode) {
    return isDarkMode ? "#141414" : "#fff";
  }
  static getAlgorithm(isDarkMode) {
    return { algorithm: isDarkMode ? theme.darkAlgorithm : theme.lightAlgorithm };
  }

  static isAlphabetChar(keyCode) {
    if (keyCode === 13) return false;
    else if (keyCode >= 65 && keyCode <= 90) return true;
  }

  static isTextValid(value) {
    if (typeof value === "string" && value.length > 0) {
      return true;
    } else if (!value) {
      console.log("SEARCHED TICKER: EMPTY ❌");
      return false;
    }
  }
}
