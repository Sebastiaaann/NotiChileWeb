export interface Licitacion {
  id: string;
  codigo: string;
  nombre: string;
  descripcion: string | null;
  organismo: string;
  rubro: string | null;
  tipo: string | null;
  region: string | null;
  estado: string;
  moneda: string;
  montoEstimado: number | null;
  montoLabel: string;
  fechaPublicacion: string;
  fechaCierre: string | null;
  urlFicha: string;
  createdAt: string;
  notificada: boolean;
}
