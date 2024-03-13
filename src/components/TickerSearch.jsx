import React, { useState, useEffect } from "react";
import EquestInstance from "../api/equest";
import { AutoComplete, Input } from "antd";
import { bestMatchesDataDef } from "./defaults";

const { Search } = Input;

export default function TickerSearch({ onSearch, ticker, searchRef }) {
  const [bestMatchesData, setBestMatches] = useState(bestMatchesDataDef(ticker));
  const [options, setOptions] = useState(null);

  useEffect(() => {
    setOptions(createOptionsFromBestMatches());
    searchRef.current?.focus();
  }, [bestMatchesData]);

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

  const setAndFormatInput = (e) => {
    e.target.value = e.target.value.toUpperCase();
  };

  const tickerSearch = async (value) => {
    if (!value) return;
    const { bestMatches } = await EquestInstance.getTickerSearch(value);
    setBestMatches(bestMatches);
  };

  return (
    <>
      <AutoComplete
        popupMatchSelectWidth={252}
        style={{ width: "100%" }}
        options={options}
        onChange={tickerSearch}
        defaultActiveFirstOption
      >
        <Search
          onInput={setAndFormatInput}
          placeholder={ticker}
          enterButton="Search"
          size="large"
          onSearch={(value) => {
            onSearch({ value, name: bestMatchesData[0].name });
          }}
          style={{ width: "100%" }}
          allowClear
          ref={searchRef}
        />
      </AutoComplete>
    </>
  );
}
