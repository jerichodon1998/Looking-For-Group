import React from "react";
import { Timestamp } from "firebase/firestore";
import { Image, StyleSheet, Text, View, Pressable } from "react-native";
import { TweetInterface } from "../dummyData/dummyTweets";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
interface FeedItemComponentProps {
	tweet: TweetInterface;
}

const FeedItemComponent: React.FC<FeedItemComponentProps> = ({ tweet }) => {
	const navigation = useNavigation<StackNavigationProp<ParamListBase>>();

	const navigateToFeedItem = () => {
		navigation.navigate("FeedItem", { tweet });
	};

	const renderDate = (): JSX.Element => {
		return (
			<Text style={styles.dateStyle}>
				{Timestamp.now().toDate().toDateString()}
			</Text>
		);
	};

	const renderDescription = (): JSX.Element => {
		const maxStringLength = 100;
		if (tweet.fullText.length > maxStringLength) {
			return (
				<Text style={styles.descriptionStyle}>
					{tweet.fullText.substring(0, maxStringLength)}...
				</Text>
			);
		} else {
			return <Text style={styles.descriptionStyle}>{tweet.fullText}</Text>;
		}
	};

	const renderImage = (): JSX.Element => {
		return (
			<Image style={styles.imageStyle} source={{ uri: tweet.author.avatar }} />
		);
	};

	const renderAuthor = (): JSX.Element => {
		return <Text style={styles.authorNameStyle}>{tweet.author.name}</Text>;
	};

	return (
		<Pressable onPress={navigateToFeedItem}>
			<View style={styles.notificationContainer}>
				{renderImage()}
				<View style={styles.feedDetails}>
					{renderAuthor()}
					{renderDescription()}
					{renderDate()}
				</View>
			</View>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	notificationContainer: {
		backgroundColor: "#fff",
		marginVertical: 5,
		paddingHorizontal: 5,
		paddingVertical: 10,
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

export default React.memo(FeedItemComponent);
