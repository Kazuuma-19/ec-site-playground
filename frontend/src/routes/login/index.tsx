import { createFileRoute } from "@tanstack/react-router";
import { LoginIndex } from "../../features/login/LoginIndex";

export const Route = createFileRoute("/login/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <LoginIndex />;
}
