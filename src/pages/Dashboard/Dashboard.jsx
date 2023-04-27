import { useState } from "react";
import "./Dashboard.css";
import TableWidget from "components/TableWidget/TableWidget";
import SearchWidget from "components/SearchWidget/SearchWidget";

export default function Dashboard() {
  let [ticker, setTicker] = useState("AMZN");
  let [sortBy, setSortBy] = useState(null);
  let [loading, setLoading] = useState(false);

  // Search non empty search bars only
  const onSearch = (value) => {
    if (value) setTicker(value.toUpperCase());
    else console.log("SEARCHED TICKER: EMPTY ❌");
  };

  // Loading animation for widgets
  const updateLoading = (isLoading, delay) => {
    setTimeout(() => {
      setLoading(isLoading);
    }, delay);
  };

  return (
    <div id="dashboard-container">
      <h1>Dashboard</h1>
      <SearchWidget ticker={ticker} loading={loading} onSearch={onSearch} />
      <TableWidget ticker={ticker} sortBy={sortBy} updateLoading={updateLoading} />
    </div>
  );
}
