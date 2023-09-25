import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./navigators/StackNavigator";

const AppNavigation: React.FC = () => {
	return (
		<NavigationContainer>
			<StackNavigator />
		</NavigationContainer>
	);
};

export default AppNavigation;
