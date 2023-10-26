import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth-slice';
import queueReducer from './queue-slice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		queue: queueReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
