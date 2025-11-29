import http, { IncomingMessage, ServerResponse } from "http";
import config from "./config";
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is Running......");

    if (req.url == "/" && req.method == "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          Massage: "Hello from node js and typescript..",
          path: req.url,
        })
      );
    }

    if (req.url == "/user" && req.method == "POST") {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        const data = JSON.parse(body);
        console.log("received data", data);
        res.writeHead(200, { "content-type": "application/json" });
        res.end(
          JSON.stringify({
            Massage: "this is user data",
            received: data,
          })
        );
      });
    }
  }
);
server.listen(config.port, () => {
  console.log(`server is running in port ${config.port}`);
});
