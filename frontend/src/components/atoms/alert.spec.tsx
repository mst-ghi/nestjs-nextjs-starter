import { act, cleanup, render } from '@utils/test-utils';
import Alert, { AlertProps } from './alert';

describe('Alert Component', () => {
  let promise: Promise<void>;
  let props: AlertProps;

  beforeEach(() => {
    promise = Promise.resolve();
    props = {
      color: 'success',
      icon: {
        name: 'star',
      },
    };
  });

  afterEach(cleanup);

  test('should be defined', async () => {
    const { rc } = render(<Alert {...props} />);

    expect(rc).toBeDefined();

    await act(() => promise);
  });

  test('should be visible children', async () => {
    const { getByTestId } = render(
      <Alert {...props} data-testid="my-alert">
        <span data-testid="children-alert">Alert content</span>
      </Alert>
    );

    expect(getByTestId('my-alert')).toBeVisible();
    expect(getByTestId('my-alert')).toHaveClass('alert-success');
    expect(getByTestId('children-alert')).toBeVisible();
    expect(getByTestId('icon-star')).toBeVisible();

    await act(() => promise);
  });
});
