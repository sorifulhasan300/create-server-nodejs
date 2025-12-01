import { IncomingMessage } from "http";

function ParseBody(req: IncomingMessage): Promise<any> {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (error) {
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

export default ParseBody;

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
