import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Header } from "@/components/Header";
import { fetchPlanets } from "@/utils/useFetch";
import { Item } from "@/components/Item";

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
    <section className="details">
      {planets.map((planet, index) => (
        <Box sx={{ flexGrow: 1 }} key={index}>
          <Header header={planet.name} />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
              <Item title="Diameter" child={planet.diameter} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item title="Population" child={planet.population} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item title="Climate" child={planet.climate} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item title="Terrain" child={planet.terrain} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item title="Gravity" child={planet.gravity} />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Item title="Orbital Period" child={planet.orbital_period} />
            </Grid>
            <Grid item xs={12}>
              <Item
                title="Residents"
                child={
                  planet.residents.length > 0 ? (
                    <>
                      <ul>
                        {planet.residents.map((resident, index) => (
                          <li key={index}>{resident}, </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    "No resident found"
                  )
                }
              ></Item>
            </Grid>
          </Grid>
        </Box>
      ))}
    </section>
  );
};
