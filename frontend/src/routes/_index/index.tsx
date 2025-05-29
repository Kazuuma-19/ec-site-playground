import { createFileRoute } from "@tanstack/react-router";
import { IndexList } from "@/features/index/IndexList";

export const Route = createFileRoute("/_index/")({
  component: Index,
});

function Index() {
  return <IndexList />;
}
