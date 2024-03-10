import {
  createContext,
  useMemo,
  useState,
  // useCallback,
  // useEffect,
} from "react";
import { usePlanets } from "@/utils/usePlanets";
import { useResidents } from "@/utils/useResidents";

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

  const planet = useMemo(() => {
    return planets.find(
      (obj) => obj.name?.toLowerCase() === currentPlanetName?.toLowerCase()
    );
  }, [planets, currentPlanetName]);
  
  const residents = useResidents(currentPlanetName ? planet : null);

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
