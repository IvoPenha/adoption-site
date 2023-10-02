import { ISignUpRequest } from "../../types";
import { api } from "../api";

export const signUp = async ({
  nome,
  email,
  senha,
  nascimento,
  telefone,
}: ISignUpRequest) => {
  const response = await api.post(`/signup/`, {
    nome,
    email,
    senha,
    nascimento,
    telefone,
  });
  return response.data;
};
