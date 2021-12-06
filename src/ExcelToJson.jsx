import React, { useState } from "react";
import "./styles.css";
import * as XLSX from "xlsx";

var result = [];
var data = [];
class ExcelToJson extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      file: ""
    };
  }

  handleClick(e) {
    this.refs.fileUploader.click();
  }

  filePathset(e) {
    e.stopPropagation();
    e.preventDefault();
    var file = e.target.files[0];
    console.log(file);
    this.setState({ file });

    console.log(this.state.file);
  }

  //reading the csv/xls file
  readFile() {
    var f = this.state.file;
    var name = f.name;
    const reader = new FileReader();
    reader.onload = (evt) => {
      // evt = on_file_select event
      //Parse data
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      // Getting the  first worksheet
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      // Convert array of arrays
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      //Updating the  state
      console.log("Data>>>" + data); // shows that excel data is read
      console.log(this.convertToJson(data));
      this.customizeData(result); // shows data in json format
    };
    reader.readAsBinaryString(f);
  }
  // converting the csv file to JSON objects array
  convertToJson(csv) {
    var lines = csv.split("\n");

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var obj = {};
      var currentline = lines[i].split(",");

      for (var j = 0; j < headers.length; j++) {
        obj[headers[j]] = currentline[j];
      }
      if (obj["Price"] != null) {
        result.push(obj);
      }
    }

    //returning the  result; // it's JavaScript object
    return JSON.stringify(result); //JSON
  }

  customizeData(result) {
    var len = result.length;
    var i = 0;
    while (i < len) {
      if (result[i].Type == "Buy") {
        var x = { Date: "", BuyPrice: "" };
        x.Date = i;
        x.BuyPrice = result[i].Price;
        data.push(x);
      } else {
        var x = { Date: "", SellPrice: "" };
        x.Date = i - 1;
        x.SellPrice = result[i].Price;
        data.push(x);
      }
      i++;
    }
  }

  //rendering the button to upload the csv file
  render() {
    return (
      <div>
        <input
          class="btn"
          type="file"
          id="file"
          ref="fileUploader"
          onChange={this.filePathset.bind(this)}
        ></input>
        <button
          class="btn"
          onClick={() => {
            this.readFile();
          }}
        >
          Upload File
        </button>
      </div>
    );
  }
}
export default ExcelToJson;
export { data };
