import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

const pizzaItems = Array.from({ length: 9 }).map((_, i) => ({
  id: i + 1,
  name: "じゃがバターベーコン",
  priceM: "1,380円(税抜)",
  priceL: "2,380円(税抜)",
  image: `/${i + 1}.jpg`,
}));

export function IndexPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search logic
  };

  return (
    <>
      <Container sx={{ my: 4 }}>
        <Paper sx={{ p: 2, maxWidth: 600, mx: "auto", mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            商品を検索する
          </Typography>

          <form onSubmit={handleSearch} style={{ display: "flex", gap: 8 }}>
            <TextField
              fullWidth
              label="商品名"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button type="submit" variant="contained">
              検索
            </Button>
            <Button
              type="reset"
              variant="outlined"
              onClick={() => setSearchTerm("")}
            >
              クリア
            </Button>
          </form>
        </Paper>

        <Grid container spacing={2} justifyContent="center">
          {pizzaItems.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <Card>
                <Link href="/item_detail.html">
                  <CardMedia
                    component="img"
                    image={item.image}
                    alt={item.name}
                    sx={{ height: 200, objectFit: "cover" }}
                  />
                </Link>
                <CardContent>
                  <Typography variant="subtitle1" component="div">
                    <Link href="/item_detail.html" underline="hover">
                      {item.name}
                    </Link>
                  </Typography>
                  <Typography variant="body2">М: {item.priceM}</Typography>
                  <Typography variant="body2">Ｌ: {item.priceL}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
