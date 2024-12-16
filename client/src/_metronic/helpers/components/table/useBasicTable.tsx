import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function useBasicTable(endpoint: string, defaultFilter?: object) {
  const baseUrl = `${import.meta.env.VITE_API_URL}${endpoint}`;
  const [isLoading, setIsLoading] = useState(false);

  const [dataList, setDataList] = useState([]);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(0);
  const [page, _setPage] = useState(1);
  const [filters, _setFilters] = useState<any>({})
  const [itemsPerPage, _setItemsPerPage] = useState(10);

  const fetchData = useCallback(async () => {
    if (page < 0) return;
    setIsLoading(true);
    try {
      const params = {
        page,
        itemsPerPage,
        filters: {
          ...filters,
          ...defaultFilter
        }
      };
      const query = await axios.post(`${baseUrl}/table`, { ...params });
      // console.log(isMounted)
      // if (!isMounted.current) {
      //   setIsLoading(false);
      //   return;
      // }
      const response = query.data;
      if(response.pages < page){
        setPage(response.pages || 1)
      }
      setPages(response.pages);
      setDataList(response.rows);
      setTotal(response.count);
 
      setIsLoading(false);
    } catch (error) {
      console.log("Error", error);
      setIsLoading(false);
    }
  }, [itemsPerPage, page, filters]);

  const setItemsPerPage = (items: number) => {

    _setItemsPerPage(items);
  };
  const setPage = (page: number) => {
 
    _setPage(page);
  };
  const setFilters = (flt: object) => {

    _setFilters({ ...filters, ...flt });
  };
  useEffect(() => {
    fetchData()
  }, [itemsPerPage, page, filters])


  return {
    helpers: {
      filters,
      setFilters,

      isLoading,
      fetchData,
      pages,
      page,
      setPage,
      itemsPerPage,
      setItemsPerPage,
      total,
    },
    dataList,
  };
}

export { useBasicTable };
