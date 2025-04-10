import anyTest, { type TestFn } from "ava";
import sinon from "sinon";
import { type Express, Router } from "express";
import { App } from "./app.ts";
import { HelloWorldController } from "./controllers/hello-world.controller.ts";

type TContext = {
  mockExpress: sinon.SinonStub;
  mockApp: Express;
  mockUse: sinon.SinonStub;
  mockListen: sinon.SinonStub;
  mockRouter: Router;
  mockHelloWorldController: HelloWorldController;
  originalEnv: NodeJS.ProcessEnv;
  app: App;
};

const test = anyTest as TestFn<TContext>;

// Setup test helpers
test.beforeEach((t) => {
  // Mock express
  const mockUse = sinon.stub();
  const mockListen = sinon.stub();

  const mockApp = {
    use: mockUse,
    listen: mockListen,
  } as unknown as Express;

  // Mock express function
  const mockExpress = sinon.stub().returns(mockApp);

  // Mock HelloWorldController
  const mockRouter = {} as Router;
  const mockHelloWorldController = {
    router: mockRouter,
  } as HelloWorldController;

  // Save original env
  const originalEnv = { ...process.env };

  // Set context for tests
  t.context = {
    mockExpress,
    mockApp,
    mockUse,
    mockListen,
    mockRouter,
    mockHelloWorldController,
    originalEnv,
    app: new App(mockHelloWorldController, mockApp),
  };
});

test.afterEach((t) => {
  // Restore original env and console.log
  process.env = t.context.originalEnv;
  sinon.restore();
});

test("constructor should configure routes correctly", (t) => {
  const { mockUse, mockRouter } = t.context;

  t.true(mockUse.calledOnce);
  t.true(mockUse.calledWith("/api/hello-world", mockRouter));
});

test("start should listen on default port 3000 when PORT env var is not set", (t) => {
  // Arrange
  const { app, mockListen } = t.context;
  delete process.env.PORT;

  // Act
  app.start();

  // Assert
  t.true(mockListen.calledOnce);
  t.true(mockListen.calledWith(3000, sinon.match.func));
});

test("start should listen on PORT env var when set", (t) => {
  // Arrange
  const { app, mockListen } = t.context;
  process.env.PORT = "8080";

  // Act
  app.start();

  // Assert
  t.true(mockListen.calledOnce);
  t.true(mockListen.calledWith(8080, sinon.match.func));
});
