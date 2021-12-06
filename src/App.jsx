import "./styles.css";
import React from "react";
import { result } from "./ExcelToJson";
import { render } from "react-dom";
import ExcelToJson from "./ExcelToJson";
import Chart from "./Chart";

const rootElement = document.getElementById("root");

//function to revoke after clicking "Try Other dataset"
function handleClick() {
  render(
    <div>
      <ExcelToJson />
      <Chart />
    </div>,
    rootElement
  );
}

export default function App() {
  return (
    <div class="App">
      <ExcelToJson />
      <button class="btn" class="seeChart" onClick={handleClick}>
        See the chart
      </button>
    </div>
  );
}
