import http, { IncomingMessage, ServerResponse } from "http";
import config from "./config";
import { RouteHandler, routes } from "./helper/RouteHandler";
import SendJson from "./helper/SendStatus";
import "./routers";
import findDynamicRoute from "./helper/dynamicroute";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is Running......");

    const method = req.method?.toUpperCase() || "";
    const path = req.url || "";
    const methodMap = routes.get(method);
    const handler: RouteHandler | undefined = methodMap?.get(path);
    if (handler) {
      handler(req, res);
    } else if (findDynamicRoute(method, path)) {
      const match = findDynamicRoute(method, path);
      (req as any).params = match?.params;
      match?.handler(req, res);
    } else {
      SendJson(res, 400, {
        Massage: "Route Not found",
        success: false,
      });
    }
  }
);
server.listen(config.port, () => {
  console.log(`server is running in port ${config.port}`);
});
