import { ErrorState } from "@/shared/components/ErrorState";

interface FeedErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function FeedError({ message, onRetry }: FeedErrorProps) {
  return (
    <ErrorState
      title="Error al cargar licitaciones"
      message={message ?? "Ocurrió un error al obtener las licitaciones. Intentá de nuevo."}
      onRetry={onRetry}
    />
  );
}
