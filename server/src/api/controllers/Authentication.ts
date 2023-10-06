import { Response } from "express";
import { PrismaClient, User } from "@prisma/client";
import { decryptText, encryptText } from "../../core";
// import { createProfileWithoutResponse } from "./Profile";
import { BaseRequest, BaseResponse } from "../../domain";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

interface signUp {
  message: string;
  response: {
    id?: number;
    email?: string;
    senha?: string;
    nome?: string;
    error?: any;
  };
}

export async function signUp(req: BaseRequest<User>, res: BaseResponse<User>) {
  try {
    const { nome, email, senha, nascimento, telefone } = req.body;
    const hasUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (hasUser) {
      throw new Error("Usuário já cadastrado");
    }

    const encryptedSenha = encryptText(senha);
    const user = await prisma.user.create({
      data: {
        email,
        senha: encryptedSenha,
        nome,
        nascimento,
        telefone,
      },
    });
    // const profile = createProfile({body: {userId: user.id}})
    // console.log(profile)

    // const profile = await createProfileWithoutResponse(user.id);
    // console.log(profile);

    res.status(200).json({
      message: "Cadastro Bem sucedido",
      response: {
        email: user.email,
        nome: user.nome as string,
        id: user.id,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      message: "Ocorreu um erro durante o cadastro",
      response: { error: error.message },
    });
  }
}

interface LoginResponse {
  message: string;
  response: {
    accessToken?: string;
    erro?: unknown;
  };
}

interface LoginRequest {
  email: string;
  senha: string;
}

export async function signIn(
  req: { body: LoginRequest },
  res: Response<LoginResponse>
) {
  try {
    const { email, senha } = req.body;
    console.log(req.body);
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    console.log(user);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }
    const decryptedSenha = decryptText(user.senha);
    if (decryptedSenha !== senha) {
      throw new Error("Senha incorreta");
    }
    const userDTO = {
      id: user.id,
      email: user.email,
      nome: user.nome,
    };
    const token = jwt.sign(
      {
        expires_in: Math.floor(Date.now() / 1000) + 60 * 60,
        ...userDTO,
      },
      "secretkey"
    );
    res.status(200).json({
      message: "Login realizado com sucesso",
      response: { accessToken: token },
    });
  } catch (error) {
    res.status(500).json({
      message: "Ocorreu um erro durante o login",
      response: { erro: error },
    });
  }
}
