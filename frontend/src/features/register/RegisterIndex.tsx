import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

export function RegisterIndex() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    zipcode: "",
    address: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name) newErrors.name = "名前を入力してください";
    if (!form.email) newErrors.email = "メールアドレスを入力してください";
    if (!form.zipcode) newErrors.zipcode = "郵便番号を入力してください";
    if (!form.address) newErrors.address = "住所を入力してください";
    if (!form.tel) newErrors.tel = "電話番号を入力してください";
    if (!form.password) newErrors.password = "パスワードを入力してください";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "確認用パスワードを入力してください";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "パスワードが一致しません";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // 登録処理をここに記述
      console.log("登録データ:", form);
      window.location.href = "/item_list_pizza";
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
    setErrors({});
  };

  return (
    <Container maxWidth="sm" className="my-12">
      <Paper elevation={3} className="p-8">
        <Typography variant="h5" gutterBottom>
          ユーザ登録
        </Typography>

        <form onSubmit={handleSubmit} onReset={handleReset}>
          <Box mb={2}>
            <label htmlFor="name">名前:</label>
            <TextField
              fullWidth
              id="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
          </Box>

          <Box mb={2}>
            <label htmlFor="email">メールアドレス:</label>
            <TextField
              fullWidth
              id="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Box>

          <Box mb={2}>
            <label htmlFor="zipcode">郵便番号:</label>
            <div className="flex gap-2">
              <Button variant="outlined">住所検索</Button>
              <TextField
                fullWidth
                id="zipcode"
                placeholder="Zipcode"
                value={form.zipcode}
                onChange={handleChange}
                error={!!errors.zipcode}
                helperText={errors.zipcode}
              />
            </div>
          </Box>

          <Box mb={2}>
            <label htmlFor="address">住所:</label>
            <TextField
              fullWidth
              id="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Box>

          <Box mb={2}>
            <label htmlFor="tel">電話番号:</label>
            <TextField
              fullWidth
              id="tel"
              placeholder="Tel"
              value={form.tel}
              onChange={handleChange}
              error={!!errors.tel}
              helperText={errors.tel}
            />
          </Box>

          <Box mb={2}>
            <label htmlFor="password">パスワード:</label>
            <TextField
              fullWidth
              id="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Box>

          <Box mb={2}>
            <label htmlFor="confirmPassword">確認用パスワード:</label>
            <TextField
              fullWidth
              id="confirmPassword"
              type="password"
              placeholder="Confirmation Password"
              value={form.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
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
