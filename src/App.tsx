/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckBox } from "./components/CheckBox";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

const endPoint = "https://opendata.resas-portal.go.jp";
const apiKey = process.env.REACT_APP_RESAS_API_KEY;

export interface Prefectures {
  prefCode: number;
  prefName: string;
}

interface PopulationPerYear {
  year: number;
  value: number;
}

interface ChartData {
  name: string;
  prefCode: number;
  isActive: boolean;
  data: number[];
}

const App: React.FC = () => {
  const [prefecture, setPrefecture] = useState<Prefectures[]>([]);
  // const [checkPrefecture, setCheckPrefecture] = useState({});
  const [chartCacheData, setChartCacheData] = useState<ChartData[]>([]);
  const [chartData, setChartData] = useState<ChartData[]>([]);

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

  useEffect(() => {
    const setChart = () => {
      const list: ChartData[] = [];
      chartCacheData.map((item) => {
        if (item.isActive) {
          const obj = Object.assign({}, item);
          list.push(obj);
        }
        return item;
      });
      setChartData(list);
    };
    setChart();
  }, [chartCacheData]);

  const getPrefecturePopulation = async (
    prefecture: Prefectures,
    index: number
  ): Promise<void | number[]> => {
    const array: number[] = [];
    if (index === -1) {
      if (!apiKey) return;
      const { data } = await axios.get(
        endPoint +
          `/api/v1/population/composition/perYear?prefCode=${prefecture.prefCode}`,
        {
          headers: {
            "X-API-KEY": apiKey,
            "Content-Type": "application/json;charset=UTF-8",
          },
        }
      );
      const populationData: PopulationPerYear[] = data.result.data[0].data;
      populationData.map((item: PopulationPerYear) => {
        const obj = Object.assign({}, item);
        return array.push(obj.value);
      });
    } else {
      const data: number[] = chartCacheData[index].data;
      array.push(...data);
    }
    return array;
  };

  const handleCheck = async (
    event: React.ChangeEvent<HTMLInputElement>,
    prefecture: Prefectures
  ): Promise<void> => {
    const prefIndex = chartCacheData.findIndex(
      (element) => element.prefCode === prefecture.prefCode
    );
    const data = await getPrefecturePopulation(prefecture, prefIndex);
    if (data === undefined) return;
    const prefData: ChartData = {
      name: prefecture.prefName,
      prefCode: prefecture.prefCode,
      isActive: event.target.checked,
      data: data,
    };
    if (prefIndex === -1) {
      setChartCacheData([...chartCacheData, prefData]);
    } else {
      setChartCacheData(
        chartCacheData.map((item, index) =>
          index === prefIndex ? prefData : item
        )
      );
    }
  };

  const options = {
    title: {
      text: "",
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
    series: chartData,
    plotOptions: {
      series: {
        pointInterval: 5,
        pointStart: 1960,
      },
    },
  };

  return (
    <div>
      <div
        css={{
          margin: "0px 24px",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>都道府県の総人口遷移図</h2>
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
                prefecture={item}
                onCheck={handleCheck}
              ></CheckBox>
            );
          })}
        </div>
        <div css={{ marginTop: "24px" }}>
          {chartData.length !== 0 && (
            <HighchartsReact
              highcharts={Highcharts}
              options={options}
            ></HighchartsReact>
          )}
          {chartData.length === 0 && (
            <p>*グラフを表示する都道府県にチェックを入れてください</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
