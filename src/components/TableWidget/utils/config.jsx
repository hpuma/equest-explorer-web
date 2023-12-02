import { Tag } from "antd";

const newsSourceColorMap = {
  news: "red",
  marketaux: "blue",
  alphav: "green"
};

const columnConfigs = {
  newsSource: {
    filters: ["alphav", "marketaux", "news"].map((configName) => ({
      text: configName,
      value: configName
    })),
    onFilter: (value, record) => String(record["newsSource"]).includes(value),
    render: (_, { newsSource }) => {
      const color = newsSourceColorMap[newsSource];
      return (
        <Tag color={color} key={newsSource}>
          {newsSource}
        </Tag>
      );
    },
    title: "API"
  },
  url: {
    render: (_, { url }) => {
      const hostName = url ? new URL(url).hostname : "NO URL";

      return (
        <a href={url} target={"_blank"} rel="noreferrer">
          <b>{hostName}</b>
        </a>
      );
    }
  },
  timestamp: {
    title: "Date Published",
    render: (_, { timestamp: { date = "", time = "" } = {} }) => `${date}T${time}`
  },
  createdAt: {
    title: "Date Found"
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
