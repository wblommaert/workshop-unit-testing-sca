import test from 'ava';
import sinon from 'sinon';
import { HelloWorldController } from './hello-world.controller.ts';
import type { HelloWorldService } from '../services/hello-world.service.ts';
import { Router } from 'express';

test('GET / - helloWorld() returns "Hello, World!"', async (t) => {
  const mockService: HelloWorldService = {
    helloWorld: sinon.stub().resolves('Hello, World!'),
  };
  const mockResponse = {
    status: sinon.stub().returnsThis(),
    json: sinon.stub(),
  } as any;
  const mockRequest = {} as any;
  const mockNext = sinon.stub();

  const controller = new HelloWorldController(mockService, Router());
  const routeHandler = controller.router.stack[0].route.stack[0].handle;

  await routeHandler(mockRequest, mockResponse, mockNext);

  t.true(mockResponse.status.calledWith(200));
  t.true(mockResponse.json.calledWith({ data: 'Hello, World!' }));
});
