import reducer, {
  ConfirmStateProps,
  initialState,
  mutateConfirmData,
  mutateIsConfirmModalOpen,
} from '@store/slices/ConfirmSlice';

describe('Redux, Confirm Slice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: typeof initialState })).toEqual(initialState);
  });

  test('should change confirm info [mutateConfirmData]', () => {
    const confirmData = {
      title: 'test title',
      message: 'test message',
      acceptText: 'Ooh yes',
      rejectText: 'No',
      isCancelable: true,
    };
    const nextState: ConfirmStateProps = {
      ...initialState,
      ...confirmData,
      isConfirmModalOpen: true,
    };
    expect(reducer(initialState, mutateConfirmData({ ...confirmData, isOpen: true }))).toEqual(
      nextState
    );
  });

  test('should change is open flag [mutateIsConfirmModalOpen]', () => {
    const isConfirmModalOpen = true;
    const nextState: ConfirmStateProps = {
      ...initialState,
      isConfirmModalOpen,
    };
    expect(reducer(initialState, mutateIsConfirmModalOpen(isConfirmModalOpen))).toEqual(nextState);
  });
});
