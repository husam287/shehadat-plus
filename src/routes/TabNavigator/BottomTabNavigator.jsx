import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Metrics from 'constants/Metrics';
import HomeScreen from 'screens/HomeScreen';
import CalenderScreen from 'screens/CalenderScreen';
import ProfileScreen from 'screens/ProfileScreen';
import RouterOption from '../HeaderOptions/RouterOption';
import TapbarComponent from '../HeaderOptions/TapbarComponent';

const TABWIDTH = Metrics.screenWidth / 3;

function HomeTabBarElement({ focused }) {
  return (
    <TapbarComponent
      title=""
      iconName="home"
      isFocused={focused}
      tabWidth={TABWIDTH}
    />
  );
}

function CalenderTabBarElement({ focused }) {
  return (
    <TapbarComponent
      title=""
      iconName="date"
      isFocused={focused}
      tabWidth={TABWIDTH}
    />
  );
}

function ProfileTabBarElement({ focused }) {
  return (
    <TapbarComponent
      title=""
      iconName="user"
      isFocused={focused}
      tabWidth={TABWIDTH}
    />
  );
}

const BottomTab = createBottomTabNavigator();

export default function BottomNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={() => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          height: Metrics.bottomTabsHeight,
          elevation: 0,
        },
      })}
    >
      {/* Home  */}
      <BottomTab.Screen
        name="Home"
        options={({ navigation }) => RouterOption({
          navigation,
          title: 'Home',
          tabBarIcon: HomeTabBarElement,
        })}
        component={HomeScreen}
      />

      {/* Profile  */}
      <BottomTab.Screen
        name="Profile"
        options={({ navigation }) => RouterOption({
          navigation,
          title: 'Calender',
          tabBarIcon: CalenderTabBarElement,
        })}
        component={CalenderScreen}
      />

      {/* Courses */}
      <BottomTab.Screen
        name="Courses"
        options={({ navigation }) => RouterOption({
          navigation,
          title: 'Courses',
          tabBarIcon: ProfileTabBarElement,
        })}
        component={ProfileScreen}
      />
    </BottomTab.Navigator>
  );
}
