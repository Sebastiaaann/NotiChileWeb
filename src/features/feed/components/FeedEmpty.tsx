import { EmptyState } from "@/shared/components/EmptyState";

interface FeedEmptyProps {
  message?: string;
}

export function FeedEmpty({ message }: FeedEmptyProps) {
  return (
    <EmptyState
      title="Sin resultados"
      message={message ?? "No se encontraron licitaciones con los filtros actuales"}
    />
  );
}
