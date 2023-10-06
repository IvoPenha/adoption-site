import { Response } from "express";
import { PrismaClient, Pet } from "@prisma/client";
import { BaseResponse } from "../../domain/response/base-response";
import { BaseRequest, BaseRequestParams, BaseRequestQuery } from "../../domain";

const prisma = new PrismaClient();

interface PetRequest extends Omit<Pet, "id"> {
  id?: number | null; // tornando id nulo (nullable)
}

export const createPet = async (
  req: {
    body: PetRequest;
  },
  res: BaseResponse<PetRequest>
) => {
  try {
    console.log(req.body);
    const { id, ...rest } = req.body;
    const pet = await prisma.pet.create({
      data: {
        ...rest,
      },
    });
    res.status(200).json({
      message: "Pet cadastrado com sucesso",
      response: {
        id: pet.id,
        nome: pet.nome,
        raca: pet.raca,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante o cadastro",
      response: { error: error.message },
    });
  }
};

export const getAllPets = async (
  req: BaseRequestQuery<{
    page?: string;
    userId?: string | null;
    especie?: string | null;
    tamanho?: string | null;
  }>,
  res: BaseResponse<PetRequest>
) => {
  try {
    const {
      page = 1,
      userId = null,
      especie = null,
      tamanho = null,
    } = req.query;
    const pageNumber = +page || 1;

    const whereClause: {
      userId?: number;
      especie?: string;
      porte?: string;
    } = {
      userId: userId !== null ? parseInt(userId) : undefined,
      especie: especie !== null ? especie : undefined,
      porte: tamanho !== null ? tamanho : undefined,
    };

    // Remover entradas nulas ou indefinidas do objeto whereClause
    const filteredWhereClause = Object.fromEntries(
      Object.entries(whereClause).filter(
        ([_, v]) => v !== null && v !== undefined
      )
    );

    const pets = await prisma.pet.findMany({
      where: filteredWhereClause,
      skip: (pageNumber - 1) * 10,
      take: 10,
      select: {
        fotos: true,
        id: true,
        nome: true,
        ativo: true,
        especie: true,
        porte: true,
        sexo: true,
        user: {
          select: {
            nome: true,
          },
        },
      },
    });

    res.status(200).json({
      message: "Pets encontrados com sucesso",
      response: pets,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: error.message },
    });
  }
};

export const getAllPetsByUser = async (
  req: BaseRequestParams<{ userId: number }>,
  res: BaseResponse<PetRequest>
) => {
  try {
    const { userId } = req.params;
    const pets = await prisma.pet.findMany({
      where: {
        userId: +userId,
      },
    });

    res.status(200).json({
      message: "Pets encontrados com sucesso",
      response: pets,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: error.message },
    });
  }
};

export const getPetById = async (
  req: BaseRequestParams<{ petId: number }>,
  res: BaseResponse<PetRequest>
) => {
  try {
    const { petId } = req.params;
    const pet = await prisma.pet.findFirst({
      where: {
        id: +petId,
      },
      select: {
        id: true,
        nome: true,
        raca: true,
        especie: true,
        porte: true,
        sexo: true,
        idade: true,
        descricao: true,
        userId: true,
        fotos: true,
        user: {
          select: {
            id: true,
            nome: true,
            email: true,
            telefone: true,
          },
        },
      },
    });
    res.status(200).json({
      message: "Pet encontrado com sucesso",
      response: pet,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: error.message },
    });
  }
};

export const updatePet = async (
  req: BaseRequest<PetRequest, { petId: number }>,
  res: BaseResponse<PetRequest>
) => {
  try {
    const { petId } = req.params;
    const { ...rest } = req.body;
    const pet = await prisma.pet.update({
      where: {
        id: +petId,
      },
      data: {
        ...rest,
      },
    });
    res.status(200).json({
      message: "Pet atualizado com sucesso",
      response: pet,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a atualização",
      response: { error: error.message },
    });
  }
};

export const deletePet = async (
  req: BaseRequestParams<{ petId: number }>,
  res: BaseResponse<PetRequest>
) => {
  try {
    const { petId } = req.params;
    const pet = await prisma.pet.delete({
      where: {
        id: +petId,
      },
    });
    res.status(200).json({
      message: "Pet deletado com sucesso",
      response: pet,
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a deleção",
      response: { error: error.message },
    });
  }
};
