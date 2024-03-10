import {
  createContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from "react";
import { usePlanets } from "@/utils/usePlanets";

export const PlanetsContext = createContext({
  planets: [],
  _planetName: "",
  planet: {},
  planetResidents: [],
  setPlanetName: () => {},
});

export const PlanetsContextProvider = ({ children }) => {
  const planets = usePlanets(true);
  const [currentPlanetName, setCurrentPlanetName] = useState("");
  const [residents, setResidents] = useState("");

  const planet = useMemo(() => {
    return planets.find(
      (obj) => obj.name?.toLowerCase() === currentPlanetName?.toLowerCase()
    );
  }, [planets, currentPlanetName]);

  const fetchResidents = useCallback(async () => {
    const _residents = [];
    for (const residentUrl of planet?.residents || []) {
      const response = await fetch(residentUrl);
      const residentData = await response.json();
      _residents.push(residentData.name);
    }
    setResidents(_residents);
  }, [planet]);

  useEffect(() => {
    fetchResidents();
  }, [fetchResidents, currentPlanetName]);

  return (
    <PlanetsContext.Provider
      value={{
        planets,
        _planetName: currentPlanetName,
        planet,
        setPlanetName: setCurrentPlanetName,
        planetResidents: residents,
      }}
    >
      {children}
    </PlanetsContext.Provider>
  );
};
