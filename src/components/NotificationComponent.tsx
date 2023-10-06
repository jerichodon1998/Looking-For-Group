import { Timestamp } from "firebase/firestore";
import { Image, StyleSheet, Text, View } from "react-native";
import { TweetInterface } from "../dummyData/dummyTweets";
import React from "react";
interface NotificationComponentProps {
	tweet: TweetInterface;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({
	tweet,
}) => {
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
		<View style={styles.notificationContainer}>
			{renderImage()}
			<View>
				{renderAuthor()}
				{renderDescription()}
				{renderDate()}
			</View>
		</View>
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
		paddingHorizontal: 5,
		paddingVertical: 2,
	},
	authorNameStyle: {
		fontWeight: "bold",
		fontSize: 16,
	},
});

export default React.memo(NotificationComponent);
