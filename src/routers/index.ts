import { parse } from "path";
import ParseBody from "../helper/ParseBody";
import addRoutes from "../helper/RouteHandler";
import SendJson from "../helper/SendStatus";
import { readUsers, writeUser } from "../helper/fileDb";

addRoutes("GET", "/", (req, res) => {
  SendJson(res, 200, {
    Massage: "Hello from node js and this is my ",
    path: req.url,
  });
});

addRoutes("POST", "/api/users", async (req, res) => {
  const body = await ParseBody(req);
  console.log(body);
  const users = readUsers();
  const newUser = {
    id: Date.now(),
    ...body,
  };
  console.log(newUser);
  users.push(newUser);

  writeUser(users);
  SendJson(res, 201, { success: true, body });
});

addRoutes("PUT", "/api/users/:id", async (req, res) => {
  const { id } = (req as any).params;
  const body = await ParseBody(req);
  const users = readUsers();
  const index = users.findIndex((user: any) => user.id == id);
  if (index === -1) {
    SendJson(res, 404, {
      success: false,
      message: "User not found",
    });
  }

  users[index] = {
    ...users[index],
    ...body,
  };
  writeUser(users);
  SendJson(res, 202, { success: true, message: "user updated successfully" });
});
