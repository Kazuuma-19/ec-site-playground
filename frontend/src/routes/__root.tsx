import { AppBar, Toolbar, Link } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { CustomLink } from "../components/CustomLink";
import { axiosInstance } from "../lib/axiosInstance";
import { useNavigate } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        await axiosInstance.post("/user/logout");
        navigate({ to: "/login" });
      } catch (error) {
        console.error("ログアウトに失敗しました", error);
      }
    };

    return (
      <>
        <AppBar position="static" color="default">
          <Toolbar sx={{ justifyContent: "space-between" }}>
            <CustomLink to="/">
              <img src="/header_logo.png" alt="logo" height="35" />
            </CustomLink>

            <div className="flex items-center gap-4">
              <CustomLink to="/cart" underline="hover" className="font-bold">
                ショッピングカート
              </CustomLink>
              <CustomLink to="/order/history" underline="hover">
                注文履歴
              </CustomLink>
              <CustomLink to="/login" underline="hover">
                ログイン
              </CustomLink>
              <Link component="button" underline="hover" onClick={handleLogout}>
                ログアウト
              </Link>
            </div>
          </Toolbar>
        </AppBar>

        <Outlet />
      </>
    );
  },
});
