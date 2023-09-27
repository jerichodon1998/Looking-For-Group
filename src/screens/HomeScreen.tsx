import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../redux/app/hooks";
import { decrement, increment } from "../redux/features/counter/counterSlice";
const HomeScreen = (): JSX.Element => {
	const dispatch = useAppDispatch();
	const count = useAppSelector((state) => state.counter.value);

	return (
		<SafeAreaView>
			<View>
				<Text>Home</Text>
				<Button
					title="ADD"
					onPress={() => {
						dispatch(increment());
					}}
				/>
				<Button title="Subtract" onPress={() => dispatch(decrement())} />
				<Text>{count}</Text>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
