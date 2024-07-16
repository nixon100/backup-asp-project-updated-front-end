import React from "react";
import "../../App.css";
import "../../css/myntraasp.css";
import { useEffect } from "react";
import { useState } from "react";
import * as XLSX from "xlsx/xlsx.mjs";
// import template from '../component/template.json'

// import template00 from '../component/template00.json'
// import referenceFlipkart from '../component/referencevalueF.json'
// import referenceAmazon from '../component/referenceValueA.json'
import Testing4 from "../myntra/Testing4";
import TemplateM from "../../template/TemplateM.json";
import ReferenceN from "../../reference_value/ReferenceN.json";
import { useNavigate } from "react-router-dom";
// import Home from '../pages/Home'

const Mynmain = () => {
  const [data2, setData2] = useState([]);
  const [dropdown, setDropdown] = useState("volvo");
  const [test111, setTest111] = useState("fd");
  const [zx, setZx] = useState(true);
  const [logout, setLogout] = React.useState(false);
  const Navigate = useNavigate();
  // useEffect(()=>{
  // if(!localStorage.getItem("auth")) Navigate("/login")
  // },[logout])
  useEffect(() => {
    document.body.classList.add("Myntra-asp");
    return () => {
      document.body.classList.remove("main-body");
      document.body.classList.remove("my-body-class");
      document.body.classList.remove("myntra-forward");
      document.body.classList.remove("Flipkart");
      document.body.classList.remove("Amazon-asp");
    };
  }, []);
  const handleFileUpload2 = (e) => {
    if (zx == true) {
      const reader = new FileReader();
      reader.readAsBinaryString(e.target.files[0]);
      // console.log(e.target.files)
      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: "binary" });
        // console.log(workbook)
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        // console.log(parsedData)
        setData2(parsedData);
      };
    }
    setZx(false);
  };
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(data2);
    // console.log(worksheet)
    const workbook = XLSX.utils.book_new();
    // console.log(workbook)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sample-file.xlsx");
  };

  /////////templat download ////////////
  const downloadExcel1 = () => {
    const worksheet = XLSX.utils.json_to_sheet(TemplateM);
    // console.log(worksheet)
    const workbook = XLSX.utils.book_new();
    // console.log(workbook)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sample-file.xlsx");
  };
  /////////templat download ////////////
  const downloadExcel2 = () => {
    const worksheet = XLSX.utils.json_to_sheet(ReferenceN);
    // console.log(worksheet)
    const workbook = XLSX.utils.book_new();
    // console.log(workbook)

    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "sample-file.xlsx");
  };
  ////////////template download////////////////
  // useEffect(()=>{
  //     console.log(data2)
  //   },[data2])
  // useEffect(()=>{
  //   console.log(dropdown)
  // })

  function df(e) {
    const a = e.target.value;
    setDropdown(a);
  }
  // console.log(dropdown)
  // useEffect(()=>{
  //   if(dropdown==="audi"){
  //     alert("use only flipkart file")

  //   }
  // },[dropdown])

  const logoutHandler = (e) => {
    e.preventDefault();
    // localStorage.removeItem("auth");
    // setLogout(true);
    Navigate("/");
  };

  return (
    <div class="background-wrapper">
      <img
        src="https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        className="background-image"
      ></img>
      <button onClick={logoutHandler} className="btn btn-primary text-left">
        <span>&#10094;</span>
      </button>
      <div className="app2">
        <input
          type="file"
          accept=".xlsx, .xls"
          className="dcd"
          onChange={(e) => {
            handleFileUpload2(e); // Call the handleFileUpload2 function here
          }}
        />

        {/* <Home setDropdown={setDropdown}/> */}

        <Testing4 data2={data2} setData2={setData2} dropdown={dropdown} />
      </div>

      <div className="App">
        <span>
          <button id="xyz" onClick={downloadExcel1}>Download Excel Template</button>
        </span>
        <span>
          <button id="xyz" onClick={downloadExcel2}>Download Reference Name</button>
        </span>
        <span>
          <button id="xyz" onClick={downloadExcel}>Download as Excel</button>
        </span>
      </div>

      {/* {data2.length > 0 && (
    <table class="styled-table">
      <thead>
        <tr>
          {Object.keys(data2[0]).map((key, index) => (
            <th key={index}>{key}</th>
          ))}
        </tr>
      </thead>
      <div style={{"width":"320px", "height":"80px", "overflow":"auto"}}>
      <tbody >
        {data2.map((row, rowIndex) => (
          <tr key={row.id || rowIndex}> 
            {Object.values(row).map((value, valueIndex) => (
              <td key={valueIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
      </div>
    </table>
  )} */}
      {data2.length > 0 && (
        <div className="scroll-container">
          <table>
            <thead>
              <tr>
                {Object.keys(data2[0]).map((key, index) => (
                  <th key={index}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data2.map((row, rowIndex) => (
                <tr key={row.id || rowIndex}>
                  {Object.values(row).map((value, valueIndex) => (
                    <td key={valueIndex}>{value}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Mynmain;
