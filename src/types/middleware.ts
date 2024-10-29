export interface Request {
  method: string;
  url: string;
  headers: Headers;
  body?: any;
}

export interface Response {
  status: (code: number) => Response;
  json: (data: any) => void;
  send: (data: string) => void;
  headers: Headers;
}

export type NextFunction = () => void | Promise<void>;
