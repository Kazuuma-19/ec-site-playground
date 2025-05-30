import { createFileRoute } from "@tanstack/react-router";
import { OrderConfirmPage } from "../../features/order/OrderConfirmPage";

export const Route = createFileRoute("/order/confirm")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderConfirmPage />;
}
