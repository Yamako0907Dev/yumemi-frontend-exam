/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckBox } from "./components/CheckBox";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const endPoint = "https://opendata.resas-portal.go.jp";
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

interface Prefectures {
  prefCode: number;
  prefName: string;
}

const App: React.FC = () => {
  const [prefecture, setPrefecture] = useState<Prefectures[]>([]);

  useEffect(() => {
    const getPrefectures = async () => {
      if (!apiKey) return;
      const { data } = await axios.get(endPoint + "/api/v1/prefectures", {
        headers: {
          "X-API-KEY": apiKey,
          "Content-Type": "application/json;charset=UTF-8",
        },
      });
      setPrefecture(data.result);
    };
    getPrefectures();
  }, []);

  

  const options = {
    title: {
      text: "My chart",
    },
    yAxis: {
      title: {
        text: "人口数",
      },
    },
    xAxis: {
      title: {
        text: "年度",
      },
    },
    series: [
      {
        name: "Jane",
        data: [1, 0, 4],
      },
      {
        name: "John",
        data: [5, 7, 3],
      },
    ],
  };

  return (
    <div css={{ margin: "20px" }}>
      <header>
        <h2>Title</h2>
      </header>
      <div
        css={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
      >
        <div
          css={{
            display: "flex",
            alignItems: "flex-start",
            flexWrap: "wrap",
            flexDirection: "row",
          }}
        >
          {prefecture.map((item: Prefectures) => {
            return (
              <CheckBox
                key={`${item.prefName.toString()}`}
                prefName={item.prefName}
              ></CheckBox>
            );
          })}
        </div>
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
          ></HighchartsReact>
        </div>
      </div>
    </div>
  );
};

export default App;
