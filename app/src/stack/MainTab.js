import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import SingUp from '../screens/SignUp';
import SingIn from '../screens/SignIn';
import Home from '../screens/Home';

const Tab = createBottomTabNavigator();

export default  () => {
	return (
		<Tab.Navigator tabBar={props=><CustomTabBar {...props} />}>
			<Tab.Screen name='Home' component={Home} />
			<Tab.Screen name='SingIn' component={SingIn} />
			<Tab.Screen name='SingUp' component={SingUp} />
		</Tab.Navigator>
	)
};