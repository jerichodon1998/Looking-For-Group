import { View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/app/hooks";
import {
	resetAuth,
	userSignup,
} from "../redux/features/authentication/authenticationSlice";
import CredentialForm from "../components/CredentialForm";

const Register = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const [email, onChangeEmailText] = useState("");
	const [password, onChangePasswordText] = useState("");

	const onSubmitCredentials = () => {
		dispatch(userSignup({ email, password }));
	};

	useEffect(() => {
		dispatch(resetAuth());
	}, []);

	return (
		<View style={styles.registerContainer}>
			<CredentialForm
				buttonText="Signup"
				email={email}
				headerText="Signup"
				onChangeEmailText={onChangeEmailText}
				onChangePasswordText={onChangePasswordText}
				onSubmitCredentials={onSubmitCredentials}
				password={password}
			/>
		</View>
	);
};
const styles = StyleSheet.create({
	registerContainer: {
		flex: 1,
		alignItems: "center",
		paddingTop: 70,
	},
});

export default Register;
