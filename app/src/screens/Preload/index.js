import React, { useEffect } from 'react';
import { Container, LoadingIcon } from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import LogoContratAnt from '../../assets/contratAnt.svg';
import Api from '../../services/api';

export default () => {
	const navigation = useNavigation();

	useEffect(() => {
		const checkToken = async () => {
			const token = await AsyncStorage.getItem('token');
			if (token !== null) {
				let json = await Api.checkToken(token);
				if (json.token) {
					await AsyncStorage.setItem('token', json.token);

					userDispatch({
						type: 'setImage',
						payload: {
							image: json.data.image
						}
					});
				}
			}

			navigation.reset({
				routes: [{ name: 'MainTab' }]
			});
		};
		checkToken();
	}, []);

	return (
		<Container>
			<LogoContratAnt width='100%' height='160' />
			<LoadingIcon size='large' color='#9E0000' />
		</Container>
	);
};
