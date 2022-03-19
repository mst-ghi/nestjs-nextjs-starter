import { act, cleanup, render } from '@utils/test-utils';
import Badge, { BadgeProps } from './badge';

describe('Badge Component', () => {
  let promise: Promise<void>;
  let props: BadgeProps;

  beforeEach(() => {
    promise = Promise.resolve();
    props = {
      color: 'success',
      size: 'lg',
      outline: true,
      icon: {
        name: 'star',
      },
    };
  });

  afterEach(cleanup);

  test('should be defined', async () => {
    const { rc } = render(<Badge {...props} />);

    expect(rc).toBeDefined();

    await act(() => promise);
  });

  test('should be visible children', async () => {
    const { getByTestId } = render(
      <Badge {...props} data-testid="my-badge">
        <span data-testid="children-badge">Badge content</span>
      </Badge>
    );

    expect(getByTestId('my-badge')).toBeVisible();
    expect(getByTestId('my-badge')).toHaveClass('badge-success badge-lg badge-outline');
    expect(getByTestId('children-badge')).toBeVisible();
    expect(getByTestId('icon-star')).toBeVisible();

    await act(() => promise);
  });
});
