import { PrismaClient, Profile } from "@prisma/client";
import { Response } from "express";
import {
  BaseRequest,
  BaseRequestParams,
  BaseRequestQuery,
  BaseResponse,
} from "../../domain";

const prisma = new PrismaClient();

interface ProfileRequest extends Omit<Profile, "id"> {
  id?: number | null; // tornando id nulo (nullable)
}

export const createProfileWithoutResponse = async (req: number) => {
  try {
    const id = req;
    const profile = await prisma.profile.create({
      data: {
        userId: id,
      },
    });
    return profile;
  } catch (error: any) {
    return null;
  }
};

export const createProfile = async (
  req: BaseRequest<ProfileRequest>,
  res: BaseResponse<Profile>
) => {
  try {
    const { id, ...rest } = req.body;
    const profile = await prisma.profile.create({
      data: {
        ...rest,
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
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante o cadastro",
      response: { error: error.message },
    });
  }
};

export const updateProfile = async (
  req: BaseRequest<ProfileRequest, { id: number }>,
  res: BaseResponse<Profile>
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
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a atualização",
      response: { error: error.message },
    });
  }
};

export const getAllProfiles = async (
  req: BaseRequestQuery<{
    page?: string;
  }>,
  res: BaseResponse<Profile>
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
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: error.message },
    });
  }
};

export const getProfileById = async (
  req: BaseRequestParams<{
    id: string;
  }>,
  res: BaseResponse<Profile>
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
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: error.message },
    });
  }
};

export const deleteProfile = async (
  req: BaseRequestParams<{
    id: string;
  }>,
  res: BaseResponse<Profile>
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
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a deleção",
      response: { error: error.message },
    });
  }
};

export const getProfileByUserId = async (
  req: BaseRequestParams<{
    userId: string;
  }>,
  res: BaseResponse<Profile>
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
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante a busca",
      response: { error: error.message },
    });
  }
};
