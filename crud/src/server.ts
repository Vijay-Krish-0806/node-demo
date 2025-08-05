// import * as http from "http";
// import { routeRequest } from "./router.js";

// const server = http.createServer(
//   (req: http.IncomingMessage, res: http.ServerResponse) => {
//     // Enable CORS for testing (optional)
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//     res.setHeader("Access-Control-Allow-Headers", "Content-Type");

//     // Handle preflight OPTIONS requests
//     if (req.method === "OPTIONS") {
//       res.statusCode = 204;
//       res.end();
//       return;
//     }

//     routeRequest(req, res);
//   }
// );

// // Handle server errors
// server.on("error", (error) => {
//   console.error("Server error:", error.message);
// });

// // Start server
// const PORT = 3000;
// server.listen(PORT, "localhost", () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });



import * as os from "os";

// Demo 1: os.cpus
// Purpose: Retrieves information about CPU cores, including model, speed, and usage times.
// Functionality: Uses os.cpus() to get an array of CPU core objects and logs details like core count, model, speed, and times.
// Real-World Use: Optimize worker threads or child processes in a web server or task queue based on CPU core count.
// Output (example):
// Number of CPU cores: 8
// CPU Details:
// Core 1:
//   Model: Intel(R) Core(TM) i7-9750H CPU @ 2.60GHz
//   Speed: 2600 MHz
//   User Time: 12345678 ms
//   Idle Time: 98765432 ms
function getCpuInfo(): void {
  const cpus = os.cpus();
  console.log(`Number of CPU cores: ${cpus.length}`);
  console.log("CPU Details:");
  cpus.forEach((cpu, index) => {
    console.log(`Core ${index + 1}:`);
    console.log(`  Model: ${cpu.model}`);
    console.log(`  Speed: ${cpu.speed} MHz`);
    console.log(`  User Time: ${cpu.times.user} ms`);
    console.log(`  Idle Time: ${cpu.times.idle} ms`);
  });
}

// Demo 2: os.totalmem and os.freemem
// Purpose: Retrieves total and free system memory in bytes.
// Functionality: Uses os.totalmem() and os.freemem() to calculate used memory and usage percentage, converting bytes to MB for readability.
// Real-World Use: Monitor memory usage in a server or microservice to throttle tasks or alert on low memory.
// Output (example):
// Total Memory: 16384.00 MB
// Free Memory: 8192.00 MB
// Used Memory: 8192.00 MB
// Memory Usage: 50.00%
function getMemoryInfo(): void {
  const totalMem = os.totalmem();
  const freeMem = os.freemem();
  const usedMem = totalMem - freeMem;
  const usagePercent = (usedMem / totalMem) * 100;

  console.log(`Total Memory: ${(totalMem / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Free Memory: ${(freeMem / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Used Memory: ${(usedMem / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Memory Usage: ${usagePercent.toFixed(2)}%`);
}

// Demo 3: os.networkInterfaces
// Purpose: Lists network interfaces and their addresses (IP, MAC, etc.).
// Functionality: Uses os.networkInterfaces() to get a map of interfaces and logs details like address, family, and MAC.
// Real-World Use: Configure network services or diagnose connectivity issues in a server setup.
// Output (example):
// Network Interfaces:
// Interface: eth0
//   Address: 192.168.1.100
//   Family: IPv4
//   MAC: 00:14:22:01:23:45
//   Internal: false
// Interface: lo
//   Address: 127.0.0.1
//   Family: IPv4
//   MAC: 00:00:00:00:00:00
//   Internal: true
function getNetworkInfo(): void {
  const interfaces = os.networkInterfaces();
  console.log("Network Interfaces:");
  for (const [name, nets] of Object.entries(interfaces)) {
    console.log(`Interface: ${name}`);
    nets?.forEach((net) => {
      console.log(`  Address: ${net.address}`);
      console.log(`  Family: ${net.family}`);
      console.log(`  MAC: ${net.mac}`);
      console.log(`  Internal: ${net.internal}`);
    });
  }
}

// Demo 4: os.platform, os.arch, os.release
// Purpose: Identifies the operating system platform, CPU architecture, and OS version.
// Functionality: Uses os.platform(), os.arch(), and os.release() to log system metadata.
// Real-World Use: Adapt application behavior (e.g., file paths, commands) for cross-platform compatibility in a CLI tool.
// Output (example):
// Platform: linux
// Architecture: x64
// OS Release: 5.15.0-73-generic
function getPlatformInfo(): void {
  console.log(`Platform: ${os.platform()}`);
  console.log(`Architecture: ${os.arch()}`);
  console.log(`OS Release: ${os.release()}`);
}

// Demo 5: os.hostname
// Purpose: Retrieves the system’s hostname.
// Functionality: Uses os.hostname() to log the hostname.
// Real-World Use: Include hostname in logs to trace requests in a distributed system.
// Output (example):
// Hostname: my-laptop.local
function getHostname(): void {
  console.log(`Hostname: ${os.hostname()}`);
}

// Demo 6: os.uptime
// Purpose: Returns the system uptime in seconds.
// Functionality: Uses os.uptime() to calculate and log uptime in days, hours, and minutes.
// Real-World Use: Monitor server uptime in a dashboard or detect recent reboots.
// Output (example):
// System Uptime: 5d 3h 45m
function getUptime(): void {
  const uptimeSeconds = os.uptime();
  const days = Math.floor(uptimeSeconds / (24 * 3600));
  const hours = Math.floor((uptimeSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  console.log(`System Uptime: ${days}d ${hours}h ${minutes}m`);
}

// Demo 7: os.userInfo
// Purpose: Retrieves information about the current user (username, UID, GID, etc.).
// Functionality: Uses os.userInfo() to log user details like username, UID, GID, shell, and home directory.
// Real-World Use: Store user-specific configuration files in the home directory for a CLI tool.
// Output (example, Linux):
// User Info:
//   Username: john
//   UID: 1000
//   GID: 1000
//   Shell: /bin/bash
//   Home Directory: /home/john
function getUserInfo(): void {
  const user = os.userInfo();
  console.log("User Info:");
  console.log(`  Username: ${user.username}`);
  console.log(`  UID: ${user.uid}`);
  console.log(`  GID: ${user.gid}`);
  console.log(`  Shell: ${user.shell}`);
  console.log(`  Home Directory: ${user.homedir}`);
}

// Demo 8: os.constants
// Purpose: Provides OS-specific constants for signals and error codes.
// Functionality: Uses os.constants to log selected constants like ENOENT and SIGTERM.
// Real-World Use: Handle process signals or interpret system errors in a server for graceful shutdown.
// Output (example):
// Selected OS Constants:
// ENOENT (No such file): 2
// SIGTERM (Termination signal): 15
function getConstants(): void {
  console.log("Selected OS Constants:");
  console.log(`ENOENT (No such file): ${os.constants.errno.ENOENT}`);
  console.log(`SIGTERM (Termination signal): ${os.constants.signals.SIGTERM}`);
}

// Main function to run all demos
function runOsDemos(): void {
  console.log("=== OS Module Demos ===\n");

  console.log("--- Demo 1: CPU Info ---");
  getCpuInfo();
  console.log("\n--- Demo 2: Memory Info ---");
  getMemoryInfo();
  console.log("\n--- Demo 3: Network Info ---");
  getNetworkInfo();
  console.log("\n--- Demo 4: Platform Info ---");
  getPlatformInfo();
  console.log("\n--- Demo 5: Hostname ---");
  getHostname();
  console.log("\n--- Demo 6: Uptime ---");
  getUptime();
  console.log("\n--- Demo 7: User Info ---");
  getUserInfo();
  console.log("\n--- Demo 8: Constants ---");
  getConstants();

  console.log("\n=== End of OS Module Demos ===");
}

// Execute all demos
runOsDemos();