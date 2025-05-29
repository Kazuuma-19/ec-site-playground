import { createFileRoute } from "@tanstack/react-router";
import { ItemDetailPage } from "../../features/index/ItemDetailPage";

export const Route = createFileRoute("/_index/$itemId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ItemDetailPage />;
}
