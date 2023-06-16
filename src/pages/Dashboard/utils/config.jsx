import { theme } from "antd";
export default class Config {
  static getTheme(isDarkMode) {
    return { backgroundColor: isDarkMode ? "#141414" : "#fff" };
  }
  static getThemeAlgorithm(isDarkMode) {
    return { algorithm: isDarkMode ? theme.darkAlgorithm : theme.lightAlgorithm };
  }
}
