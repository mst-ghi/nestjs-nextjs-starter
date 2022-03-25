import reducer, {
  AuthStateProps,
  TokensType,
  initialState,
  mutateAuthReset,
  mutateRoles,
  mutateTokens,
  mutateUser,
} from '@store/slices/AuthSlice';

describe('Redux, Auth Slice', () => {
  let user: IUser;
  let tokens: TokensType;

  beforeEach(() => {
    user = {
      id: 1,
      email: 'email',
      username: 'username',
      full_name: 'full_name',
      phone_number: 'phone_number',
      verified_email: true,
      type: 0,
      status: 1,
      roles: [
        {
          id: 1,
          title: 'Member user',
          key: 'member',
        },
      ],
    };
    tokens = {
      accessToken: 'access token',
      refreshToken: 'refresh token',
    };
  });

  test('should return the initial state', () => {
    expect(reducer(undefined, { type: typeof initialState })).toEqual(initialState);
  });

  test('should change user info [mutateUser]', () => {
    const nextState: AuthStateProps = {
      ...initialState,
      user,
      isLoggedIn: true,
      isMentor: false,
      isMember: true,
    };
    expect(reducer(initialState, mutateUser(user))).toEqual(nextState);
  });

  test('should change tokens [mutateTokens]', () => {
    const nextState: AuthStateProps = {
      ...initialState,
      ...tokens,
    };
    expect(reducer(initialState, mutateTokens(tokens))).toEqual(nextState);
  });

  test('should change roles flag [mutateRoles]', () => {
    const rolesFlag = {
      isMember: true,
      isMentor: false,
      isAdmin: false,
      isSuperAdmin: false,
    };
    const nextState: AuthStateProps = {
      ...initialState,
      ...rolesFlag,
    };
    expect(reducer(initialState, mutateRoles(rolesFlag))).toEqual(nextState);
  });

  test('should change to reset data [mutateAuthReset]', () => {
    const nextState: AuthStateProps = {
      isLoggedIn: false,
      user: {},
      isMentor: undefined,
      isMember: undefined,
      isAdmin: undefined,
      isSuperAdmin: undefined,
      accessToken: '',
      refreshToken: '',
    };
    expect(reducer(initialState, mutateAuthReset())).toEqual(nextState);
  });
});
