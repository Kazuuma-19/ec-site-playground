import { createFileRoute } from "@tanstack/react-router";
import { OrderHistoryPage } from "../../features/order-history/OrderHistoryPage";

export const Route = createFileRoute("/order-history/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderHistoryPage />;
}
