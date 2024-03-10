import { useState, useCallback, useEffect } from "react";
export const useResidents = (planet) => {
  const [residents, setResidents] = useState([]);
  const fetchResidents = useCallback(async () => {
    const _residents = [];

    if(planet !== null){
        for (const residentUrl of planet.residents || []) {
          const response = await fetch(residentUrl);
          const residentData = await response.json();
          _residents.push(residentData.name);
        }
        setResidents(_residents);
    }
  }, [planet]);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);

  return residents;
};
