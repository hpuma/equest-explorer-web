import { useEffect, useRef } from "react";
let tvScriptLoadingPromise;
export default function ChartWidget({ ticker }) {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement("script");
        script.id = "tradingview-widget-loading-script";
        script.src = "https://s3.tradingview.com/tv.js";
        script.type = "text/javascript";
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => onLoadScriptRef.current && onLoadScriptRef.current());

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (document.getElementById("tradingview_8180a") && "TradingView" in window) {
        new window.TradingView.widget({
          width: "100%",
          height: 610,
          symbol: `NASDAQ:${ticker}`,
          timezone: "America/New_York",
          theme: "dark",
          style: "1",
          locale: "en",
          toolbar_bg: "#f1f3f6",
          enable_publishing: false,
          range: "3M",
          hide_side_toolbar: false,
          allow_symbol_change: true,
          save_image: false,
          show_popup_button: true,
          popup_width: "1000",
          popup_height: "650",
          container_id: "tradingview_8180a"
        });
      }
    }
  }, []);

  return (
    <div className="tradingview-widget-container">
      <div id="tradingview_8180a" />
      <div className="tradingview-widget-copyright">
        <a
          href="https://www.tradingview.com/"
          rel="noopener nofollow noreferrer"
          target="_blank"
        ></a>
      </div>
    </div>
  );
}
