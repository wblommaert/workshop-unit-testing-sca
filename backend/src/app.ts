import express, { type Express } from "express";
import { HelloWorldController } from "./controllers/hello-world.controller.ts";

export class App {
  #app: Express;

  constructor(
    helloWorldController = new HelloWorldController(),
    app = express()
  ) {
    this.#app = app;

    this.#app.use("/api/hello-world", helloWorldController.router);
  }

  start(port = 3000) {
    if (process.env.PORT) {
      port = parseInt(process.env.PORT);
    }

    this.#app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  }
}
