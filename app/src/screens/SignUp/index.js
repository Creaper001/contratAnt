import React, { useState } from 'react';
import { 
	Container,
	InputArea,
	CustomButton,
	CustomButtonText
} from './styles';

import LogoContratAnt from '../../assets/contratAnt.svg';

import SvgName from '../../assets/name.svg';
import SvgEmail from '../../assets/email.svg';
import SvgPassword from '../../assets/password.svg';

import InputIcon from '../../components/InputIcon';

export default () => {
	const [nameField, setNameField] = useState('');
	const [emailField, setEmailField] = useState('');
	const [passwordField, setPasswordField] = useState('');
	const [confirmPasswordField, setConfirmPasswordField] = useState('');

	const handlerSignNext = () => {

	};

	return (
		<Container>
			<LogoContratAnt width='100%' height='160' />
			<InputArea>
				<InputIcon 
					IconSvg={SvgName}
					placeholder='Nome'
					value={nameField}
					onChangeText={t => setNameField(t)}
				/>
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
				<InputIcon 
					IconSvg={SvgPassword}
					placeholder='Confirmar senha'
					value={confirmPasswordField}
					onChangeText={t => setConfirmPasswordField(t)}
					password={true}
				/>

				<CustomButton onPress={handlerSignNext}>
					<CustomButtonText>Cadastrar</CustomButtonText>
				</CustomButton>
			</InputArea>
		</Container>
	);
};
