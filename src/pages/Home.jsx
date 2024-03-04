import { useEffect, useState } from "react";
import { fetchPlanets } from "@/utils/useFetch";
import StickyHeadTable from "@/components/ContentTable";

export const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchDataAndDispatch = async () => {
      try {
        let isLocal = JSON.parse(localStorage.getItem("swapi-planets")) || [];
        if (isLocal.length === 0) {
          const response = await fetchPlanets("https://swapi.info/api/planets");
          setData(response);
        } else {
          setData(isLocal);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataAndDispatch();
  }, []);

  return <>{data && <StickyHeadTable data={data} />}</>;
};
