#!/usr/bin/env node

import http from "node:http";
import type { AddressInfo } from "node:net";
import debugLib from "debug";
import app from "../app.ts";

const debug = debugLib("prodbird-todo-backend:server");

const port = normalizePort(process.env.PORT ?? "3000");

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val: string): number | string | false {
  const port = Number.parseInt(val, 10);

  if (Number.isNaN(port)) return val;
  if (port >= 0) return port;

  return false;
}

function onError(error: NodeJS.ErrnoException): never | void {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `Pipe ${port}` : `Port ${port}`;

  switch (error.code) {
    case "EACCES":
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);

    case "EADDRINUSE":
      console.error(`${bind} is already in use`);
      process.exit(1);

    default:
      throw error;
  }
}

function onListening(): void {
  const addr = server.address();

  if (!addr) return;

  const bind = typeof addr === "string" ? `pipe ${addr}` : `port ${(addr as AddressInfo).port}`;

  debug(`Listening on ${bind}`);
}
