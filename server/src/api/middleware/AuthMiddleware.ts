import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { BaseRequest, BaseResponse } from "../../domain";

export async function verificarToken(
  req: BaseRequest<User>,
  res: BaseResponse<User>,
  next: any
) {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: "Token não informado" });
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, "secretkey", (err: any, decoded: any) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido", error: err });
    }
    next();
  });
}
