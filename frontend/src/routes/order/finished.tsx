import { createFileRoute } from "@tanstack/react-router";
import { OrderFinishedPage } from "../../features/order/OrderFinishedPage";

export const Route = createFileRoute("/order/finished")({
  component: RouteComponent,
});

function RouteComponent() {
  return <OrderFinishedPage />;
}
