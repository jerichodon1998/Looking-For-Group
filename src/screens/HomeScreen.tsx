import { View, ListRenderItem } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { TweetInterface, tweets } from "../dummyData/dummyTweets";
import { useCallback } from "react";
import { FlatList } from "react-native-gesture-handler";
import FeedItemComponent from "../components/FeedItemComponent";
const HomeScreen = (): JSX.Element => {
	const renderItem: ListRenderItem<TweetInterface> = useCallback(
		({ item }) => {
			return <FeedItemComponent tweet={item} />;
		},
		[tweets]
	);

	return (
		<SafeAreaView>
			<View>
				<FlatList
					data={tweets}
					removeClippedSubviews={true}
					initialNumToRender={10}
					renderItem={renderItem}
					windowSize={5}
					keyExtractor={(item) => item.id}
				/>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
