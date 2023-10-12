import { configureStore } from "@reduxjs/toolkit";
import { ENV } from "@env";
import authenticationSlice from "../features/authentication/authenticationSlice";
import profileSlice from "../features/profile/profileSlice";
export const store = configureStore({
	reducer: {
		auth: authenticationSlice,
		profile: profileSlice,
	},
	devTools: ENV !== "production",
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
