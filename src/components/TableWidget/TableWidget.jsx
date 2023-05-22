import { useEffect, useState } from "react";
import { Table } from "antd";
import EquestInstance from "api/equestserver";
import Config from "./utils/config";
import { dataSourceDef } from "./utils/defaults";
import { v4 as uuidv4 } from "uuid";

export default function TableWidget({ ticker }) {
  let [dataSource, setDataSource] = useState(dataSourceDef);

  useEffect(() => {
    // Make api request on ticker update
    const getData = async () => {
      console.log("SEARCHED TICKER: ", ticker, "✅");
      const { articles, count } = await EquestInstance.getEverything(ticker);

      if (count) setDataSource(articles);
    };

    getData();
  }, [ticker]);

  return <Table columns={Config.getColumns()} dataSource={dataSource} rowKey={() => uuidv4()} />;
}
