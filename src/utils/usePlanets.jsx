import { useState, useEffect, useCallback } from "react";

export const usePlanets = (bypassCache = false) => {
  const [data, setData] = useState([]);
  const fetchData = useCallback(async () => {
    try {
      let isLocal = JSON.parse(localStorage.getItem("swapi-planets")) || [];
      if (bypassCache || isLocal.length === 0) {
        const response = await fetch("https://swapi.info/api/planets");
        const res = await response.json();
        setData(res);
        localStorage.setItem("swapi-planets", JSON.stringify(res));
      } else {
        setData(isLocal);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [bypassCache]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  return data;
};
