import { createStackNavigator } from "@react-navigation/stack";
import AuthTopTabNavigator from "./AuthTopTabNavigator";
const Stack = createStackNavigator();

const StackNavigator = (): JSX.Element => {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={AuthTopTabNavigator} />
		</Stack.Navigator>
	);
};

export default StackNavigator;
