import { View, StyleSheet, Text } from "react-native";

export interface ErrorMessageComponentProps {
	errorMessage: string;
}

const ErrorMessageComponent: React.FC<ErrorMessageComponentProps> = ({
	errorMessage,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.errorText}>{errorMessage}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		backgroundColor: "white",
		paddingVertical: 2,
		paddingHorizontal: 4,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "red",
		marginVertical: 4,
	},
	errorText: {
		color: "red",
	},
});

export default ErrorMessageComponent;
