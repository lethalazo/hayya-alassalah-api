import express from "express";
import { AddressInfo } from "net";
import newrelic from "newrelic";

import app from "./app";

app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

const PORT = process.env.PORT || 1063;
const server = app.listen(PORT, () => {
  const serverAddressInfo = server.address() as AddressInfo;
  const host = serverAddressInfo.address;
  const port = serverAddressInfo.port;
  console.log("server is listening at http://%s:%s", host, port);
});
