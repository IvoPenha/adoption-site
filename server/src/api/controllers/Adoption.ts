import { PrismaClient } from "@prisma/client";
import { removerPropriedade } from '../../core';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createAdoption = async (
  req: Request,
  res: Response
) => {
  try {
    const request = req.body;
    removerPropriedade(request, "id")
    const adoption = await prisma.adoption.create({
      data: {
        ...request,
      },
    });
    res.status(200).json({
      message: "Adoção cadastrada com sucesso",
      response: {
        id: adoption.id,
        userId: adoption.userId,
        petId: adoption.petId,
        createdAt: adoption.createdAt,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante o cadastro",
      response: { error: (error as Error).message },
    });
  }
};

export const getAllAdoptions = async (
  req: Request,
  res: Response
) => {
  try {
    const { page = 1, userId = null, petId = null } = req.query;
    const pageNumber = +page || 1;

    const whereClause: {
      userId?: number;
      petId?: number;
    } = {};

    if (userId) {
      whereClause.userId = +userId;
    }

    if (petId) {
      whereClause.petId = +petId;
    }

    const adoptions = await prisma.adoption.findMany({
      where: whereClause,
      skip: (pageNumber - 1) * 10,
      take: 10,
    });

    res.status(200).json({
      message: "Adoções encontradas",
      response: adoptions,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: (error as Error).message },
    });
  }
};

export const getAdoptionById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const adoption = await prisma.adoption.findUnique({
      where: {
        id: +id,
      },
    });
    if (!adoption) {
      throw new Error("Adoção não encontrada");
    }
    res.status(200).json({
      message: "Adoção encontrada",
      response: adoption,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: (error as Error).message },
    });
  }
};

export const deleteAdoption = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const adoption = await prisma.adoption.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json({
      message: "Adoção deletada com sucesso",
      response: adoption,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a deleção",
      response: { error: (error as Error).message },
    });
  }
};

export const updateAdoption = async (
  req: Request,
  res: Response
) => {
  try {
    const { id: paramsId } = req.params;

    if (!paramsId) {
      throw new Error("Id não informado");
    }

    const hasAdoption = await prisma.adoption.findUnique({
      where: {
        id: +paramsId,
      },
    });

    if (!hasAdoption) {
      throw new Error("Adoção não encontrada");
    }

    const { id, ...rest } = req.body;
    const adoption = await prisma.adoption.update({
      where: {
        id: +id,
      },
      data: {
        ...rest,
      },
    });
    res.status(200).json({
      message: "Adoção atualizada com sucesso",
      response: adoption,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a atualização",
      response: { error: (error as Error).message },
    });
  }
};
