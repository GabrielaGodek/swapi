import { createContext, useMemo, useState, ReactNode } from "react";
import { usePlanets } from "@/utils/usePlanets";
import { useResidents } from "@/utils/useResidents";

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

interface PlanetsContextType {
  planets: Planet[];
  planet: Planet | undefined;
  planetResidents: string[];
  setPlanetName: React.Dispatch<React.SetStateAction<string>>;
}

interface PlanetsContextProviderProps {
  children: ReactNode;
}

export const PlanetsContext = createContext<PlanetsContextType>({
  planets: [],
  planet: undefined,
  planetResidents: [],
  setPlanetName: () => {},
});

export const PlanetsContextProvider: React.FC<PlanetsContextProviderProps> = ({
  children,
}) => {
  const planets = usePlanets(true);
  const [currentPlanetName, setCurrentPlanetName] = useState<string>("");

  const planet: Planet | undefined = useMemo(() => {
    return planets.find(
      (obj) => obj.name.toLowerCase() === currentPlanetName.toLowerCase()
    );
  }, [planets, currentPlanetName]);

  const residents = useResidents(planet);

  const contextValue: PlanetsContextType = {
    planets,
    planet,
    setPlanetName: setCurrentPlanetName,
    planetResidents: residents,
  };

  return (
    <PlanetsContext.Provider value={contextValue}>
      {children}
    </PlanetsContext.Provider>
  );
};
