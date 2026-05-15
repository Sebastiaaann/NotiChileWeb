import { Button } from "@/components/ui/button";

export default function FeedPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Licitaciones</h1>
      <p className="text-gray-500">Feed de licitaciones — próximamente</p>
      <Button className="mt-4">Cargar</Button>
    </main>
  );
}
