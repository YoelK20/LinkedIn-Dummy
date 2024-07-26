import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "../../screens/HomePage";

const Tab = createBottomTabNavigator()

export function MyTab() {
    return (
        <Tab.Navigator>
             <Tab.Screen name="main" component={HomePage} options={{headerShown: false}} />
        </Tab.Navigator>
    )
}