import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	Modal,
	TextInput,
} from "react-native";
import { useAppDispatch, useAppSelector } from "../../redux/app/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import {
	resetProfile,
	userUpdateProfile,
} from "../../redux/features/profile/profileSlice";
import ErrorMessageComponent from "../../components/ErrorMessageComponent";

export interface UserProfileUpdateInterface {
	displayName: string | undefined | null;
	photoURL: string | undefined | null;
}

const ProfileScreen = (): JSX.Element => {
	const authStore = useAppSelector((state) => state.auth);
	const profileStore = useAppSelector((state) => state.profile);
	const dispatch = useAppDispatch();
	const [modalVisible, setModalVisible] = useState(false);
	const [userProfileUpdate, setUserProfileUpdate] =
		useState<UserProfileUpdateInterface>({
			displayName: authStore.userData?.displayName,
			photoURL: authStore.userData?.photoURL,
		});

	const openEditModal = () => setModalVisible(true);
	const closeEditModal = () => {
		setUserProfileUpdate({
			displayName: authStore.userData?.displayName,
			photoURL: authStore.userData?.photoURL,
		});
		setModalVisible(false);
	};
	const onSaveEditModal = () => {
		dispatch(resetProfile());
		dispatch(userUpdateProfile(userProfileUpdate)).then(() => {
			setModalVisible(false);
		});
	};

	// NOTE: Refactor this as a reusable component
	const myModal = (): JSX.Element => {
		return (
			<Modal
				statusBarTranslucent={true}
				visible={modalVisible}
				transparent={true}
				animationType="slide"
				onRequestClose={closeEditModal}
			>
				<View style={styles.modalStyle}>
					<View style={styles.modalContentStyle}>
						<View style={styles.modalHeaderContainer}>
							<Text style={styles.modalHeaderText}>Edit Profile</Text>
						</View>
						<View style={styles.modalInputContainer}>
							<Text>Name:</Text>
							<TextInput
								style={styles.modalTextInput}
								onChangeText={(text) =>
									setUserProfileUpdate((prevState) => {
										return {
											...prevState,
											displayName: text,
										};
									})
								}
								value={userProfileUpdate.displayName || ""}
							/>
						</View>
						{profileStore.error ? (
							<ErrorMessageComponent
								errorMessage={profileStore.error?.message}
							/>
						) : null}
						<View style={styles.modalBtnContainer}>
							<Pressable style={styles.modalBtn} onPress={onSaveEditModal}>
								<Ionicons name="checkmark-circle" size={18} color="green" />
								<Text>Save</Text>
							</Pressable>
							<Pressable style={styles.modalBtn} onPress={closeEditModal}>
								<Ionicons name="close-circle" size={18} color="red" />
								<Text>Cancel</Text>
							</Pressable>
						</View>
					</View>
				</View>
			</Modal>
		);
	};

	const renderDisplayNameOrEmail = (): JSX.Element => {
		if (authStore.userData?.displayName) {
			return (
				<Text style={styles.headerTextStyle}>
					{authStore.userData?.displayName}
				</Text>
			);
		} else {
			return (
				<Text style={styles.headerTextStyle}>{authStore.userData?.email}</Text>
			);
		}
	};
	const renderPhotoOrIcon = (): JSX.Element => {
		if (authStore.userData?.photoURL) {
			return (
				<Image
					source={{ uri: authStore.userData.photoURL }}
					style={styles.imageStyle}
				/>
			);
		} else {
			return (
				<Ionicons
					style={styles.iconStyle}
					name="person-circle"
					size={100}
					color="black"
				/>
			);
		}
	};

	useEffect(() => {
		dispatch(resetProfile());
	}, [dispatch]);

	return (
		<View style={styles.profileContainer}>
			{myModal()}
			<View style={styles.headerContainer}>
				<View style={styles.headerDetailsContainer}>
					<View style={styles.imageContainer}>{renderPhotoOrIcon()}</View>
					{renderDisplayNameOrEmail()}
				</View>
				<Pressable onPress={openEditModal}>
					<Ionicons
						style={styles.iconStyle}
						name="pencil"
						size={24}
						color="black"
					/>
				</Pressable>
			</View>
			<View style={styles.bioContainer}>
				<Text style={styles.bioTextStyle}>BIO</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	profileContainer: {
		marginHorizontal: 10,
		marginVertical: 20,
		paddingHorizontal: 10,
		paddingVertical: 20,
		flex: 1,
		backgroundColor: "white",
	},
	headerContainer: {
		paddingBottom: 10,
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBlockColor: "grey",
		flexDirection: "row",
		justifyContent: "space-between",
	},
	headerDetailsContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	headerTextStyle: {
		fontWeight: "bold",
		fontSize: 16,
		marginBottom: 20,
	},
	iconStyle: {
		marginBottom: 20,
		marginLeft: 5,
	},
	imageContainer: {
		marginRight: 10,
	},
	imageStyle: {
		width: 100,
		height: 100,
		borderRadius: 50,
	},
	bioContainer: {
		minHeight: 200,
		width: "auto",
		borderRadius: 10,
		backgroundColor: "#D3D3D3",

		paddingHorizontal: 10,
		paddingVertical: 20,

		// shadow effect
		shadowColor: "#000",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 5,
	},
	bioTextStyle: {
		fontSize: 16,
	},
	modalStyle: {
		flex: 1,
		backgroundColor: "rgba(128,128,128, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	},
	modalContentStyle: {
		backgroundColor: "white",
		borderColor: "grey",
		borderWidth: 0.8,
		borderRadius: 10,
		paddingHorizontal: 15,
		paddingVertical: 8,
		width: "70%",

		// shadow effect
		shadowColor: "#000",
		shadowOffset: { width: -2, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 5,
		elevation: 5,
	},
	modalHeaderContainer: {
		alignItems: "center",
	},
	modalHeaderText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	modalInputContainer: {},
	modalTextInput: {
		borderColor: "grey",
		borderRadius: 5,
		borderWidth: 1,
		marginVertical: 10,
	},
	modalBtnContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	modalBtn: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderColor: "grey",
		borderWidth: 1,
		width: 80,
	},
});

export default ProfileScreen;
