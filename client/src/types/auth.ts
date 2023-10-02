export interface ISignUpRequest {
  nome: string;
  email: string;
  senha: string;
  nascimento: Date;
  telefone: string;
}

export interface IAuthRequest {
  email: string;
  senha: string;
}
