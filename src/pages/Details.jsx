import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Item } from "@/components/Item";
import { NotFound } from "@/components/NotFound";
import { PlanetsContext } from "@/context/PlanetsContext";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export const Details = () => {
  const { planetName } = useParams();
  const { planet, setPlanetName, planetResidents } = useContext(PlanetsContext);
  useEffect(() => {
    setPlanetName(planetName);
  }, [planetName, setPlanetName]);
  return (
    <>
      {planet ? (
        <section className="details">
          <Box sx={{ flexGrow: 1 }}>
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
                    planetResidents.length > 0 ? (
                      <>
                        <ul>
                          {planetResidents.map((resident, index) => (
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
        </section>
      ) : (
        <NotFound />
      )}
    </>
  );
};
