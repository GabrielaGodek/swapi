import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const Details = () => {
  const { data } = useSelector((state) => state);
  const { planetName } = useParams();
  const planet = data.filter((obj) => obj.name === planetName);

  return (
    <div>
      {planet.map((planet, index) => (
        <div key={index}>
          <h2>Details about {planet.name}</h2>
          <p>Name: {planet.name}</p>
          <p>Diameter: {planet.diameter}</p>
          <p>Population: {planet.population}</p>
          <p>Surface Water: {planet.surface_water}</p>
        </div>
      ))}
    </div>
  );
};
