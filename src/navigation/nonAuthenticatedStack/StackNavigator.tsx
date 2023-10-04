import { createStackNavigator } from "@react-navigation/stack";
import TopTabNavigator from "./TopTabNavigator";
const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator>
			<Stack.Screen name="Lookn-4-Group" component={TopTabNavigator} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
