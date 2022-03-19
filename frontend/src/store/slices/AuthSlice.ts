import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface AuthStateProps {
  isLoggedIn: boolean;
  isMentor?: boolean | undefined;
  isMember?: boolean | undefined;
  isAdmin?: boolean | undefined;
  isSuperAdmin?: boolean | undefined;
  user: Partial<IUser>;
  accessToken?: string;
  refreshToken?: string;
}

const initialState = {
  isLoggedIn: false,
  user: {},
} as AuthStateProps;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    mutateUser(state, action: PayloadAction<IUser>) {
      state.user = action.payload;
      state.isMentor = action.payload.type === 1;
      state.isMember = action.payload.type === 0;
      state.isLoggedIn = true;
      const roles = action.payload?.roles;
      if (roles && roles[0]) {
        for (let index = 0; index < roles.length; index++) {
          const role = roles[index];
          if (role.key === 'super-admin') {
            state.isSuperAdmin = true;
          } else if (role.key === 'admin') {
            state.isAdmin = true;
          } else if (role.key === 'mentor') {
            state.isMentor = true;
          } else if (role.key === 'member') {
            state.isMember = true;
          }
        }
      }
    },
    mutateTokens(state, action: PayloadAction<{ accessToken: string; refreshToken?: string }>) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    mutateRoles(
      state,
      {
        payload,
      }: PayloadAction<{
        isMentor?: boolean | undefined;
        isMember?: boolean | undefined;
        isAdmin?: boolean | undefined;
        isSuperAdmin?: boolean | undefined;
      }>
    ) {
      state.isMentor = payload.isMentor;
      state.isMember = payload.isMember;
      state.isAdmin = payload.isAdmin;
      state.isSuperAdmin = payload.isSuperAdmin;
    },
    mutateAuthReset(state) {
      state.isLoggedIn = false;
      state.user = {};
      state.isMentor = undefined;
      state.isMember = undefined;
      state.isAdmin = undefined;
      state.isSuperAdmin = undefined;
      state.accessToken = '';
      state.refreshToken = '';
    },
  },
});

export const authSelector = (state: StoreProps) => state.auth;
export const { mutateUser, mutateTokens, mutateRoles, mutateAuthReset } = authSlice.actions;
export default authSlice.reducer;
