import { api } from "../api";
import { IAuthRequest } from "../../types";

export const signIn = async ({ email, senha }: IAuthRequest) => {
  const response = await api.post(`/login/`, { email, senha });
  return response.data;
};
