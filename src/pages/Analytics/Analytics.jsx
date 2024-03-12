import React, { useState, useContext } from "react";
import Components from "../../components";
import Theme from "../../configs/theme";
import { ThemeContext } from "../../index";
import { Collapse, ConfigProvider, Col, Row, Statistic, Card, DatePicker } from "antd";
import { dataDef } from "./defaults";
import { formatLabel } from "../../global/utils";
import { v4 as uuidv4 } from "uuid";

const { NavBar } = Components;
const onDatePick = (date, dateString) => console.log(date, dateString);

const StatisticComponent = ({ stats }) => (
  <Row>
    {Object.entries(stats).map((entry) => (
      <Col span={5} key={uuidv4()}>
        <Statistic valueStyle={{ fontSize: 16 }} title={formatLabel(entry[0])} value={entry[1]} />
      </Col>
    ))}
  </Row>
);

const CardComponent = ({ title, child }) => <Card title={<h2>{title}</h2>}>{child}</Card>;

export function Analytics() {
  const [data, setData] = useState(dataDef);
  const { isDarkMode } = useContext(ThemeContext);

  const integrations = Object.keys(data).filter((key) => !["global", "createdAt"].includes(key));

  return (
    <ConfigProvider theme={Theme.getAlgorithm(isDarkMode)}>
      <Row>
        <Col span={12}>
          <CardComponent
            title={"Global Stats"}
            child={<StatisticComponent stats={data["global"]} />}
          />
        </Col>
        <Col span={12}>
          <NavBar />
          <DatePicker onChange={onDatePick} />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Collapse
            defaultActiveKey={Array.from(Array(integrations.length + 1).keys())}
            size={"small"}
            items={integrations.map((integration, key) => ({
              label: formatLabel(integration),
              key,
              children: <StatisticComponent stats={data[integration]} />
            }))}
          />
        </Col>
      </Row>
    </ConfigProvider>
  );
}
