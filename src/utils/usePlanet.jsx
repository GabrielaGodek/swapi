import { useEffect, useCallback, useMemo, useState } from "react";
import { usePlanets } from "./usePlanets";
export const usePlanet =  ({ planetName }) => {
  const planets = usePlanets();
  const [residents, setResidents] = useState([]);
  const planet = useMemo(() => {
    // console.log(planets)
    return planets.find(
      (obj) => obj.name.toLowerCase() === planetName.toLowerCase()
    );
  }, [planets, planetName]);

  const fetchResidents = useCallback(async () => {
    const _residents = [];

    for (const residentUrl of (planet?.residents || [])) {
      const response = await fetch(residentUrl);
      const residentData = await response.json();
      _residents.push(residentData.name);
    }
    setResidents(_residents);
  }, [planet?.residents]);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents]);
  return { planet, residents };
};
