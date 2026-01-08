import express from "express";
import { handlerReadiness } from "./handlers/readiness";
import { middlewareLogResponse } from "./middleware";
const app = express();
const PORT = 8080;

app.use("/app", express.static("./src/app"));
app.use(middlewareLogResponse);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.get('/healthz', handlerReadiness)