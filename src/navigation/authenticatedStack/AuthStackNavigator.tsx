import { createStackNavigator } from "@react-navigation/stack";
import AuthTopTabNavigator from "./AuthTopTabNavigator";
import FeedItemScreen from "../../screens/FeedItemScreen";
const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={AuthTopTabNavigator} />
			<Stack.Screen
				name="FeedItem"
				component={FeedItemScreen}
				options={{ presentation: "modal" }}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigator;
