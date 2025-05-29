import { createFileRoute } from "@tanstack/react-router";
import { OrderHistoryIndex } from "../../features/order-history/OrderHistoryIndex";

export const Route = createFileRoute("/order-history/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderHistoryIndex />;
}
