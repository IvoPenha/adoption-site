import { PrismaClient } from "@prisma/client";
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const createProfileWithoutResponse = async (req: number) => {
  try {
    const id = req;
    const profile = await prisma.profile.create({
      data: {
        userId: id,
      },
    });
    return profile;
  } catch (error: unknown) {
    return null;
  }
};

export const createProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const { ...rest } = req.body;
    const profile = await prisma.profile.create({
      data: {
        ...rest
      },
    });
    res.status(200).json({
      message: "Perfil cadastrado com sucesso",
      response: {
        id: profile.id,
        userId: profile.userId,
        bio: profile.descricao,
        avatar: profile.fotoPerfil,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante o cadastro",

      response: { error: (error as Error).message },
    });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const paramsId = req.params.id;
    if (prisma.profile.findUnique({ where: { id: +paramsId } }) === null) {
      throw new Error("Perfil não encontrado");
    }

    const { id, ...rest } = req.body;
    const profile = await prisma.profile.update({
      where: {
        id: id,
      },
      data: {
        ...rest,
      },
    });
    res.status(200).json({
      message: "Perfil atualizado com sucesso",
      response: {
        id: profile.id,
        userId: profile.userId,
        bio: profile.descricao,
        avatar: profile.fotoPerfil,
      },
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a atualização",

      response: { error: (error as Error).message },
    });
  }
};

export const getAllProfiles = async (
  req: Request,
  res: Response
) => {
  try {
    const { page = 1 } = req.query;
    const pageNumber = +page || 1;
    const profiles = await prisma.profile.findMany({
      skip: (pageNumber - 1) * 10,
      take: 10,
    });
    res.status(200).json({
      message: "Perfis encontrados",
      response: profiles,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",

      response: { error: (error as Error).message },
    });
  }
};

export const getProfileById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const profile = await prisma.profile.findUnique({
      where: {
        id: +id,
      },
    });
    if (!profile) {
      throw new Error("Perfil não encontrado");
    }
    res.status(200).json({
      message: "Perfil encontrado",
      response: profile,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",

      response: { error: (error as Error).message },
    });
  }
};

export const deleteProfile = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const profile = await prisma.profile.delete({
      where: {
        id: +id,
      },
    });
    res.status(200).json({
      message: "Perfil deletado com sucesso",
      response: profile,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a deleção",

      response: { error: (error as Error).message },
    });
  }
};

export const getProfileByUserId = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;
    const profile = await prisma.profile.findUnique({
      where: {
        userId: +userId,
      },
    });
    if (!profile) {
      throw new Error("Perfil não encontrado");
    }
    res.status(200).json({
      message: "Perfil encontrado",
      response: profile,
    });
  } catch (error: unknown) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",

      response: { error: (error as Error).message },
    });
  }
};
