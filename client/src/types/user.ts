interface IuserProfile {
  id: number;
  preferenciaEntrega: string;
  fotoPerfil?: string;
  cidade: string;
  estado: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}
