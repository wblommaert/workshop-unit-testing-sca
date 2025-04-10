import anyTest, { type TestFn } from "ava";
import sinon from "sinon";
import { HelloWorldController } from "./hello-world.controller.ts";
import type { HelloWorldService } from "../services/hello-world.service.ts";
import type { Request, Response, Router } from "express";

type TContext = {
  mockHelloWorldService: Partial<HelloWorldService>;
  mockGet: sinon.SinonStub;
  mockRouter: Router;
  handlers: Record<string, Function>;
  mockRequest: Request;
  mockResponse: Response;
  responseJson: sinon.SinonStub;
  responseStatus: sinon.SinonStub;
  controller: HelloWorldController;
};

const test = anyTest as TestFn<TContext>;

test.beforeEach((t) => {
  const mockHelloWorldService: Partial<HelloWorldService> = {
    helloWorld: sinon.stub(),
  };

  const mockGet = sinon.stub();
  const mockRouter = {
    get: mockGet,
  } as unknown as Router;

  const handlers: Record<string, Function> = {};
  mockGet.callsFake((path, handler) => {
    handlers[path] = handler;
    return mockRouter;
  });

  const responseJson = sinon.stub();
  const responseStatus = sinon.stub().returns({ json: responseJson });
  const mockResponse = {
    status: responseStatus,
  } as unknown as Response;

  const mockRequest = {} as unknown as Request;

  t.context = {
    mockHelloWorldService,
    mockGet,
    mockRouter,
    handlers,
    mockRequest,
    mockResponse,
    responseJson,
    responseStatus,
    controller: new HelloWorldController(
      mockHelloWorldService as HelloWorldService,
      mockRouter
    ),
  };
});

test.afterEach(() => {
  sinon.restore();
});

test("constructor should initialize router with correct route handler", async (t) => {
  // Arrange
  const { mockGet } = t.context;

  // Act
  // No action needed, as the constructor is called in beforeEach

  // Assert
  t.true(mockGet.calledOnce);
  t.true(mockGet.calledWith("/", sinon.match.func));
});

test("router getter should return the router instance", (t) => {
  // Arrange
  const { controller, mockRouter } = t.context;

  // Assert
  t.is(controller.router, mockRouter);
});

test("helloWorld should call service and return data with status 200", async (t) => {
  // Arrange
  const {
    handlers,
    mockHelloWorldService,
    mockRequest,
    mockResponse,
    responseStatus,
    responseJson,
  } = t.context;
  const expectedData = "Hello, World!";
  (mockHelloWorldService.helloWorld as sinon.SinonStub).resolves(expectedData);

  // Act
  await handlers["/"].call(null, mockRequest, mockResponse);

  // Assert
  t.true((mockHelloWorldService.helloWorld as sinon.SinonStub).calledOnce);
  t.true(responseStatus.calledWith(200));
  t.true(responseJson.calledWith({ data: expectedData }));
});

test("helloWorld should handle service errors", async (t) => {
  // Arrange
  const { mockHelloWorldService, controller, mockRequest, mockResponse } =
    t.context;

  const mockError = new Error("Service error");
  (mockHelloWorldService.helloWorld as sinon.SinonStub).rejects(mockError);

  // Act & Assert
  const error = await t.throwsAsync(async () => {
    await controller.helloWorld(mockRequest, mockResponse);
  });
  t.is(error, mockError);
});
