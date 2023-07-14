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

export function createGateKeeper(
  ideology: IIdeology,
  prependHandlers: RequestHandler[] = []
) {
  const guardApi =
    (apiHandler: RequestHandler) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await Reflect.apply(apiHandler, apiHandler, [req, res]);

        if (ideology.isSendable(result)) {
          return ideology.onResponse(result, req, res);
        }

        return next();
      } catch (err) {
        return ideology.onError(err, req, res);
      }
    };
  return {
    guard: (handlers: RequestHandler[]) => {
      const pipeline = prependHandlers.concat(handlers);

      return pipeline.map(handler => guardApi(handler));
    }
  };
}
