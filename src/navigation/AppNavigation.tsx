import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigators/DrawerNavigator";

const AppNavigation: React.FC = () => {
	return (
		<NavigationContainer>
			<DrawerNavigator />
		</NavigationContainer>
	);
};

export default AppNavigation;
