import { createFileRoute } from "@tanstack/react-router";
import { CartIndex } from "../../features/cart/CartIndex";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <CartIndex />;
}
