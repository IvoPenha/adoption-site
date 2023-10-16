import { PrismaClient } from "@prisma/client";
import { removerPropriedade } from '../../core';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createPet = async (
  req: Request,
  res: Response
) => {
  try {
    const request = req.body;
    const petData = {
      ...request,
      id: request.id !== null ? request.id : undefined,
    };
    removerPropriedade(petData as unknown as Record<string, unknown>, "id");
    const pet = await prisma.pet.create({
      data: petData,
    });
    res.status(200).json({
      message: "Pet cadastrado com sucesso",
      response: {
        id: pet.id,
        nome: pet.nome,
        raca: pet.raca,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante o cadastro",
      response: { error: (error as Error).message },
    });
  }
};

export const getAllPets = async (
  req: Request,
  res: Response
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
      userId: userId !== null ? +userId as number : undefined,
      especie: especie !== null ? especie as string : undefined,
      porte: tamanho !== null ? tamanho as string : undefined,
    };

    // Remover entradas nulas ou indefinidas do objeto whereClause
    const filteredWhereClause = Object.fromEntries(
      Object.entries(whereClause).filter(([, value]) => value !== null && value !== undefined)
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
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: (error as Error).message },
    });
  }
};

export const getAllPetsByUser = async (
  req: Request,
  res: Response
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
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",

      response: { error: (error as Error).message },
    });
  }
};

export const getPetById = async (
  req: Request,
  res: Response
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
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",

      response: { error: (error as Error).message },
    });
  }
};

export const updatePet = async (
  req: Request,
  res: Response
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
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a atualização",

      response: { error: (error as Error).message },
    });
  }
};

export const deletePet = async (
  req: Request,
  res: Response
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
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a deleção",

      response: { error: (error as Error).message },
    });
  }
};
