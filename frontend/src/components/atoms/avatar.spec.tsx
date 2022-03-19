import { act, cleanup, render } from '@utils/test-utils';
import Avatar, { AvatarProps } from './avatar';

describe('Avatar Component', () => {
  let promise: Promise<void>;
  let props: AvatarProps;

  beforeEach(() => {
    promise = Promise.resolve();
    props = {
      placeholder: 'MostafaGholami',
    };
  });

  afterEach(cleanup);

  test('should be defined', async () => {
    const { rc } = render(<Avatar {...props} />);

    expect(rc).toBeDefined();

    await act(() => promise);
  });

  test('should be visible placeholder', async () => {
    const { getByTestId } = render(<Avatar {...props} />);

    expect(getByTestId(`test-avatar-ph-${props.placeholder}`)).toBeVisible();

    await act(() => promise);
  });

  test('should be visible image', async () => {
    props.src = 'https://bit.ly/3whtNeg';
    const { getByTestId, queryByTestId } = render(<Avatar {...props} />);

    expect(getByTestId(`test-avatar-img-${props.placeholder}`)).toBeVisible();
    expect(queryByTestId(`test-avatar-ph-${props.placeholder}`)).toBeNull();

    await act(() => promise);
  });
});
