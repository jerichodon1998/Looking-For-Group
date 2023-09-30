// redux toolkit imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/";

// firebase auth imports
import {
	UserCredential,
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
	signOut,
	AuthError,
} from "firebase/auth";
import type { User } from "firebase/auth";
import { UserCredentialInterface } from "../../../interfaces/UserCredential";
import { auth } from "../../../firebase/firebaseConfig";

// local interfaces
export interface AuthenticationState {
	isLoggedIn: boolean;
	isLoading: boolean;
	userData: User | null | void;
	error: AuthError | null | void | undefined;
}

interface SuccessLogout {
	message: string;
	isSuccess: boolean;
}

const initialState: AuthenticationState = {
	isLoggedIn: false,
	isLoading: false,
	userData: null,
	error: null,
};

export const userSignin = createAsyncThunk<
	User,
	UserCredentialInterface,
	{ rejectValue: AuthError }
>("users/signin", async (userCredential, thunkApi) => {
	const { email, password } = userCredential;
	return await signInWithEmailAndPassword(auth, email, password)
		.then((userCredential: UserCredential): User => {
			// Signed in
			const user = userCredential.user;
			return user;
		})
		.catch((error: AuthError) => {
			return thunkApi.rejectWithValue(error);
		});
});

export const userSignup = createAsyncThunk<
	User,
	UserCredentialInterface,
	{ rejectValue: AuthError }
>("users/signup", async (userCredential, { rejectWithValue }) => {
	const { email, password } = userCredential;
	return await createUserWithEmailAndPassword(auth, email, password)
		.then((userCredential): User => {
			// Signed in
			const user = userCredential.user;
			return user;
		})
		.catch((error: AuthError) => {
			return rejectWithValue(error);
		});
});

export const userLogout = createAsyncThunk<
	SuccessLogout,
	void,
	{ rejectValue: AuthError }
>("users/logout", async (_, { rejectWithValue }) => {
	const auth = getAuth();
	return await signOut(auth)
		.then(() => {
			const successLogout: SuccessLogout = {
				isSuccess: true,
				message: "Logged out successfully",
			};
			return successLogout;
		})
		.catch((error: AuthError) => {
			return rejectWithValue(error);
		});
});

const authenticationSlice = createSlice({
	name: "authentication",
	initialState,
	reducers: {
		resetAuth: (state) => {
			state.isLoggedIn = false;
			state.isLoading = false;
			state.userData = null;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		// fullfilled requests
		builder.addCase(userLogout.fulfilled, (state) => {
			return {
				...state,
				isLoading: false,
				isLoggedIn: false,
				error: null,
				userData: null,
			};
		});
		builder.addMatcher(
			isAnyOf(userSignin.fulfilled, userSignup.fulfilled),
			(state, action: PayloadAction<User>) => {
				state.userData = action.payload;
				state.isLoading = false;
				state.isLoggedIn = true;
			}
		);

		// pending requests
		builder.addMatcher(
			isAnyOf(userSignin.fulfilled, userSignup.fulfilled),
			(state) => {
				state.isLoading = true;
			}
		);

		// rejected requests
		builder.addMatcher(
			isAnyOf(userSignin.rejected, userSignup.rejected, userLogout.rejected),
			// future improvement: find a way to implement this without the undefined
			(state, action: PayloadAction<AuthError | void>) => {
				state.isLoading = false;
				state.error = action.payload;
			}
		);
	},
});

export const { resetAuth } = authenticationSlice.actions;

export default authenticationSlice.reducer;
