import * as http from "http";
import { RouteHandler } from "./types.js";
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "./controllers.js";

// Route definition
interface Route {
  method: string;
  path: RegExp;
  handler: RouteHandler;
}

const routes: Route[] = [
  { method: "GET", path: /^\/users$/, handler: getUsers },
  { method: "GET", path: /^\/users\/(\d+)$/, handler: getUser },
  { method: "POST", path: /^\/users$/, handler: createUser },
  { method: "PUT", path: /^\/users\/(\d+)$/, handler: updateUser },
  { method: "DELETE", path: /^\/users\/(\d+)$/, handler: deleteUser },
];

// Router function
export function routeRequest(
  req: http.IncomingMessage,
  res: http.ServerResponse
): void {
  const url = req.url || "";
  const method = req.method || "GET";

  const matchedRoute = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (matchedRoute) {
    const match = url.match(matchedRoute.path);
    const params = match ? { id: match[1] } : undefined;
    matchedRoute.handler(req, res, params).catch((error) => {
      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: error instanceof Error ? error.message : "Server error",
        })
      );
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Route not found" }));
  }
}
