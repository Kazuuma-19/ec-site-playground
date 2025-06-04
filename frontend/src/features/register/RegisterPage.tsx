import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import type { UserRegisterType } from "../../types/userRegisterType";
import { axiosInstance } from "../../lib/axiosInstance";

export function RegisterPage() {
  const [form, setForm] = useState<UserRegisterType>({
    name: "",
    email: "",
    zipcode: "",
    address: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("/user/register", form);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = () => {
    setForm({
      name: "",
      email: "",
      zipcode: "",
      address: "",
      tel: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <Container maxWidth="sm" className="my-12">
      <Paper elevation={3} className="p-8">
        <Typography variant="h5" gutterBottom>
          ユーザ登録
        </Typography>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <Box className="mb-2">
            <label htmlFor="name">名前:</label>
            <TextField
              fullWidth
              id="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />
          </Box>

          <Box className="mb-2">
            <label htmlFor="email">メールアドレス:</label>
            <TextField
              fullWidth
              type="email"
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
          </Box>

          <Box className="mb-2">
            <label htmlFor="zipcode">郵便番号:</label>
            <div className="flex gap-2">
              <Button
                variant="outlined"
                size="small"
                sx={{ whiteSpace: "nowrap" }}
              >
                住所検索
              </Button>

              <TextField
                fullWidth
                id="zipcode"
                placeholder="Zipcode"
                value={form.zipcode}
                onChange={handleChange}
              />
            </div>
          </Box>

          <Box className="mb-2">
            <label htmlFor="address">住所:</label>
            <TextField
              fullWidth
              id="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
            />
          </Box>

          <Box className="mb-2">
            <label htmlFor="tel">電話番号:</label>
            <TextField
              fullWidth
              id="tel"
              placeholder="Tel"
              value={form.tel}
              onChange={handleChange}
            />
          </Box>

          <Box className="mb-4">
            <label htmlFor="password">パスワード:</label>
            <TextField
              fullWidth
              id="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />
          </Box>

          <Box className="mb-4">
            <label htmlFor="confirmPassword">確認用パスワード:</label>
            <TextField
              fullWidth
              id="confirmPassword"
              type="password"
              placeholder="Confirmation Password"
              value={form.confirmPassword}
              onChange={handleChange}
            />
          </Box>

          <Box className="flex gap-4 mt-6">
            <Button type="submit" variant="contained" color="primary">
              登録
            </Button>

            <Button type="reset" variant="outlined" color="primary">
              クリア
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
