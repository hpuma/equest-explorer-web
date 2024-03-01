import React from "react";
import { Tag } from "antd";

const newsSourceColorMap = {
  alphav: "green",
  news: "red",
  newsdata: "purple",
  gnews: "pink",
  thenews: "cyan",
  marketaux: "blue",
  bing: "orange"
};

const columnConfigs = {
  newsSource: {
    filters: ["alphav", "marketaux", "news"].map((configName) => ({
      text: configName,
      value: configName
    })),
    onFilter: (value, record) => String(record["newsSource"]).includes(value),
    render: (_, { newsSource }) => (
      <Tag color={newsSourceColorMap[newsSource]} key={newsSource}>
        {newsSource}
      </Tag>
    ),
    title: "API",
    width: "13%"
  },
  url: {
    render: (_, { url }) => (
      <a href={url} target={"_blank"} rel="noreferrer">
        <b>{url ? new URL(url).hostname : "NO URL"}</b>
      </a>
    ),
    width: "14%"
  },
  timestamp: {
    title: "Date Published",
    render: (_, { timestamp: { date = "", time = "" } = {} }) => `${date}T${time}`,
    width: "14%"
  },
  createdAt: {
    title: "Date Found",
    width: "14%"
  },
  title: {
    title: "Title",
    render: (_, { title }) => <p style={{ cursor: "pointer" }}>{title}</p>
  }
};

export default class Config {
  static columnNames = ["title", "newsSource", "url", "timestamp", "createdAt"];
  static getColumns() {
    return Config.columnNames.map((columnName) => {
      const remainingColumnConfig = columnConfigs[columnName] ?? {};

      return {
        title: columnName.charAt(0).toUpperCase() + columnName.slice(1),
        dataIndex: columnName,
        key: columnName,
        defaultSortOrder: "descend",
        sorter: (a, b) => String(a).localeCompare(b.name),
        ...remainingColumnConfig
      };
    });
  }
}
