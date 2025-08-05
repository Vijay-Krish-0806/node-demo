import * as http from "http";

//createServer
// {
//   const server = http.createServer(
//     (req: http.IncomingMessage, res: http.ServerResponse) => {
//       try {
//         // Log request details
//         console.log(`Request: ${req.method} ${req.url}`);

//         // Set response headers
//         res.setHeader("Content-Type", "text/plain");
//         res.statusCode = 200;

//         // Handle routes
//         if (req.url === "/" && req.method === "GET") {
//           res.end("Welcome to the Node.js HTTP Server!\n");
//         } else if (req.url === "/api" && req.method === "GET") {
//           res.setHeader("Content-Type", "application/json");
//           res.end(JSON.stringify({ message: "API response" }));
//         } else {
//           res.statusCode = 404;
//           res.end("Not Found\n");
//         }
//       } catch (error) {
//         res.statusCode = 500;
//         res.end(
//           `Server Error: ${
//             error instanceof Error ? error.message : "Unknown error"
//           }\n`
//         );
//       }
//     }
//   );

//   // Handle server errors
//   server.on("error", (error) => {
//     console.error("Server error:", error.message);
//   });

//   // Start server
//   const PORT = 3000;
//   server.listen(PORT, "localhost", () => {
//     console.log(`Server running at http://localhost:${PORT}`);
//   });
// }

//request , get
// {
//   async function fetchData(url: string): Promise<string> {
//     return new Promise((resolve, reject) => {
//       const options: http.RequestOptions = {
//         method: "GET",
//         hostname: "jsonplaceholder.typicode.com",
//         path: url,
//         headers: {
//           "User-Agent": "Node.js HTTP Client",
//         },
//         timeout: 5000,
//       };

//       const req = http.request(options, (res: http.IncomingMessage) => {
//         let data = "";
//         res.setEncoding("utf8");

//         res.on("data", (chunk: string) => {
//           data += chunk;
//         });

//         res.on("end", () => {
//           if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
//             resolve(data);
//           } else {
//             reject(new Error(`Request failed with status ${res.statusCode}`));
//           }
//         });
//       });

//       req.on("error", (error) => {
//         reject(error);
//       });

//       req.on("timeout", () => {
//         req.destroy(new Error("Request timed out"));
//       });

//       req.end();
//     });
//   }

//   // Usage
//   async function main() {
//     try {
//       const data = await fetchData("/todos/1");
//       console.log("Response:", JSON.parse(data));
//     } catch (error) {
//       console.error(
//         "Error fetching data:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   main();
// }

//Server
// {
//   const server = http.createServer(
//     (req: http.IncomingMessage, res: http.ServerResponse) => {
//       res.setHeader("Content-Type", "text/plain");
//       res.end("Hello, World!\n");
//     }
//   );

//   // Handle server events
//   server.on("connection", (socket) => {
//     console.log(
//       `New connection from ${socket.remoteAddress}:${socket.remotePort}`
//     );
//   });

//   server.on("clientError", (err, socket) => {
//     console.error("Client error:", err.message);
//     socket.end("HTTP/1.1 400 Bad Request\r\n\r\n");
//   });

//   server.on("close", () => {
//     console.log("Server closed");
//   });

//   // Graceful shutdown
//   process.on("SIGTERM", () => {
//     console.log("Received SIGTERM, shutting down...");
//     server.close(() => {
//       console.log("Server shutdown complete");
//       process.exit(0);
//     });
//   });

//   // Start server with timeout
//   server.setTimeout(10000, (socket) => {
//     console.log("Connection timed out");
//     socket.destroy();
//   });

//   server.listen(3000, "localhost", () => {
//     console.log("Server running at http://localhost:3000");
//   });
// }

//http IncomingMessage
// {
//   const server = http.createServer(
//     (req: http.IncomingMessage, res: http.ServerResponse) => {
//       if (req.method === "POST" && req.url === "/submit") {
//         let body = "";
//         req.setEncoding("utf8");

//         req.on("data", (chunk: string) => {
//           body += chunk;
//         });

//         req.on("end", () => {
//           try {
//             const data = JSON.parse(body);
//             res.setHeader("Content-Type", "application/json");
//             res.statusCode = 200;
//             res.end(JSON.stringify({ received: data }));
//           } catch (error) {
//             res.statusCode = 400;
//             res.end("Invalid JSON");
//           }
//         });
//       } else {
//         res.statusCode = 404;
//         res.end("Not Found");
//       }
//     }
//   );

//   server.listen(3000, "localhost", () => {
//     console.log("Server running at http://localhost:3000");
//   });
// }
