import "react-native-gesture-handler";
import AppNavigation from "./src/navigation/AppNavigation";
import { Provider } from "react-redux";
import { store } from "./src/redux/app/store";

export default function App() {
	return (
		<Provider store={store}>
			<AppNavigation />
		</Provider>
	);
}
