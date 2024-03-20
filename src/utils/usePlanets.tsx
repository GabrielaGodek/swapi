import { useState, useEffect, useCallback } from "react";

interface Planet {
  name: string;
  diameter: string;
  population: string;
  climate: string;
  terrain: string;
  gravity: string;
  orbital_period: string;
  planetResidents: string[];
}

export const usePlanets = (bypassCache = false): Planet[] => {
  const [data, setData] = useState<Planet[]>([]);

  const fetchData = useCallback(async () => {
    try {
      const isLocal: Planet[] = JSON.parse(localStorage.getItem("swapi-planets") || "[]");
      if (bypassCache || isLocal.length === 0) {
        const response = await fetch("https://swapi.info/api/planets");
        const res: Planet[] = await response.json();
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
