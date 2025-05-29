import { AppBar, Toolbar } from "@mui/material";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { CustomLink } from "../components/CustomLink";

export const Route = createRootRoute({
  component: () => (
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
            <CustomLink to="/order-history" underline="hover">
              注文履歴
            </CustomLink>
            <CustomLink to="/login" underline="hover">
              ログイン
            </CustomLink>
            <CustomLink to="/logout" underline="hover">
              ログアウト
            </CustomLink>
          </div>
        </Toolbar>
      </AppBar>

      <Outlet />
    </>
  ),
});
