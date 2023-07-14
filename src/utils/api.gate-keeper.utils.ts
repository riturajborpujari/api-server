import { Request, Response, NextFunction, RequestHandler } from "express";

export type ResponseValidator = (response: any) => boolean;
export type ErrorHandler = (
  err: Error,
  req: Request,
  res: Response
) => Response;
export type ResponseHandler = (
  response: any,
  req: Request,
  res: Response
) => Response;
export interface IIdeology {
  isSendable: ResponseValidator;
  onResponse: ResponseHandler;
  onError: ErrorHandler;
}

export function createGateKeeper(ideology: IIdeology) {
  const guardApi =
    (apiHandler: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await Reflect.apply(apiHandler, apiHandler, [req, res]);

        if (ideology.isSendable(result)) {
          ideology.onResponse(result, req, res);
        }

        next();
      } catch (err) {
        ideology.onError(err, req, res);
      }
    };
  return {
    guard: (handlers: RequestHandler[]) => {
      return handlers.map((handler) => guardApi(handler));
    },
  };
}
