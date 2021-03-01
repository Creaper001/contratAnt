import React, { useState, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import { 
	Container,
	InputArea,
	CustomButton,
	CustomButtonText
} from './styles';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import Api from '../../services/api';

import LogoContratAnt from '../../assets/contratAnt.svg';
import SvgEmail from '../../assets/email.svg';
import SvgPassword from '../../assets/password.svg';

import InputIcon from '../../components/InputIcon';

export default () => {
	const navigation = useNavigation();
	const { dispatch: userDispatch } = useContext(UserContext);

	const [emailField, setEmailField] = useState('');
	const [passwordField, setPasswordField] = useState('');

	const handlerSignClick = async () => {
		if (emailField !== '' && passwordField !== '') {
			let json = await Api.signin(emailField, passwordField);
			if (json.token) {
				await AsyncStorage.setItem('token', json.token);

				userDispatch({
					type: 'setImage',
					payload: {
						image: json.data.image
					}
				});

				navigation.navegate('Home');
			} else {
				alert("Email e/ou Senha Invalido(s)")
			}
		} else {
			alert("Preencha os Campos")
		}
	};

	return (
		<Container>
			<LogoContratAnt width='100%' height='160' />
			<InputArea>
				<InputIcon 
					IconSvg={SvgEmail}
					placeholder='Email'
					value={emailField}
					onChangeText={t => setEmailField(t)}
				/>
				<InputIcon 
					IconSvg={SvgPassword}
					placeholder='Senha'
					value={passwordField}
					onChangeText={t => setPasswordField(t)}
					password={true}
				/>

				<CustomButton onPress={handlerSignClick}>
					<CustomButtonText>Entrar</CustomButtonText>
				</CustomButton>
			</InputArea>
		</Container>
	);
};
