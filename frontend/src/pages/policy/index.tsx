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

  
  const getData = async () => {
    await axios.get("/policies").then(
      ({data}) => {
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

  useEffect (() => {
    getData();
  },[]);

  return (
    <div className="w-full p-8 text-center md:text-left">
      <Header />
      <Filter termToFilter={termToFilter} setTermToFilter={setTermToFilter} rawData={rawData} setData={setData} />
      <Table isLoading={isLoading} tableData={data} hasError={hasError} />
    </div>
  );
};

export default PolicyPage;
