import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface User {
	id: string;
	email: string;
	username: string;
	avatarName: string;
	queue: string[]
}

export interface ErrorType {
	email?: string;
	password?: string;
	username?: string;
	password2?: string;
	message?: string;
}

interface AuthStatusType {
	loading: boolean;
	data?: null | User;
	error: null | ErrorType;
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
			if ('data' in action.payload) {
				state.authStatus = action.payload;
			} else {
				state.authStatus = {
					data: state.authStatus.data,
					error: action.payload.error,
					loading: action.payload.loading,
				};
			}
		},
	},
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
