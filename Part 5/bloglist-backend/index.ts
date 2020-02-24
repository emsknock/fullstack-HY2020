import { PORT } from "./utils/config";

import http from "http";
import * as logger from "./utils/logger";
import { app } from "./app";

const server = http.createServer(app);

server.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`)
});