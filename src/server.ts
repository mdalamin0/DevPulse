import { app } from "./app";
import config from "./config/env.config";

const main = () => {
  app.listen(config.port, () => {
    console.log(`This server is listening on port ${config.port}`);
  });
};

main();
