import test from "ava";
import { HelloWorldServiceImpl } from "./hello-world.service.ts";

test('helloWorld() should return "Hello, World!"', async (t) => {
  // Arrange
  const helloWorldService = new HelloWorldServiceImpl();

  // Act
  const result = await helloWorldService.helloWorld();

  // Assert
  t.is(result, "Hello, World!");
});
