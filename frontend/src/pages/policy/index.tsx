import {useEffect, useState } from "react";
import axios from "../../axiosConfig";
import Header from "./Header";
import Filter from "./Filter";
import Table from "./Table";

import "./index.css";

const PolicyPage = () => {
  const [data, setData] = useState<Policy[]>([]);
  const [hasError, setError] = useState(false);
  const [rawData, setRawData ] = useState<Policy[]>([]);
  const [termToFilter, setTermToFilter] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  
  const restrictedValue = "ACTIVE" || "PENDING";
  
  const getData = async () => {
    await axios.get("/policies").then(
      ({data}) => {
        console.log(isLoading);
        setData(data);      
        setRawData(data);
        setIsLoading(false);
      } 
    ).catch(
      ({err: any}) =>{
        setError(true);
        setIsLoading(false);
      }
    )
  }
  const filteredData = data.filter((element: { status: PolicyStatus; }) => {
    if (element.status.includes(restrictedValue)) 
      return element
  })

  useEffect (() => {
    getData();
    setData(filteredData);
  },[]);

  return (
    <div className="w-full p-8 text-center md:text-left">
      <Header />
      <Filter termToFilter={termToFilter} setTermToFilter={setTermToFilter} rawData={rawData} setData={setData} data={data}/>
      <Table isLoading={isLoading} tableData={data} hasError={hasError} />
    </div>
  );
};

export default PolicyPage;
