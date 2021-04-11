"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
var child_process_1 = require("child_process");
var path_1 = require("path");
var chalk = require("chalk");
var log = console.log;
var npmCommand = process.platform == "win32" ? "npm.cmd" : "npm";
var firebaseCommand = process.platform == "win32" ? "firebase.cmd" : "firebase";
var runTerminalCommand = function (spawnArgs, chalkConfig, processName) {
    var terminalCommand = child_process_1.spawn(spawnArgs.command, __spreadArray([], spawnArgs.args), spawnArgs.options);
    var chalkedLog = chalk
        .hex(chalkConfig.color_hex)
        .bgHex(chalkConfig.bg_color_hex);
    terminalCommand.stdout.on("data", function (chunk) {
        log(chalkedLog(processName + ":"), chunk.toString());
    });
    terminalCommand.stderr.on("data", function (chunk) {
        log(chalkedLog(processName + " ERROR:"), chalk.bgRedBright.bold.whiteBright("" + chunk));
    });
    terminalCommand.on("close", function (code) {
        log(chalkedLog(processName + ":"), chalk.bgRedBright.bold.whiteBright("Exited with code: " + code));
    });
};
runTerminalCommand({
    command: npmCommand,
    args: ["run", "emulators"],
    options: { cwd: process.cwd() }
}, { bg_color_hex: "#0F2027", color_hex: "#FCCA3F" }, "Firebase emulator");
runTerminalCommand({
    command: npmCommand,
    args: ["run", "dev"],
    options: { cwd: process.cwd() }
}, { bg_color_hex: "#2B2E3B", color_hex: "#9FEAF9" }, "React scripts");
runTerminalCommand({
    command: "tsc",
    args: [],
    options: { cwd: path_1.resolve(process.cwd(), "functions"), shell: true }
}, { bg_color_hex: "#007ACC", color_hex: "#FFFFFF" }, "Typescript cloud functions compilation");
