import "./styles.css";
import React from "react";
import { data } from "./ExcelToJson";
//importing the essentials from the rechart library
import {
  AreaChart,
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  Label
} from "recharts";
//function to refresh the page to take fresh dataset as input

console.log(data);
function refresh() {
  return location.reload();
}

//chart function to show the chart

function Chart() {
  return (
    <div className="chart">
      <button class="btn" onClick={refresh}>
        Try other dataset
      </button>
      <ResponsiveContainer width="100%" height={500}>
        <AreaChart
          width={600}
          height={2500}
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 20,
            bottom: 20
          }}
        >
          <defs>
            <linearGradient id="colorBuy" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="green" stopOpacity={0.8} />
              <stop offset="95%" stopColor="green" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSell" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="red" stopOpacity={0.8} />
              <stop offset="95%" stopColor="red" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" horizontal="" vertical="" />

          <XAxis
            dataKey="Date"
            tickCount={10}
            label={{
              value: "DayCount",
              position: "bottom",
              offset: 0,
              stroke: "#34495E"
            }}
            type="number"
            domain={[0, data.length - 3]}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            yAxisId="left"
            domain={[0, 100]}
            tickLine={false}
            mirror
          ></YAxis>
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            domain={[0, 100]}
            tickLine={false}
            mirror
          />

          <legend />
          <Tooltip />

          <Area
            type="step"
            dataKey="BuyPrice"
            strokeWidth={2}
            yAxisId="left"
            stroke="green"
            fillOpacity={1}
            fill="url(#colorBuy)"
          />
          <Area
            type="step"
            dataKey="SellPrice"
            stroke="red"
            yAxisId="right"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorSell)"
          />
          <ReferenceLine
            x={77}
            stroke="blue"
            yAxisId="left"
            label="ReferenceLine"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
