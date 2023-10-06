import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import NotificationComponent from "../components/NotificationComponent";
import { TweetInterface, tweets } from "../dummyData/dummyTweets";
import { useCallback } from "react";

// TODO: Warning resolved, but still fix unnecessary rerendering on list

const NotificationsScreen: React.FC = () => {
	const renderItem: ListRenderItem<TweetInterface> = useCallback(
		({ item }) => {
			return <NotificationComponent tweet={item} />;
		},
		[tweets]
	);

	return (
		<View>
			<Text style={styles.header}>Notifications</Text>
			<FlatList
				data={tweets}
				removeClippedSubviews={true}
				initialNumToRender={10}
				renderItem={renderItem}
				windowSize={5}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	header: {
		fontWeight: "bold",
		fontSize: 32,
		marginHorizontal: 10,
	},
});

export default NotificationsScreen;
