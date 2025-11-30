import { IncomingMessage, ServerResponse } from "http";

function SendJson(res: ServerResponse, statusCode: number, data: any) {
  res.writeHead(statusCode, { "content-type": "Application/json" });
  res.end(JSON.stringify(data));
}

export default SendJson;
