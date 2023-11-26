export default class Config {
  static getColumns() {
    const columnNames = ["title", "author", "description"];
    const mappedColumns = columnNames.map((colName) => ({
      title: colName.charAt(0).toUpperCase() + colName.slice(1),
      dataIndex: colName,
      key: colName,
      defaultSortOrder: "descend",
      sorter: (a, b) => String(a).localeCompare(b.name)
    }));
    mappedColumns[1] = {
      ...mappedColumns[1],
      filters: [
        {
          text: "investors.com",
          value: "investors.com"
        },
        {
          text: "benzinga.com",
          value: "benzinga.com"
        }
      ],
      onFilter: (value, record) => String(record.author).includes(value)
    };
    return mappedColumns;
  }
}
