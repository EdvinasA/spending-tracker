import { afterEach, jest } from '@jest/globals';

jest.setTimeout(10000);

afterEach(() => {
  jest.clearAllMocks();
});