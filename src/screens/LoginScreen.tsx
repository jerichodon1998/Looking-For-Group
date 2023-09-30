import { View, StyleSheet } from "react-native";
import CredentialForm from "../components/CredentialForm";
import { useState, useEffect } from "react";
import { useAppDispatch } from "../redux/app/hooks";
import {
	resetAuth,
	userSignin,
} from "../redux/features/authentication/authenticationSlice";

const Login = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const [email, onChangeEmailText] = useState("");
	const [password, onChangePasswordText] = useState("");

	const onSubmitCredentials = () => {
		dispatch(userSignin({ email, password }));
	};

	useEffect(() => {
		dispatch(resetAuth());
	}, []);

	return (
		<View style={styles.formContainer}>
			<CredentialForm
				buttonText="Signin"
				email={email}
				headerText="Signin"
				onChangeEmailText={onChangeEmailText}
				onChangePasswordText={onChangePasswordText}
				onSubmitCredentials={onSubmitCredentials}
				password={password}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	formContainer: {
		flex: 1,
		alignItems: "center",
		paddingTop: 70,
	},
});

export default Login;
