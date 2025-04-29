import test from "ava";
import express, { type Express, type RequestHandler } from "express";
import sinon from "sinon";
import { App } from "./app.ts";
import { HelloWorldController } from "./controllers/hello-world.controller.ts";

// Helper mock class for HelloWorldController
class MockHelloWorldController {
  router: RequestHandler;

  constructor() {
    this.router = (req, res, next) => next();
  }
}

test("App should register HelloWorldController route", t => {
  const useSpy = sinon.spy();

  const mockApp = {
    use: useSpy
  } as unknown as Express;

  const mockController = new MockHelloWorldController() as unknown as HelloWorldController;

  new App(mockController, mockApp);

  t.true(useSpy.calledWith("/api/hello-world", mockController.router));
});

test.serial("App should start server on default port", async t => {
  const listenSpy = sinon.stub().callsFake((port: number, cb: () => void) => cb());

  const mockApp = {
    use: sinon.spy(),
    listen: listenSpy
  } as unknown as Express;

  const mockController = new MockHelloWorldController() as unknown as HelloWorldController;

  const app = new App(mockController, mockApp);

  app.start(); // no custom port passed

  t.true(listenSpy.calledOnce);
  t.is(listenSpy.firstCall.args[0], 3000);
});

test.serial("App should respect PORT environment variable", async t => {
  const previousPort = process.env.PORT;
  process.env.PORT = "4000";

  const listenSpy = sinon.stub().callsFake((port: number, cb: () => void) => cb());

  const mockApp = {
    use: sinon.spy(),
    listen: listenSpy
  } as unknown as Express;

  const mockController = new MockHelloWorldController() as unknown as HelloWorldController;

  const app = new App(mockController, mockApp);

  app.start(); // should read process.env.PORT

  t.true(listenSpy.calledOnce);
  t.is(listenSpy.firstCall.args[0], 4000);

  if (previousPort !== undefined) {
    process.env.PORT = previousPort;
  } else {
    delete process.env.PORT;
  }
});
