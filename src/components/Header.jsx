import Typography from "@mui/material/Typography";
export const Header = ({ header }) => {
  return (
    <header>
      <Typography variant="h1" component="h2" xs={{ my: 2 }}>
        {header}
      </Typography>
    </header>
  );
};
