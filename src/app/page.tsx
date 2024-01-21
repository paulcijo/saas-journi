import App from "@/components/App";
import JourniApp from "@/components/JourniApp";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <JourniApp />
    </main>
  );
}
