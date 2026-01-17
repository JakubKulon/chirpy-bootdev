import { Request, Response } from "express";
import { config } from "../../config";

export const handlerNumberOfHits = (_req: Request, res: Response) => {

  const html = `<html>
  <body>
    <h1>Welcome, Chirpy Admin</h1>
    <p>Chirpy has been visited ${config.fileserverHits} times!</p>
  </body>
</html>
`

  res.contentType("text/html; charset=utf-8")
  res.statusCode = 200;
  res.send(html);
};