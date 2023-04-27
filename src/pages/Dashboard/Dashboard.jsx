import { useEffect, useState } from "react";
import "./Dashboard.css";
import { Input, Space } from "antd";
import EquestInstance from "api/equestserver";
import TableWidget from "components/TableWidget/TableWidget";

const { Search } = Input;

export default function Dashboard() {
  let [ticker, setTicker] = useState("amzn");
  let [dataSource, setDataSource] = useState();
  let [sortBy, setSortBy] = useState(null);
  
  // Search non empty search bars only
  const onSearch = (value) => { if(value) {setTicker(value); } else {console.log("SEARCHED TICKER: EMPTY ❌");}};
  
  useEffect(() => {
    // Make api request on ticker update
    const getData = async() =>{
      console.log("SEARCHED TICKER: ", ticker, "✅");
      const { articles, count }  = await EquestInstance.getEverything(ticker, sortBy);
      if (count) setDataSource(articles);
    };
    getData();
  }, [ticker, sortBy]);

  return (
    <div id="dashboard-container">
      <h1>Dashboard</h1>
      <Search
        placeholder="Search Ticker"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{ width: 400 }} 
      />
      <TableWidget dataSource={dataSource} />
    </div>
  );
}
