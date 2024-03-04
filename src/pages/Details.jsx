import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { fetchPlanets } from "@/utils/useFetch";

export const Details = () => {
  const { planetName } = useParams();
  const [data, setData] = useState([]);
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
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

    fetchData();
  }, []);

  useEffect(() => {
    const filteredPlanets = data.filter((obj) => obj.name === planetName);
    setPlanets(filteredPlanets);
  }, [data, planetName]);

  useEffect(() => {
    const fetchResidents = async () => {
      const updatedPlanets = [];

      for (const planet of planets) {
        const updatedPlanet = { ...planet };
        const residents = [];

        for (const residentUrl of planet.residents) {
          const response = await fetch(residentUrl);
          const residentData = await response.json();
          residents.push(residentData.name);
        }

        updatedPlanet.residents = residents;
        updatedPlanets.push(updatedPlanet);
      }

      setPlanets(updatedPlanets);
    };

    if (planets.length > 0) {
      fetchResidents();
    }
  }, [planets]);

  return (
    <section>
      {planets.map((planet, index) => (
        <Box sx={{ flexGrow: 1 }} key={index}>
          <Typography variant="h1" component="h2">
            {planet.name}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Typography variant="body1">
                Diameter: {planet.diameter}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Population: {planet.population}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Climate: {planet.climate}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Terrain: {planet.terrain}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">Gravity: {planet.gravity}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                Orbital Period: {planet.orbital_period}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="body1">
                {planet.residents > 0 ? (
                  <>
                    <div>Residents:</div>
                    {planet.residents.map((resident, index) => (
                      <div key={index}>{resident}</div>
                    ))}
                  </>
                ) : (
                  "No resident found"
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      ))}
    </section>
  );
};
