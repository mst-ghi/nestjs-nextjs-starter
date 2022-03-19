---
to: <%= absPath %>/<%= fileName %>-page.spec.tsx
---
import { act, render } from '@utils/test-utils';
import <%= name %>Page from '.';

describe('<%= name %> Page', () => {
  let promise: Promise<void>;

  beforeEach(() => {
    promise = Promise.resolve();
  });

  test('should be defined', async () => {
    const { rc } = render(<<%= name %>Page />);

    expect(rc).toBeDefined();
    await act(() => promise);
  });
});
