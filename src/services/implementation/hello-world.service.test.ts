import test from 'ava';
import {HelloWorldServiceImpl} from "./hello-world.service.ts";

test('helloWorld() returns "Hello, World!"', async (t) => {
    const helloWorldService = new HelloWorldServiceImpl();

    t.is( await helloWorldService.helloWorld(), "Hello, World!");
});
