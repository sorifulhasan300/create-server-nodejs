import { parse } from "path";
import ParseBody from "../helper/ParseBody";
import addRoutes from "../helper/RouteHandler";
import SendJson from "../helper/SendStatus";

addRoutes("GET", "/", (req, res) => {
  SendJson(res, 200, {
    Massage: "Hello from node js and this is my ",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await ParseBody(req);
  SendJson(res, 201, { success: true, body });
});
