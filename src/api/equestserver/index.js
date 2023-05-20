import Axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import config from "configs";
const { localConfig } = config;

export class EquestServer {
  constructor(configuration) {
    const { baseURL = "" } = configuration;

    this.instance = Axios.create({
      baseURL
    });
  }

  async getEverything(ticker, sortBy = null) {
    const date = new Date();
    const yesterday = date.getDate() - 1;
    const thisMonth = date.getMonth();
    const thisYear = date.getFullYear();

    const startDate = new Date(thisYear, thisMonth, yesterday, 9, 30, 0).toISOString();
    const endDate = new Date(thisYear, thisMonth, yesterday, 16, 0, 0).toISOString();

    const requestParams = {
      params: { ticker, sortBy, startDate, endDate }
    };

    const { data } = await this.instance.get("news/everything", requestParams);

    return data;
  }

  async getIntraday(ticker) {
    const requestParams = {
      params: {
        ticker,
        interval: "1min",
        datasize: "compact"
      }
    };
    const { data } = await this.instance.get("alphav/intraday", requestParams);
    return data;
  }

  async getGlobalQuote(ticker) {
    const requestParams = {
      params: { ticker }
    };

    const { data } = await this.instance.get("alphav/global-quote", requestParams);
    return data;
  }
  async getTickerSearch(ticker) {
    const requestParams = {
      params: { ticker }
    };

    const { data } = await this.instance.get("equest/ticker-search", requestParams);
    return data;
  }
}
const EquestInstance = new EquestServer(localConfig);
export default EquestInstance;
