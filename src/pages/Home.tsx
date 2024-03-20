import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PlanetsContext } from "@/context/PlanetsContext";

import { Header } from "@/components/Header";
import StickyHeadTable from "@/components/ContentTable";
import { NotFound } from "@/components/NotFound";

import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";


export const Home: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigation = (direction: string) => {
    navigate(`/details/${direction}`);
  };

  const { planets } = useContext(PlanetsContext);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (planets.length > 0) {
      setLoading(false);
    }
  }, [planets]);

  if (loading) {
    return (
      <Box sx={{ display: "flex" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (planets.length === 0) {
    return <NotFound />;
  }

  return (
    <>
      <div className="hero">
        <div className="star-wars__fade"></div>
        <section className="star-wars">
          <div className="star-wars__crawl">
            <Header header="swapi" />
            <Typography variant="body2" component={"span"}>
              <p>Explore the captivating worlds of the Star Wars universe!</p>
              <p>
                From the bustling cityscapes of Coruscant to the desert dunes of
                Tatooine, each planet offers a unique adventure.
              </p>
              <p>
                Dive into our table for in-depth details on each planet, from
                climate to inhabitants.
              </p>
              <p>
                Click to unveil more about these fascinating galactic locales.
              </p>
            </Typography>
          </div>
        </section>
        <section className="hero__table">
          <StickyHeadTable data={planets} onRowClick={handleNavigation} />
        </section>
      </div>
    </>
  );
};

