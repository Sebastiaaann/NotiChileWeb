import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatMonto } from "@/shared/lib";
import type { Licitacion } from "@/core/entities";
import { Loader2 } from "lucide-react";

interface FeedTableProps {
  items: Licitacion[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export function FeedTable({ items, hasNextPage, isFetchingNextPage, onLoadMore }: FeedTableProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Organismo</TableHead>
            <TableHead>Rubro</TableHead>
            <TableHead>Región</TableHead>
            <TableHead className="text-right">Monto</TableHead>
            <TableHead>Estado</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-mono text-xs">{item.codigo}</TableCell>
              <TableCell>
                <Link
                  to={`/licitacion/${item.id}`}
                  className="text-primary hover:underline font-medium"
                >
                  {item.nombre}
                </Link>
              </TableCell>
              <TableCell className="text-sm">{item.organismo}</TableCell>
              <TableCell>
                {item.rubro && <Badge variant="outline">{item.rubro}</Badge>}
              </TableCell>
              <TableCell className="text-sm">{item.region}</TableCell>
              <TableCell className="text-right font-mono text-sm">
                {formatMonto(item.montoEstimado)}
              </TableCell>
              <TableCell>
                <Badge variant={item.estado === "Publicada" ? "default" : "secondary"}>
                  {item.estado}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {hasNextPage && (
        <div className="flex justify-center py-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Cargando...
              </>
            ) : (
              "Cargar más"
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
