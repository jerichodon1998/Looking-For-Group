import { createStackNavigator } from "@react-navigation/stack";
import TopTabNavigator from "./TopTabNavigator";
const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Home" component={TopTabNavigator} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
