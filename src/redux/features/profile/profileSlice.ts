// redux toolkit imports
import { createSlice, createAsyncThunk, isAnyOf } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit/";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { FirebaseError } from "firebase/app";
import { UserProfileUpdateInterface } from "../../../screens/profile/ProfileScreen";

interface ProfileState {
	isLoading: boolean;
	isSuccess: ProfileUpdateSuccess | undefined | null;
	error: FirebaseError | NotSignedinError | null | undefined | void;
}

interface ProfileUpdateSuccess {
	message: string;
}

interface NotSignedinError {
	message: string;
}

const initialState: ProfileState = {
	error: null,
	isSuccess: null,
	isLoading: false,
};

export const userUpdateProfile = createAsyncThunk<
	ProfileUpdateSuccess,
	UserProfileUpdateInterface,
	{ rejectValue: FirebaseError | NotSignedinError }
>("users/updateProfile", async (updatedProfile, { rejectWithValue }) => {
	return auth?.currentUser
		? await updateProfile(auth.currentUser, updatedProfile)
				.then(() => {
					// Profile updated!
					// ...
					return {
						message: "Profile Updated Successfully",
					} as ProfileUpdateSuccess;
				})
				.catch((error: FirebaseError) => {
					// An error occurred
					// ...
					return rejectWithValue(error as FirebaseError);
				})
		: rejectWithValue({ message: "User Not Signedin" } as NotSignedinError);
});

const profileSlice = createSlice({
	name: "profile",
	initialState: initialState,
	reducers: {
		resetProfile: (state) => {
			state.error = null;
			state.isSuccess = null;
			state.isLoading = false;
		},
	},
	extraReducers(builder) {
		// fullfilled requests
		builder.addCase(
			userUpdateProfile.fulfilled,
			(state, action: PayloadAction<ProfileUpdateSuccess>) => {
				return {
					...state,
					isLoading: false,
					isSuccess: action.payload,
				};
			}
		);
		// pending requests
		builder.addCase(userUpdateProfile.pending, (state) => {
			return {
				...state,
				isLoading: true,
			};
		});
		// rejected requests
		builder.addCase(
			userUpdateProfile.rejected,
			(
				state,
				action: PayloadAction<FirebaseError | NotSignedinError | void>
			) => {
				return {
					...state,
					error: action.payload,
					isLoading: false,
				};
			}
		);
	},
});

export const { resetProfile } = profileSlice.actions;

export default profileSlice.reducer;
