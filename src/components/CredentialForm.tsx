import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ErrorMessageComponent from "./ErrorMessageComponent";
import { useAppSelector } from "../redux/app/hooks";

interface authenticationFormProps {
	email: string;
	onChangeEmailText: React.Dispatch<React.SetStateAction<string>>;
	password: string;
	onChangePasswordText: React.Dispatch<React.SetStateAction<string>>;
	onSubmitCredentials: () => void;
	headerText: string;
	buttonText: string;
}

const AuthenticationForm: React.FC<authenticationFormProps> = ({
	email,
	onChangeEmailText,
	onChangePasswordText,
	onSubmitCredentials,
	password,
	buttonText,
	headerText,
}) => {
	const authStore = useAppSelector((state) => state.auth);
	const [hidePassword, setHidePassword] = useState(true);

	const togglePassword = () => {
		return hidePassword ? (
			<Pressable onPress={() => setHidePassword(false)}>
				<Ionicons name="eye-off" size={24} color="black" />
			</Pressable>
		) : (
			<Pressable onPress={() => setHidePassword(true)}>
				<Ionicons name="eye" size={24} color="black" />
			</Pressable>
		);
	};

	return (
		<View style={styles.formCard}>
			<View style={styles.headerContainer}>
				<Text style={styles.headerTitle}>{headerText}</Text>
			</View>
			<TextInput
				style={styles.inputTextStyle}
				onChangeText={onChangeEmailText}
				value={email}
				textContentType="emailAddress"
				placeholder="Email"
			/>
			<View style={{ ...styles.passwordInputStyle }}>
				<TextInput
					style={{ flex: 4 }}
					onChangeText={onChangePasswordText}
					placeholder="Password"
					value={password}
					textContentType="password"
					secureTextEntry={hidePassword}
				/>
				{togglePassword()}
			</View>
			{authStore?.error?.message ? (
				<ErrorMessageComponent errorMessage={authStore.error.message} />
			) : null}
			<Pressable
				style={{
					...styles.submitBtn,
					backgroundColor:
						email.length > 0 && password.length > 0
							? "#007AFF"
							: "rgba(0,0,0,0.5)",
				}}
				android_ripple={{ color: "rgba(0,0,0,0.5)", foreground: true }}
				onPress={onSubmitCredentials}
				disabled={email.length > 0 && password.length > 0 ? false : true}
			>
				<Text style={styles.submitBtnText}>{buttonText}</Text>
			</Pressable>
		</View>
	);
};
const styles = StyleSheet.create({
	formCard: {
		width: "70%",
		backgroundColor: "grey",
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 20,
	},
	inputTextStyle: {
		backgroundColor: "white",
		borderRadius: 10,
		paddingVertical: 2,
		paddingHorizontal: 8,
		margin: 8,
	},
	passwordInputStyle: {
		flexDirection: "row",
		justifyContent: "space-between",
		backgroundColor: "white",
		borderRadius: 10,
		paddingVertical: 2,
		paddingHorizontal: 8,
		margin: 8,
	},
	headerTitle: {
		fontSize: 32,
		margin: "auto",
	},
	headerContainer: {
		alignItems: "center",
	},
	submitBtn: {
		alignItems: "center",
		borderRadius: 10,
		backgroundColor: "#007AFF",
		paddingVertical: 2,
		paddingHorizontal: 8,
		marginHorizontal: 8,
		marginVertical: 4,
	},
	submitBtnText: {
		fontSize: 18,
		color: "white",
	},
});

export default AuthenticationForm;
