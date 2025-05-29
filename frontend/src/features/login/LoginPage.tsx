import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { CustomLink } from "../../components/CustomLink";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 仮のエラーチェック
    if (email !== "test@example.com" || password !== "password") {
      setError("メールアドレス、またはパスワードが間違っています");
    } else {
      // 本来はここでログイン処理・ルーティングを行う
      window.location.href = "/item_list_pizza";
    }
  };

  return (
    <Container maxWidth="sm" className="mt-12">
      <Paper elevation={3} className="p-8">
        <Typography variant="h5" gutterBottom>
          ログイン
        </Typography>

        {error && (
          <Typography color="error" variant="body2" className="mb-4">
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <label htmlFor="email">メールアドレス:</label>
            <TextField
              fullWidth
              id="email"
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </Box>
          <Box mb={2}>
            <label htmlFor="password">パスワード:</label>
            <TextField
              id="password"
              fullWidth
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </Box>
          <Button variant="contained" color="primary" type="submit" fullWidth>
            ログイン
          </Button>
        </form>
      </Paper>

      <Box mt={4} textAlign="center">
        <CustomLink to="/register" underline="hover">
          ユーザー登録はこちら
        </CustomLink>
      </Box>
    </Container>
  );
}
