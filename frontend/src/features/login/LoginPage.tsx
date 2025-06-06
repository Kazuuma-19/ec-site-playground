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
import { axiosInstance } from "../../lib/axiosInstance";
import { useNavigate } from "@tanstack/react-router";
import { AxiosError } from "axios";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axiosInstance.post("/user/login", {
        email,
        password,
      });

      navigate({ to: "/" });
    } catch (error) {
      // TODO: 適切なエラーハンドリングにする
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          setError("メールアドレス、またはパスワードが間違っています");
        } else {
          setError("ログイン処理中にエラーが発生しました");
          console.error("Login error:", error);
        }
      }
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
