import { useState, useCallback, useEffect } from "react";

interface Resident {
  name: string;
}
interface Planet {
  residents: string[];
}

export const useResidents = (planet: Planet) => {
  console.log(planet);
  const [residents, setResidents] = useState<string[]>([]);

  const fetchResidents = useCallback(async () => {
    const _residents: string[] = [];

    if (planet !== null) {
      for (const residentUrl of planet.residents) {
        const response = await fetch(residentUrl);
        const residentData: Resident = await response.json();
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
