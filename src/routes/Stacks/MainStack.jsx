import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import React from 'react';
import BottomNavigator from 'routes/TabNavigator/BottomTabNavigator';
import AddShehadaScreen from 'screens/AddShehadaScreen';
import CollectInterestsScreen from 'screens/CollectInterestsScreen';
import EditOwners from 'screens/EditOwners';
import ShehadaDetails from 'screens/ShehadaDetails';
import TestScreen from 'screens/TestScreen';
import RouterOption from '../HeaderOptions/RouterOption';

const Stack = createStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator>
      {/* MAIN SCREENS */}
      <Stack.Group>
        <Stack.Screen
          name="HomeStack"
          component={BottomNavigator}
          options={({ navigation }) => RouterOption({ navigation })}
        />
        <Stack.Screen
          name="testScreen"
          component={TestScreen}
          options={({ navigation }) => RouterOption({ navigation, title: 'Test screen' })}
        />
        <Stack.Screen
          name="shehadaDetails"
          component={ShehadaDetails}
          options={({ navigation }) => RouterOption({ navigation, title: 'Shehada Details' })}
        />
        <Stack.Screen
          name="addShehada"
          component={AddShehadaScreen}
          options={({ navigation }) => ({
            ...RouterOption({ navigation, title: 'Add New Shehada', isModal: true }),
            ...TransitionPresets.ModalSlideFromBottomIOS,
          })}
        />
        <Stack.Screen
          name="editOwners"
          component={EditOwners}
          options={({ navigation }) => RouterOption({ navigation, title: 'Edit Owners' })}
        />
        <Stack.Screen
          name="collectInterestsScreen"
          component={CollectInterestsScreen}
          options={({ navigation }) => ({
            ...RouterOption({ navigation, title: 'Collect Money', isModal: true }),
            ...TransitionPresets.ModalSlideFromBottomIOS,
          })}
        />
      </Stack.Group>

      {/* AUTH SCREENS */}
      <Stack.Group />
    </Stack.Navigator>
  );
}
