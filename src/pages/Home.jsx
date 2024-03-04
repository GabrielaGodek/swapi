// import { useNavigate } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "@/stores/actions";
import StickyHeadTable from "@/components/ContentTable";

export const Home = () => {
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state);

//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://swapi.info/api/planets")
      .then((response) => response.json())
      .then((data) => {
        dispatch(setData(data));
        // console.log(data);
        // setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // setError(error);
        // setLoading(false);
      });
  }, [dispatch]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return <>{<StickyHeadTable data={data} />}</>;
};
