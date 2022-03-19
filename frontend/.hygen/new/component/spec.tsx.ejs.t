---
to: <%= absPath %>/<%= fileName %>.spec.tsx
---
import { act, render, cleanup } from '@utils/test-utils';
import <%= name %>, { <%= name %>Props } from './<%= fileName %>';

describe('<%= name %> Component', () => {
  let promise: Promise<void>;
  let props: <%= name %>Props;

  beforeEach(() => {
    promise = Promise.resolve();
    props = {
      //
    };
  });

  afterEach(cleanup)

  test('should be defined', async () => {
    const { rc } = render(<<%= name %> {...props} />);

    expect(rc).toBeDefined();
    await act(() => promise);
  });
});
