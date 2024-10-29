export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface ApiRequest {
  method: HttpMethod;
  query: Record<string, string>;
  params: Record<string, string>;
  body: any;
  headers: Headers;
}

export interface ApiResponse {
  status: (code: number) => ApiResponse;
  json: (data: any) => void;
  send: (data: string) => void;
}

export type ApiHandler = (req: ApiRequest, res: ApiResponse) => Promise<void> | void;

export type ApiMiddleware = (
  req: ApiRequest, 
  res: ApiResponse, 
  next: () => void
) => Promise<void> | void;

// Tipos para las respuestas de API
export interface ApiSuccessResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  status: number;
}

// Tipos específicos para el endpoint de usuarios
export interface User {
  id: string | number;
  name: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  password?: string;
}

// Tipos para las respuestas específicas de usuarios
export interface GetUserResponse extends ApiSuccessResponse<User> {}
export interface CreateUserResponse extends ApiSuccessResponse<User> {}
export interface UpdateUserResponse extends ApiSuccessResponse<User> {}
export interface DeleteUserResponse extends ApiSuccessResponse<{ deleted: boolean }> {}
