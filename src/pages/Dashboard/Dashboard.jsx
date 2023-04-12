import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Table } from "antd";
import EquestInstance from "api/equestserver";
export default function Dashboard() {
  let [ticker, setTicker] = useState("spy");
  let [dataSource, setDataSource] = useState([
    {
      key: 1,
      title: "title_val",
      link: "link_val",
      timestamp: "timestamp_val",
      activity: "activity_val"
    }
  ]);
  let [sortBy, setSortBy] = useState(null);

  const columnNames = ["title", "link", "timestamp", "activity"];
  const columns = columnNames.map((colName) => ({
    title: colName.charAt(0).toUpperCase() + colName.slice(1),
    dataIndex: colName,
    key: colName
  }));

  useEffect(() => {
    async function getData() {
      const tickerData = await EquestInstance.getEverything(ticker, sortBy);
      const { articles, count } = tickerData;

      if (count !== 0) setDataSource(articles);
    }
    getData();
  }, [ticker, sortBy]);

  return (
    <div id="dashboard-container">
      <h1>Dashboard</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
}
