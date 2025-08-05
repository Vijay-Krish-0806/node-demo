import * as http from "http";
import { User, RouteHandler } from "./types.js";

// In-memory user storage
let users: User[] = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];
let nextId = 3;

// Helper to parse JSON body
async function parseBody(req: http.IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.setEncoding("utf8");
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Get all users
export const getUsers: RouteHandler = async (_req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(users));
};

// Get user by ID
export const getUser: RouteHandler = async (_req, res, params) => {
  const id = params?.id ? parseInt(params.id) : NaN;
  if (isNaN(id)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid user ID" }));
    return;
  }

  const user = users.find((u) => u.id === id);
  if (!user) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(user));
};

// Create user
export const createUser: RouteHandler = async (req, res) => {
  try {
    const { name, email } = await parseBody(req);
    if (!name || !email) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Name and email are required" }));
      return;
    }

    const user: User = { id: nextId++, name, email };
    users.push(user);

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 201;
    res.end(JSON.stringify(user));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid JSON" }));
  }
};

// Update user
export const updateUser: RouteHandler = async (req, res, params) => {
  const id = params?.id ? parseInt(params.id) : NaN;
  if (isNaN(id)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid user ID" }));
    return;
  }

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  try {
    const { name, email } = await parseBody(req);
    if (!name || !email) {
      res.statusCode = 400;
      res.end(JSON.stringify({ error: "Name and email are required" }));
      return;
    }

    users[userIndex] = { id, name, email };

    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    res.end(JSON.stringify(users[userIndex]));
  } catch (error) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid JSON" }));
  }
};

// Delete user
export const deleteUser: RouteHandler = async (_req, res, params) => {
  const id = params?.id ? parseInt(params.id) : NaN;
  if (isNaN(id)) {
    res.statusCode = 400;
    res.end(JSON.stringify({ error: "Invalid user ID" }));
    return;
  }

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "User not found" }));
    return;
  }

  users.splice(userIndex, 1);

  res.statusCode = 204;
  res.end();
};
