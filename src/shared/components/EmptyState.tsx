import { Inbox } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface EmptyStateProps {
  title?: string;
  message: string;
}

export function EmptyState({ title = "Sin resultados", message }: EmptyStateProps) {
  return (
    <Card className="mx-auto max-w-md mt-8">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Inbox className="h-5 w-5 text-muted-foreground" />
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
