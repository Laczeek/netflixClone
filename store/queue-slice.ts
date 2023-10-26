import { Production } from '@prisma/client';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const queueSlice = createSlice({
	name: 'queueSlice',
	initialState: {
		queue: [] as Production[],
		isLoading: false,
	},
	reducers: {
		changeQueue(state, action: PayloadAction<{ queue: Production[]; isLoading: boolean }>) {
			state.queue = action.payload.queue;
			state.isLoading = action.payload.isLoading;
		},
		addToQueue(state, action: PayloadAction<Production>) {
			state.queue.push(action.payload);
		},
		removeFromQueue(state, action: PayloadAction<string>) {
			const newQueue = state.queue.filter(production => production.id !== action.payload);
			state.queue = newQueue;
		},
	},
});

export const queueActions = queueSlice.actions;
export default queueSlice.reducer;
