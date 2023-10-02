import { IPet } from "../../types";
import { api } from "../api";

export const getPets = async () => {
  const response = await api.get(`/pets/`);
  return response.data;
};

export const getCachorros = async () => {
  const response = await api.get(`/pets/?especie=Cachorro`);
  return response.data;
};

export const getGatos = async () => {
  const response = await api.get(`/pets/?especie=Gato`);
  return response.data;
};

export const getPetsById = async (id: number) => {
  const response = await api.get(`/pet/${id}`);
  return response.data;
};

export const createPet = async (pet: IPet) => {
  const response = await api.post(`/pet/`, pet);
  return response.data;
};
export const getPetByUser = async (userId: number) => {
  const response = await api.get(`/pets/${userId}`);
  return response.data;
};
