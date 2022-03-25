import reducer, {
  AppStateProps,
  initialState,
  mutateDirection,
  mutateIsGlobalLoading,
  mutateIsShowSettingDialog,
  mutateTheme,
  mutateVersion,
} from '@store/slices/AppSlice';

describe('Redux, App Slice', () => {
  test('should return the initial state', () => {
    expect(reducer(undefined, { type: typeof initialState })).toEqual(initialState);
  });

  test('should change app version [mutateVersion]', () => {
    const version = 'v1.1.1';
    const nextState: AppStateProps = {
      ...initialState,
      version,
    };
    expect(reducer(initialState, mutateVersion(version))).toEqual(nextState);
  });

  test('should change direction [mutateDirection]', () => {
    const direction = 'rtl';
    const nextState: AppStateProps = {
      ...initialState,
      direction,
    };
    expect(reducer(initialState, mutateDirection(direction))).toEqual(nextState);
  });

  test('should change theme [mutateTheme]', () => {
    const theme = 'dark';
    const nextState: AppStateProps = {
      ...initialState,
      theme,
    };
    expect(reducer(initialState, mutateTheme(theme))).toEqual(nextState);
  });

  test('should change setting dialog flag [mutateIsShowSettingDialog]', () => {
    const isShowSettingDialog = true;
    const nextState: AppStateProps = {
      ...initialState,
      isShowSettingDialog,
    };
    expect(reducer(initialState, mutateIsShowSettingDialog(isShowSettingDialog))).toEqual(
      nextState
    );
  });

  test('should change global loading flag [mutateIsGlobalLoading]', () => {
    const isGlobalLoading = true;
    const nextState: AppStateProps = {
      ...initialState,
      isGlobalLoading,
    };
    expect(reducer(initialState, mutateIsGlobalLoading(isGlobalLoading))).toEqual(nextState);
  });
});
