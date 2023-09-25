import { createStackNavigator } from "@react-navigation/stack";
import TopTabNavigator from "./TopTabNavigator";
import { Text } from "react-native";
const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Lookn-4-G" component={TopTabNavigator} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
