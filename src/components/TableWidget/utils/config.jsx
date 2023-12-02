import { Tag } from "antd";

const newsSourceColorMap = {
  news: "red",
  marketaux: "blue",
  alphav: "green"
};

export default class Config {
  static getColumns() {
    const columnNames = ["title", "author", "description", "newsSource"];
    const mappedColumns = columnNames.map((colName) => ({
      title: colName.charAt(0).toUpperCase() + colName.slice(1),
      dataIndex: colName,
      key: colName,
      defaultSortOrder: "descend",
      sorter: (a, b) => String(a).localeCompare(b.name)
    }));

    const newsColumn = 3;
    const newsFilters = [
      {
        text: "alphav",
        value: "alphav"
      },
      {
        text: "marketaux",
        value: "marketaux"
      },
      {
        text: "news",
        value: "news"
      }
    ];
    mappedColumns[newsColumn] = {
      ...mappedColumns[newsColumn],
      ...Config.constructColumnFilters(newsFilters, "newsSource"),
      // Configure seperate labels for newsSource
      render: (_, { newsSource }) => {
        const color = newsSourceColorMap[newsSource];

        return (
          <Tag color={color} key={newsSource}>
            {newsSource}
          </Tag>
        );
      }
    };

    return mappedColumns;
  }
  static constructColumnFilters(filters, filterField) {
    return {
      filters,
      onFilter: (value, record) => String(record[filterField]).includes(value)
    };
  }
}
