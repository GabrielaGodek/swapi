import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "@/components/Header";
import StickyHeadTable from "@/components/ContentTable";
import { fetchPlanets } from "@/utils/useFetch";

import Typography from "@mui/material/Typography";

export const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const handleNavigation = (direction) => {
    navigate(`/details/${direction}`);
  };

  useEffect(() => {
    const fetchDataAndDispatch = async () => {
      try {
        let isLocal = JSON.parse(localStorage.getItem("swapi-planets")) || [];
        if (isLocal.length === 0) {
          const response = await fetchPlanets("https://swapi.info/api/planes");
          setData(response);
        } else {
          setData(isLocal);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      }
    };
    fetchDataAndDispatch();
  }, []);

  return (
    <>
      {error ? (
        <Typography variant="body2" color="error" component={"span"}>
          {error}
        </Typography>
      ) : data ? (
        <div className="hero">
          <div className="star-wars__fade"></div>
          <section className="star-wars">
            <div className="star-wars__crawl">
              <Header header="swapi" />
              <Typography variant="body2" component={"span"}>
                <p>Explore the captivating worlds of the Star Wars universe!</p>
                <p>
                  From the bustling cityscapes of Coruscant to the desert dunes
                  of Tatooine, each planet offers a unique adventure.
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
            <StickyHeadTable data={data} navigateTo={handleNavigation} />
          </section>
        </div>
      ) : (
        <Typography variant="body2" component={"span"}>
          Loading...
        </Typography>
      )}
    </>
  );
};
