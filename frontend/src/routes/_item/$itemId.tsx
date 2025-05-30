import { ItemDetailPage } from "@/features/item/ItemDetailPage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_item/$itemId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ItemDetailPage />;
}
