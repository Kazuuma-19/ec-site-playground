import { createFileRoute } from "@tanstack/react-router";
import { ItemPage } from "../../features/item/ItemPage";

export const Route = createFileRoute("/item/")({
  component: RootComponent,
});

function RootComponent() {
  return <ItemPage />;
}
