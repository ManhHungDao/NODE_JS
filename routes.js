const fs = require("fs");

const requesHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write(
      `<html>
            <head>
            <title>My first page</title>
            </head>
            <body>
            <form action="/message" method="post">
            <input type="text" name="message">
            <button type="submit">Send</button>
            </form>
            </body>
            </html>`
    );
    return res.end();
  } else if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => body.push(chunk));
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.txt", message, (err) => {
        res.setHeader("Location", "/");
        res.statusCode = 302;
        return res.end();
      });
    });
  }
  
  //console.log(req.url, req.method, req.headers);
  res.setHeader("Content-Type", "text/html");
  res.write(
    `<html><head><title>My first page</title></head><body>Hello from my node js sever</body></html>`
  );
  res.end();
};

// module.exports = {
//   handler: requesHandler,
//   somneText: "Some hard code text",
// };

// module.exports.handler =requesHandler
// module.exports.somneText =  "Some hard code text"


//short hand
exports.handler =requesHandler
exports.somneText =  "Some hard code text"