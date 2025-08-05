//reading a file
// import * as fs from "fs/promises";
// {
//   async function readFile(filePath: string): Promise<void> {
//     try {
//       const data = await fs.readFile(filePath, { encoding: "utf8" });
//       console.log("File contents:", data);
//     } catch (error) {
//       console.error(
//         "Error reading file:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   readFile("./example.txt");
// }

//writeFile
// {
//   async function saveLog(filePath: string, logMessage: string): Promise<void> {
//     try {
//       await fs.writeFile(filePath, logMessage, { encoding: "utf8", flag: "a" });
//       console.log("Log saved successfully")
//     } catch (error) {
//       console.error(
//         "Error writing file:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   const logMessage = `Log entry at ${new Date().toISOString()}: User action completed.\n`;
//   saveLog("./app.log", logMessage);
// }

// readdir
// {
//   async function listFiles(dirPath: string): Promise<void> {
//     try {
//       const files = await fs.readdir(dirPath, { withFileTypes: true });
//       console.log("Directory contents:");
//       for (const file of files) {
//         const type = file.isDirectory() ? "Directory" : "File";
//         console.log(`- ${file.name} (${type})`);
//       }
//     } catch (error) {
//       console.error(
//         "Error reading directory:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }
//   listFiles("./");
// }

//fileStats
// {
//   async function getFileInfo(filePath: string): Promise<void> {
//     try {
//       const stats = await fs.stat(filePath);
//       console.log("File stats:");
//       console.log(`- Size: ${stats.size} bytes`);
//       console.log(`- Is File: ${stats.isFile()}`);
//       console.log(`- Is Directory: ${stats.isDirectory()}`);
//       console.log(`- Last Modified: ${stats.mtime.toISOString()}`);
//     } catch (error) {
//       console.error(
//         "Error getting file stats:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   // Usage
//   getFileInfo("./example.txt");
// }

// mkdir_rmdir
// {
//   async function manageDirectories(dirPath: string): Promise<void> {
//     try {
//       // Create directory
//       await fs.mkdir(dirPath, { recursive: true });
//       console.log(`Directory created: ${dirPath}`);

//       // Remove directory
//       await fs.rm(dirPath, { recursive: true });
//       console.log(`Directory removed: ${dirPath}`);
//     } catch (error) {
//       console.error(
//         "Error managing directories:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   manageDirectories("./temp/nested");
// }

// unlink
// {
//   async function deleteFile(filePath: string): Promise<void> {
//     try {
//       await fs.unlink(filePath);
//       console.log(`File deleted: ${filePath}`);
//     } catch (error) {
//       console.error(
//         "Error deleting file:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }
//   // Usage
//   deleteFile("./app.log");
// }

// streams
// import * as fs from "fs";
// {
//   async function processLargeFile(
//     inputPath: string,
//     outputPath: string
//   ): Promise<void> {
//     return new Promise((resolve, reject) => {
//       const readStream = fs.createReadStream(inputPath, {
//         encoding: "utf8",
//         highWaterMark: 16 * 1024,
//       });
//       const writeStream = fs.createWriteStream(outputPath, {
//         encoding: "utf8",
//       });

//       readStream.on("data", (chunk) => {
//         writeStream.write(chunk);
//       });

//       readStream.on("end", () => {
//         writeStream.end();
//         console.log("File processing complete");
//         resolve();
//       });

//       readStream.on("error", (error) => {
//         console.error("Error reading file:", error.message);
//         reject(error);
//       });

//       writeStream.on("error", (error) => {
//         console.error("Error writing file:", error.message);
//         reject(error);
//       });
//     });
//   }

//   // Usage
//   processLargeFile("./example.txt", "./output.txt").catch(console.error);
// }

import * as fs from "fs/promises";
// import { constants } from "fs";
// // access
// {
//   async function checkFileAccess(filePath: string): Promise<void> {
//     try {
//       await fs.access(filePath, constants.R_OK | constants.W_OK);
//       console.log(`File is readable and writable: ${filePath}`);
//     } catch (error) {
//       console.error(
//         "File access error:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   // Usage
//   checkFileAccess("./example.txt");
// }

// watch
// {
//   async function watchFile(filePath: string): Promise<void> {
//     try {
//       const watcher = fs.watch(filePath, { encoding: "utf8" });
//       console.log(`Watching file: ${filePath}`);

//       for await (const event of watcher) {
//         console.log(`Event: ${event.eventType}, File: ${event.filename}`);
//       }
//     } catch (error) {
//       console.error(
//         "Error watching file:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   watchFile("./example.txt");
// }

// chmod
// {
//   async function setFilePermissions(filePath: string): Promise<void> {
//     try {
//       // Set permissions: owner read/write (0o600)
//       await fs.chmod(filePath, 0o400);
//       console.log(`Permissions set to 0o600 for ${filePath}`);

//       // Verify permissions
//       const stats = await fs.stat(filePath);
//       console.log(`Current mode: ${stats.mode.toString(8)}`);
//     } catch (error) {
//       console.error(
//         "Error setting permissions:",
//         error instanceof Error ? error.message : error
//       );
//     }
//   }

//   // Usage
//   setFilePermissions("./example.txt").catch(console.error);
// }

//open
{
  async function appendToFile(filePath: string, data: string): Promise<void> {
    let fileHandle: fs.FileHandle | null = null;
    try {
      // Open file in append mode
      fileHandle = await fs.open(filePath, "a");
      await fileHandle.write(Buffer.from(data));
      console.log(`Appended data to ${filePath}`);

      // Verify file contents
      const stats = await fileHandle.stat();
      console.log(`File size after append: ${stats.size} bytes`);
    } catch (error) {
      console.error(
        "Error with file operation:",
        error instanceof Error ? error.message : error
      );
    } finally {
      // Always close the file handle
      if (fileHandle) {
        await fileHandle.close();
      }
    }
  }

  // Usage
  appendToFile("./log.txt", `Log entry at ${new Date().toISOString()}\n`).catch(
    console.error
  );
}
