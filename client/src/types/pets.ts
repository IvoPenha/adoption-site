export interface IPetResponse {
  id: number;
  nome: string;
  idade: number;
  sexo: "m" | "f" | null | undefined;
  especie: string;
  raca: string;
  porte: string;
  descricao: string;
  foto: string;
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
