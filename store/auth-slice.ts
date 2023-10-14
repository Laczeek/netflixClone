import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
	id: string;
	email: string;
	username: string;
	avatarName: string;
}

interface AuthStatusType {
	loading: boolean;
	data: null | User;
	error: null | { email?: string; password?: string; username?: string; password2?: string, message?:string };
}

export const authSlice = createSlice({
	name: 'authSlice',
	initialState: {
		authStatus: {
			loading: false,
			data: null,
			error: null,
		} as AuthStatusType,
	},
	reducers: {
		changeAuthStatus(state, action: PayloadAction<AuthStatusType>) {
			state.authStatus = action.payload;
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
