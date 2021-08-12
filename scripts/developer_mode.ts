import { spawn, SpawnOptions, ChildProcess } from "child_process";
import { resolve } from "path";
import * as chalk from "chalk";

const log = console.log;

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const firebaseCommand =
  process.platform === "win32" ? "firebase.cmd" : "firebase";

interface SpawnArguments {
  command: string;
  args: string[];
  options: SpawnOptions;
}

interface ChalkLogColors {
  color_hex: string;
  bg_color_hex: string;
}

const runTerminalCommand = (
  spawnArgs: SpawnArguments,
  chalkConfig: ChalkLogColors,
  processName: string
) => {
  let terminalCommand: ChildProcess = spawn(
    spawnArgs.command,
    [...spawnArgs.args],
    spawnArgs.options
  );

  const chalkedLog = chalk
    .hex(chalkConfig.color_hex)
    .bgHex(chalkConfig.bg_color_hex);

  terminalCommand.stdout.on("data", (chunk) => {
    log(chalkedLog(`${processName}:`), chunk.toString());
  });

  terminalCommand.stderr.on("data", (chunk) => {
    log(
      chalkedLog(`${processName} ERROR:`),
      chalk.bgRedBright.bold.whiteBright(`${chunk}`)
    );
  });

  terminalCommand.on("close", (code) => {
    log(
      chalkedLog(`${processName}:`),
      chalk.bgRedBright.bold.whiteBright(`Exited with code: ${code}`)
    );
  });
};

runTerminalCommand(
  {
    command: npmCommand,
    args: ["run", "emulators"],
    options: { cwd: process.cwd() },
  },
  { bg_color_hex: "#0F2027", color_hex: "#FCCA3F" },
  "Firebase emulator"
);

runTerminalCommand(
  {
    command: npmCommand,
    args: ["run", "dev"],
    options: { cwd: process.cwd() },
  },
  { bg_color_hex: "#2B2E3B", color_hex: "#9FEAF9" },
  "React scripts"
);

runTerminalCommand(
  {
    command: "tsc",
    args: ["--watch"],
    options: { cwd: resolve(process.cwd(), "functions"), shell: true },
  },
  { bg_color_hex: "#007ACC", color_hex: "#FFFFFF" },
  "Typescript cloud functions compilation"
);

// const process = spawn(...); // long running process
// // ... later...
//         if (os.platform() === 'win32') { // process.platform was undefined for me, but this works
//           execSync(`taskkill /F /T /PID ${process.pid}`); // windows specific
//         } else {
//           process.kill();
//         }
