import express from "express";
import { handlerReadiness } from "./api/handlers/readiness";
import { handlerNumberOfHits } from "./api/handlers/numberOfHits";
import { handlerResetHits } from "./api/handlers/resetHits";
import { handlerValidateChirp } from "./api/handlers/validateChirp";
import { middlewareLogResponse } from "./api/middlewares/middlewareLogResponse";
import { middlewareMetricsInc } from "./api/middlewares/middlewareMetricsInc";
import { errorHandler } from "./api/handlers/errorHandler";
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from "./config";

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);

const app = express();
const PORT = 8080;
app.use("/app", middlewareMetricsInc);
app.use(middlewareLogResponse);

app.use(express.json());
app.use("/app", express.static("./src/app"));

// API number of hits
app.get("/admin/metrics", handlerNumberOfHits)
app.post("/admin/reset", handlerResetHits)

app.get('/api/healthz', handlerReadiness)

app.post('/api/validate_chirp', handlerValidateChirp)

app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});



