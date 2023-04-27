import { useEffect, useState } from "react";
import "./Dashboard.css";

import EquestInstance from "api/equestserver";
import TableWidget from "components/TableWidget/TableWidget";

export default function Dashboard() {
  let [ticker, setTicker] = useState("amzn");
  let [dataSource, setDataSource] = useState();
  let [sortBy, setSortBy] = useState(null);

  useEffect(() => {
   
    async function getData() {
      const { articles, count }  = await EquestInstance.getEverything(ticker, sortBy);
      if (count) setDataSource(articles);
    }
    getData();
  }, [ticker, sortBy]);

  return (
    <div id="dashboard-container">
      <h1>Dashboard</h1>
      <TableWidget dataSource={dataSource} />
    </div>
  );
}
