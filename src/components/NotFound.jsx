import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
export const NotFound = () => {
  console.log('not found')
  const navigate = useNavigate();
  return (
    <div className="notFound">
      <Typography variant="h1" component="h2">404</Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for could not be found.
      </Typography>
      <Button variant="contained" color="error" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </div>
  );
};
