import { actHook, cleanupHook, renderHook, screen } from '@utils/test-utils';
import { initialState } from '@store/slices/ConfirmSlice';
import useAlert, { UseAlertReturnType } from './useAlert';

describe('useAlert Hook', () => {
  let promise: Promise<void>;

  beforeEach(() => {
    promise = Promise.resolve();
  });

  afterEach(cleanupHook);

  test('should be mount', async () => {
    const { result, rh: hook } = renderHook<UseAlertReturnType>(useAlert);

    expect(result.error).not.toBeDefined();
    expect(hook.showToast).toBeDefined();
    expect(typeof hook.showToast).toBe('function');
    expect(hook.getConfirm).toBeDefined();
    expect(typeof hook.getConfirm).toBe('function');
    expect(hook.catchToast).toBeDefined();
    expect(typeof hook.getConfirm).toBe('function');
    expect(hook.confirmState).toBeDefined();
    expect(hook.confirmState).toBe(initialState);

    await actHook(() => promise);
  });

  test('should be render getConfirm dialog', async () => {
    const { rh: hook } = renderHook<UseAlertReturnType>(useAlert);

    expect(hook.getConfirm).toBeDefined();

    actHook(() => {
      hook.getConfirm({ title: 'test-confirm' });
    });

    expect(screen.getByTestId('test-confirm-dialog')).toBeVisible();
    expect(screen.getByTestId('test-confirm-dialog-title')).toBeVisible();
    expect(screen.getByTestId('test-confirm-dialog-message')).toBeVisible();

    await actHook(() => promise);
  });
});
