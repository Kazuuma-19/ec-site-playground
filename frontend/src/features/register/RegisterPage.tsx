import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../../lib/axiosInstance";
import { searchAddress } from "../../api/searchAddress"; // 住所検索APIを呼び出す関数
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";

type RegisterForm = {
  name: string;
  email: string;
  zipcode: string;
  address: string;
  tel: string;
  password: string;
  confirmPassword: string;
};

type RegisterRequest = RegisterForm & {
  prefecture: string;
  municipalities: string;
};

export function RegisterPage() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<RegisterForm>();

  const navigate = useNavigate();

  const [prefecture, setPrefecture] = useState("");
  const [municipalities, setMunicipalities] = useState("");

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      alert("パスワードが一致しません。");
      return;
    }

    const requestBody = {
      userName: data.name,
      email: data.email,
      password: data.password,
      zipCode: data.zipcode.replace("-", "").trim(),
      prefecture: prefecture, // TODO: 住所APIから分割取得する場合
      municipalities: municipalities,
      address: data.address,
      telephone: data.tel,
    };

    try {
      await axiosInstance.post("/user/register", requestBody);
      navigate({ to: "/login", replace: true });
    } catch (error) {
      console.error(error);
      alert("登録に失敗しました。");
    }
  };

  const handleSearchAddress = async () => {
    const zipcode = getValues("zipcode");
    if (!zipcode) return;

    const address = await searchAddress(zipcode);
    if (address) {
      const [prefecture, municipalities, rest] = address;
      setValue("address", `${prefecture}${municipalities}${rest}`);
      setPrefecture(prefecture);
      setMunicipalities(municipalities);
    } else {
      alert("住所が見つかりませんでした");
    }
  };

  return (
    <Container maxWidth="sm" className="my-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="mb-8 max-w-2xl mx-auto">
          <CardContent>
            <Typography variant="h6" align="center" gutterBottom>
              ユーザ登録
            </Typography>

            <Box className="space-y-4">
              <div>
                <FormLabel>お名前</FormLabel>
                <TextField
                  fullWidth
                  {...register("name", { required: "名前は必須です" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  placeholder="ラクス太郎"
                />
              </div>

              <div>
                <FormLabel>メールアドレス</FormLabel>
                <TextField
                  fullWidth
                  {...register("email", {
                    required: "メールアドレスは必須です",
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  placeholder="sample@rakus.com"
                />
              </div>

              <div className="flex items-center gap-2">
                <FormLabel>郵便番号</FormLabel>
                <TextField
                  {...register("zipcode", { required: "郵便番号は必須です" })}
                  error={!!errors.zipcode}
                  helperText={errors.zipcode?.message}
                  placeholder="123-4567"
                />
                <Button variant="outlined" onClick={handleSearchAddress}>
                  住所検索
                </Button>
              </div>

              <div>
                <FormLabel>住所</FormLabel>
                <TextField
                  fullWidth
                  {...register("address", { required: "住所は必須です" })}
                  error={!!errors.address}
                  helperText={errors.address?.message}
                  placeholder="東京都渋谷区千駄ヶ谷5-27-5"
                />
              </div>

              <div>
                <FormLabel>電話番号</FormLabel>
                <TextField
                  fullWidth
                  {...register("tel", { required: "電話番号は必須です" })}
                  error={!!errors.tel}
                  helperText={errors.tel?.message}
                  placeholder="050-8880-3200"
                />
              </div>

              <div>
                <FormLabel>パスワード</FormLabel>
                <TextField
                  fullWidth
                  type="password"
                  {...register("password", {
                    required: "パスワードは必須です",
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              </div>

              <div>
                <FormLabel>パスワード（確認）</FormLabel>
                <TextField
                  fullWidth
                  type="password"
                  {...register("confirmPassword", {
                    required: "確認用パスワードは必須です",
                  })}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                />
              </div>
            </Box>
          </CardContent>
        </Card>

        <Box textAlign="center">
          <Button variant="contained" color="warning" type="submit">
            この内容で登録する
          </Button>
        </Box>
      </form>
    </Container>
  );
}
