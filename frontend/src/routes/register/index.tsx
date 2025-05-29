import { createFileRoute } from "@tanstack/react-router";
import { RegisterIndex } from "../../features/register/RegisterIndex";

export const Route = createFileRoute("/register/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterIndex />;
}
