import { useEffect, useState } from "react";
import "./Dashboard.css";

import EquestInstance from "api/equestserver";
import TableWidget from "components/TableWidget/TableWidget";
import SearchWidget from "components/SearchWidget/SearchWidget";

export default function Dashboard() {
  let [ticker, setTicker] = useState("AMZN");
  let [dataSource, setDataSource] = useState();
  let [sortBy, setSortBy] = useState(null);
  let [loading, setLoading] = useState(false);

  // Search non empty search bars only
  const onSearch = (value) => {
    if (value) setTicker(value);
    else console.log("SEARCHED TICKER: EMPTY ❌");
  };

  // Loading animation for widgets
  const updateLoading = (isLoading, delay) => {
    setTimeout(() => {
      setLoading(isLoading);
    }, delay);
  };

  useEffect(() => {
    // Make api request on ticker update
    const getData = () => {
      updateLoading(true, 0);

      console.log("SEARCHED TICKER: ", ticker, "✅");
      const { articles, count } = EquestInstance.getEverything(ticker, sortBy).then((d) =>
        updateLoading(false, 215)
      );
      if (count) setDataSource(articles);
    };

    getData();
  }, [ticker, sortBy]);

  return (
    <div id="dashboard-container">
      <h1>Dashboard</h1>
      <SearchWidget onSearch={onSearch} ticker={ticker} loading={loading} />
      <TableWidget dataSource={dataSource} />
    </div>
  );
}
