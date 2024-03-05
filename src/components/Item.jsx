import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
export const Item = ({ title, child }) => {
  return (
    <Card
      variant="outlined"
      style={{ minWidth: "250px", margin: "10px" }}
    >
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body1">{child}</Typography>
      </CardContent>
    </Card>
  );
};
