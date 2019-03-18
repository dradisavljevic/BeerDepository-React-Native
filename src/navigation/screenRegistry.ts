import {RootState} from "../state/store";
import {Navigation} from "react-native-navigation";
import App from "../App";
import {Provider} from "react-redux";
import {Store} from "redux";

export default function registerScreens(store: Store<RootState>) {
  Navigation.registerComponentWithRedux('navigation.playground.WelcomeScreen', () => App, Provider, store);
}
