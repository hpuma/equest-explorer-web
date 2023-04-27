export default class Config {

  static getColumns() {
    const columnNames = ["title", "author", "description", "publishedAt"];
    return columnNames.map((colName) => ({
      title: colName.charAt(0).toUpperCase() + colName.slice(1),
      dataIndex: colName,
      key: colName
    }));
  }
}