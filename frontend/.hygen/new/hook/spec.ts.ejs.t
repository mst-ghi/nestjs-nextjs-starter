---
to: <%= absPath %>/use<%= name %>.spec.ts
---
import { actHook, cleanupHook, renderHook } from '@utils/test-utils';
import use<%= name %>, { Use<%= name %>ReturnType } from './use<%= name %>';

describe('use<%= name %> Hook', () => {
  let promise: Promise<void>;

  beforeEach(() => {
    promise = Promise.resolve();
  });

  afterEach(cleanupHook);

  test('should be mount', async () => {
    const { result, rh: hook } = renderHook<Use<%= name %>ReturnType>(use<%= name %>);

    expect(result.error).not.toBeDefined();
    expect(hook).toBeDefined();

    await actHook(() => promise);
  });
});
