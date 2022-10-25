import { useEffect, useState } from "react";

const calculateNumPages = (data: any[], pageSize: number) => {
  return Math.ceil(data.length / pageSize);
};
const sliceData = (data: any[], page: number, pageSize: number) => {
  return data.slice((page - 1) * pageSize, page * pageSize);
};

const useTable = (data: any[], currentPageNumber: number, pageSize: number) => {
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPageData, setCurrentPageData] = useState<any[]>([]);
  const [initialPage, setInitialPages] = useState<number>(0);
  const [finalPage, setFinalPages] = useState<number>(0);

  useEffect(() => {
    const currentPageData = [...sliceData(data, currentPageNumber, pageSize)];
    const currentPageSize = currentPageData.length;
    setTotalPages(calculateNumPages(data, pageSize));
    setCurrentPageData(currentPageData);
    setInitialPages(pageSize * (currentPageNumber - 1) + 1);
    setFinalPages(pageSize * (currentPageNumber - 1) + currentPageSize);
  }, [data, currentPageNumber, pageSize]);

  return { currentPageData, totalPages, initialPage, finalPage };
};

export default useTable;
