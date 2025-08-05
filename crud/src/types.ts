import * as http from "http";

export interface User {
  id: number;
  name: string;
  email: string;
}

export interface RouteHandler {
  (
    req: http.IncomingMessage,
    res: http.ServerResponse,
    params?: Record<string, string>
  ): Promise<void>;
}
