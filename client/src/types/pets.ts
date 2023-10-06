export interface IPetResponse {
  id: number;
  nome: string;
  idade: number;
  sexo: "m" | "f" | null | undefined;
  especie: string;
  raca: string;
  porte: string;
  descricao: string;
  fotos: string[];
  user: {
    id: number;
    nome: string;
    email: string;
    telefone: string;
  };
}

export interface IPet {
  nome: string;
  idade: number;
  sexo: "m" | "f" | null | undefined;
  especie: string;
  raca: string;
  porte: string;
  descricao: string;
  foto: string;
}
