import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function DetailPage() {
  const { id } = useParams();

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Licitación</h1>
      <p className="text-gray-500">Detalle — ID: {id}</p>
      <Button variant="outline" className="mt-4" onClick={() => window.history.back()}>
        Volver
      </Button>
    </main>
  );
}
