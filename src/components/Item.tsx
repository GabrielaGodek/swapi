import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";


interface ItemProps {
  title: string;
  child: React.ReactNode;
}

export const Item: React.FC<ItemProps> = ({ title, child }) => {
  return (
    <Card variant="outlined" style={{ minWidth: "250px", margin: "10px" }}>
      <CardHeader title={title} />
      <CardContent>
        <Typography variant="body1" component={"span"}>
          {child}
        </Typography>
      </CardContent>
    </Card>
  );
};
