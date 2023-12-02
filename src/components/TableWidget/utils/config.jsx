/* eslint-disable indent */
import { Tag } from "antd";

const newsSourceColorMap = {
  news: "red",
  marketaux: "blue",
  alphav: "green"
};
const columnNames = ["title", "newsSource", "url", "timestamp"];
export default class Config {
  static getColumns() {
    let newsFilters = ["alphav", "marketaux", "news"];

    return columnNames.map((columnName) => {
      const columnConfig = {
        title: columnName.charAt(0).toUpperCase() + columnName.slice(1),
        dataIndex: columnName,
        key: columnName,
        defaultSortOrder: "descend",
        sorter: (a, b) => String(a).localeCompare(b.name)
      };
      let additionalColumnConfig = {};
      switch (columnName) {
        case "newsSource":
          newsFilters = newsFilters.map((configName) => ({ text: configName, value: configName }));
          additionalColumnConfig = {
            ...Config.constructColumnFilters(newsFilters, "newsSource"),
            render: Config.createNewsSourceColumn
          };
          break;
        case "url":
          additionalColumnConfig = {
            render: Config.createUrlColumn
          };
          break;
      }

      return { ...columnConfig, ...additionalColumnConfig };
    });
  }

  static constructColumnFilters(filters, columnName) {
    return {
      filters,
      onFilter: (value, record) => String(record[columnName]).includes(value)
    };
  }

  static createNewsSourceColumn(_, { newsSource }) {
    const color = newsSourceColorMap[newsSource];
    return (
      <Tag color={color} key={newsSource}>
        {newsSource}
      </Tag>
    );
  }

  static createUrlColumn(_, { url }) {
    let hostname = null;
    if (url) hostname = new URL(url).hostname;

    return (
      <a href={url} target={"_blank"} rel="noreferrer">
        <b>{hostname ?? "link"}</b>
      </a>
    );
  }
}
