import { useEffect, useState } from "react";
import { Table } from "antd";
import EquestInstance from "api/equestserver";
import Config from "./utils/config";
import { dataSourceDef } from "./utils/defaults";
import { v4 as uuidv4 } from "uuid";

export default function TableWidget({ ticker }) {
  const [dataSource, setDataSource] = useState(dataSourceDef);

  useEffect(() => {
    // Make api request on ticker update
    const getData = async () => {
      console.log("SEARCHED NEWS RECORDS: ", ticker, "✅");
      const { articles, count } = await EquestInstance.getNewsRecords(ticker);

      if (count) setDataSource(articles);
    };

    return () => {
      getData();
    };
  }, [ticker]);

  return (
    <Table
      columns={Config.getColumns()}
      dataSource={dataSource}
      rowKey={() => uuidv4()}
      size="small"
    />
  );
}
