import type { HelloWorldService } from "../hello-world.service.ts";

export class HelloWorldServiceImpl implements HelloWorldService {
  async helloWorld(): Promise<string> {
    return "Hello, World!";
  }
}
