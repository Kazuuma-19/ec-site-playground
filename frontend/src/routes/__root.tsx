import { createRootRoute, Outlet, useMatches } from "@tanstack/react-router";
import Header from "../components/layout/Header";
import NotFoundPage from "../components/layout/NotFoundPage";

export const Route = createRootRoute({
  component: () => {
    const matches = useMatches();
    // __root__しかマッチしない場合は404ページを表示
    const is404 = matches.length <= 1;

    return (
      <>
        {!is404 && <Header />}
        <Outlet />
      </>
    );
  },
  notFoundComponent: () => <NotFoundPage />,
});
