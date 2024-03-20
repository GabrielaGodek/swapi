import Typography from "@mui/material/Typography";

interface HeaderProps {
  header: string;
}

export const Header: React.FC<HeaderProps> = ({ header }) => {
  return (
    <header>
      <Typography variant="h1" component="h2" sx={{ my: 2 }}>
        {header}
      </Typography>
    </header>
  );
};
