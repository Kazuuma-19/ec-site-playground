import { Box, Button, Typography } from "@mui/material";
import { CustomLink } from "../CustomLink";

export function NotFoundPage() {
  return (
    <div className="h-screen">
      <Box
        className="h-full flex flex-col items-center justify-center text-center"
        sx={{
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Typography
          variant="h1"
          className="text-[150px] font-bold mb-4"
          sx={{
            background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          className="mb-4 font-medium"
          color="text.primary"
          marginBottom={2}
        >
          ページが見つかりません
        </Typography>

        <Typography
          variant="body1"
          className="max-w-md"
          color="text.secondary"
          marginBottom={2}
        >
          申し訳ありませんが、お探しのページは存在しないか、
          移動または削除された可能性があります。
        </Typography>

        <Box className="flex gap-4">
          <Button
            component={CustomLink}
            to="/item"
            variant="contained"
            className="px-6 py-2"
            sx={{
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
            }}
          >
            ホームに戻る
          </Button>

          <Button
            onClick={() => window.history.back()}
            variant="outlined"
            className="px-6 py-2"
            sx={{
              borderColor: "#2196F3",
              color: "#2196F3",
              "&:hover": {
                borderColor: "#21CBF3",
                background: "rgba(33, 203, 243, 0.04)",
              },
            }}
          >
            前のページに戻る
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default NotFoundPage;
