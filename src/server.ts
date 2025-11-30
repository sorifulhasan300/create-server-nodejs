import http, { IncomingMessage, ServerResponse } from "http";
import config from "./config";
import addRoutes, { RouteHandler, routes } from "./helper/RouteHandler";

addRoutes("GET", "/", (req, res) => {
  res.end(
    JSON.stringify({
      Massage: "Hello from node js and typescript",
      path: req.url,
    })
  );
});
const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is Running......");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);
    if (handler) {
      handler(req, res);
    } else {
      res.writeHead(400, { "content-type": "Application/json" });
      res.end(
        JSON.stringify({ success: false, message: "route not found", path })
      );
    }
    // if (req.url == "/user" && req.method == "POST") {
    //   let body = "";
    //   req.on("data", (chunk) => {
    //     body += chunk.toString();
    //   });

    //   req.on("end", () => {
    //     const data = JSON.parse(body);
    //     console.log("received data", data);
    //     res.writeHead(200, { "content-type": "application/json" });
    //     res.end(
    //       JSON.stringify({
    //         Massage: "this is user data",
    //         received: data,
    //       })
    //     );
    //   });
    // }
  }
);
server.listen(config.port, () => {
  console.log(`server is running in port ${config.port}`);
});
