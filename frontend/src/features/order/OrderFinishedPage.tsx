import { Button, Typography } from "@mui/material";
import { useNavigate } from "@tanstack/react-router";

export function OrderFinishedPage() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate({
      to: "/",
      replace: true, // 戻るボタンで戻れないようにする
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto text-center bg-white p-8 rounded shadow">
        <Typography variant="h5" gutterBottom>
          決済が完了しました！
        </Typography>
        <Typography variant="body1" className="mt-4">
          この度はご注文ありがとうございます。
        </Typography>
        <Typography variant="body1">
          お支払い先は、お送りしたメールに記載してありますのでご確認ください。
        </Typography>
        <Typography variant="body1">
          メールが届かない場合は「注文履歴」からご確認ください。
        </Typography>

        <div className="mt-8 flex justify-center">
          <Button
            variant="contained"
            color="warning"
            onClick={handleGoHome}
            className="w-full max-w-xs"
          >
            トップ画面を表示する
          </Button>
        </div>
      </div>
    </div>
  );
}
