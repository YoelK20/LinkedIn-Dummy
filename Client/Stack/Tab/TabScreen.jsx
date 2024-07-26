import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomePage } from "../../screens/HomePage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ProfilePage } from "../../screens/ProfilePage";
import { SearchUser } from "../../screens/SearchUser";
import AddPostForm from "../../screens/AddPost";
const Tab = createBottomTabNavigator();

export function MyTab() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name == "Profile") {
            iconName = focused
              ? "person-circle-sharp"
              : "person-circle-outline";
          } else if (route.name == "Search") {
            iconName = focused
              ? "search-circle-sharp"
              : "search-circle-outline";
          } else if (route.name == "Add") {
            iconName = focused ? "add-circle-sharp" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1B75BB",
        tabBarInActiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomePage}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Search"
        component={SearchUser}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add"
        component={AddPostForm}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfilePage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
