import './polyfills';
import 'whatwg-fetch';
import { beforeAll, afterEach, afterAll, expect } from 'vitest';
import { server } from '../src/mocks/server';
import * as matchers from '@testing-library/jest-dom/matchers';

class MockBroadcastChannel implements BroadcastChannel {
  readonly name: string;
  onmessage: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;
  onmessageerror: ((this: BroadcastChannel, ev: MessageEvent) => any) | null = null;

  constructor(name: string) {
    this.name = name;
  }

  postMessage(_message: any): void {}
  close(): void {}
  addEventListener(): void {}
  removeEventListener(): void {}
  dispatchEvent(): boolean {
    return true;
  }
}

(globalThis as any).BroadcastChannel = MockBroadcastChannel;


beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


expect.extend(matchers);

