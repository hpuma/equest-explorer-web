import { useState, useEffect } from "react";
import { AutoComplete, Input } from "antd";
import EquestInstance from "api/equestserver";
import { bestMatchesDataDef } from "./defaults";

const { Search } = Input;

export default function SearchWidget({ onSearch, ticker, loading }) {
  const [bestMatchesData, setBestMatches] = useState(bestMatchesDataDef(ticker));
  const [options, setOptions] = useState(null);

  useEffect(() => setOptions(createOptionsFromBestMatches()), [bestMatchesData]);

  const createOptionsFromBestMatches = () =>
    bestMatchesData.map(({ symbol, name }) => ({
      value: symbol,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <span>
            <b>{symbol}</b>:{name}
          </span>
        </div>
      )
    }));

  const tickerSearch = async (value) => {
    if (!value) return;
    const { bestMatches } = await EquestInstance.getTickerSearch(value);
    setBestMatches(bestMatches);
  };

  return (
    <>
      <AutoComplete
        dropdownMatchSelectWidth={252}
        style={{ width: "100%" }}
        options={options}
        onChange={tickerSearch}
        defaultActiveFirstOption
        autoFocus
      >
        <Search
          onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
          placeholder={ticker}
          enterButton="Search"
          size="large"
          loading={loading}
          onSearch={onSearch}
          style={{ width: "100%" }}
          allowClear
        />
      </AutoComplete>
    </>
  );
}
