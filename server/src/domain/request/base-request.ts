import { Request as ExpressRequest } from "express";

export type BaseRequest<T, Y = object> = ExpressRequest & {
  body: T;
  queries?: Y;
  params?: Y;
};

export type BaseRequestParams<T> = ExpressRequest & {
  params: T;
};

export type BaseRequestQuery<T> = ExpressRequest & {
  query: T;
};
