import { Request, Response, NextFunction, RequestHandler } from "express";

export type ApiHandler = (req: Request) => any;
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
  return {
    guard: (handlers: ApiHandler[]) => {
      let result: any;
      const allHandlers = [...prependHandlers, ...handlers];

      return async (req: Request, res: Response, next: NextFunction) => {
        try {
          for (const handler of allHandlers) {
            result = await Reflect.apply(handler, handler, [req]);
            if (ideology.isSendable(result)) {
              return ideology.onResponse(result, req, res);
            }
          }
        } catch (err) {
          return ideology.onError(err, req, res);
        }

        // pass-through to other added handlers in the chain
        return next();
      };
    }
  };
}
