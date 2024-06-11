import { Credit } from "@/components/Credit";
import { RouteMap } from "@/components/RouteMap";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <RouteMap />
      <Credit />
    </main>
  );
}
