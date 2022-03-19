import { act, cleanup, render } from '@utils/test-utils';
import Button, { ButtonProps } from './button';

describe('Button Component', () => {
  let promise: Promise<void>;
  let props: ButtonProps;

  beforeEach(() => {
    promise = Promise.resolve();
    props = {
      color: 'success',
      outlined: true,
      icon: {
        name: 'star',
      },
    };
  });

  afterEach(cleanup);

  test('should be defined', async () => {
    const { rc } = render(<Button {...props} />);

    expect(rc).toBeDefined();

    await act(() => promise);
  });

  test('should be visible children', async () => {
    const { getByTestId } = render(
      <Button {...props} data-testid="my-button">
        <span data-testid="children-button">Button content</span>
      </Button>
    );

    expect(getByTestId('my-button')).toBeVisible();
    expect(getByTestId('my-button')).toHaveClass('btn-success btn-outline');
    expect(getByTestId('children-button')).toBeVisible();
    expect(getByTestId('icon-star')).toBeVisible();

    await act(() => promise);
  });

  test('should be visible as link', async () => {
    props.href = '#test-link';
    const { getByTestId, queryByTestId } = render(
      <Button {...props} data-testid="my-button">
        <span data-testid="children-button">Button content</span>
      </Button>
    );

    expect(getByTestId('my-button')).toBeVisible();
    expect(getByTestId('my-button')).toHaveClass('btn-success btn-outline');
    expect(getByTestId('children-button')).toBeVisible();
    expect(queryByTestId('icon-star')).toBeNull();

    await act(() => promise);
  });
});
