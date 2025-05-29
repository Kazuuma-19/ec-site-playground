import { createFileRoute } from "@tanstack/react-router";
import { IndexPage } from "../../features/index/IndexPage";

export const Route = createFileRoute("/_index/")({
  component: Index,
});

function Index() {
  return <IndexPage />;
}
