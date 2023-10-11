import {
	View,
	Text,
	StyleSheet,
	Image,
	Pressable,
	Modal,
	Button,
} from "react-native";
import { useAppSelector } from "../../redux/app/hooks";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

interface UserProfileUpdateInterface {
	displayName: string | undefined | null;
	photoURL: string | undefined | null;
}

const ProfileScreen = (): JSX.Element => {
	const authStore = useAppSelector((state) => state.auth);
	const [modalVisible, setModalVisible] = useState(false);
	const [userProfileUpdate, setUserProfileUpdate] =
		useState<UserProfileUpdateInterface>({
			displayName: authStore.userData?.displayName,
			photoURL: authStore.userData?.photoURL,
		});

	const myModal = (): JSX.Element => {
		return (
			<Modal visible={modalVisible} transparent={true}>
				<View style={{ backgroundColor: "grey", height: 100 }}>
					<Text>Modal</Text>
					<Button title="close" onPress={() => setModalVisible(false)} />
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

	const openEditModal = () => {
		setModalVisible(true);
	};

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
		alignItems: "flex-end",
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
});

export default ProfileScreen;
