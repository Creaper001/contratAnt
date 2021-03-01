import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Preload from '../screens/Preload';
import MainTab from '../stack/MainTab';

const Stack = createStackNavigator();

export default () => {
	return (
		<Stack.Navigator 
			initialRouteName='Preload'
			screenOptions={{
				headerShown: false
			}}>
			<Stack.Screen name='Preload' component={Preload} />
			<Stack.Screen name='MainTab' component={MainTab} />
		</Stack.Navigator>
	);
};