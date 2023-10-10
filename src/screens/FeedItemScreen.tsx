import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import {
	useRoute,
	useNavigation,
	ParamListBase,
} from "@react-navigation/native";
import { Timestamp } from "firebase/firestore";
import { useEffect } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

const FeedItemScreen = (): JSX.Element => {
	const route = useRoute();
	// NOTE: fix this warning soon - current known solution is RootStackParamList
	const { tweet } = route.params;
	const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

	useEffect(() => {}, []);

	const renderDate = (): JSX.Element => {
		return (
			<Text style={styles.dateStyle}>
				{Timestamp.now().toDate().toDateString()}
			</Text>
		);
	};

	const renderDescription = (): JSX.Element => {
		return <Text style={styles.descriptionStyle}>{tweet.fullText}</Text>;
	};

	const renderImage = (): JSX.Element => {
		return (
			<Image style={styles.imageStyle} source={{ uri: tweet.author.avatar }} />
		);
	};

	const renderAuthor = (): JSX.Element => {
		return <Text style={styles.authorNameStyle}>{tweet.author.name}</Text>;
	};

	const back = (
		<Pressable onPress={() => navigation.goBack()}>
			<Ionicons name="arrow-back" size={32} color="black" />
		</Pressable>
	);

	return (
		<View style={styles.feedContainer}>
			{back}
			<View style={styles.contentContainer}>
				{renderImage()}
				<View style={styles.feedDetails}>
					{renderAuthor()}
					{renderDescription()}
					{renderDate()}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	feedContainer: {
		paddingHorizontal: 5,
		paddingVertical: 10,
		backgroundColor: "#fff",
		flexDirection: "column",
	},
	contentContainer: {
		marginVertical: 5,
		flexDirection: "row",
	},
	feedDetails: {
		paddingHorizontal: 10,
		paddingVertical: 2,
	},
	imageStyle: {
		width: 75,
		height: 75,
		borderRadius: 50,
	},
	dateStyle: {
		color: "grey",
	},
	descriptionStyle: {
		width: 300,
	},
	authorNameStyle: {
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default FeedItemScreen;
