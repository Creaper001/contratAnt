import React from 'react';
import styled from 'styled-components/native';

const InputArea = styled.View`
	width: 100%;
	height: 60px;
	background-color: #FFF;
	flex-direction: row;
	border: 2px solid #C90100;
	border-radius: 30px;
	padding: 0 15px;
	align-items: center;
	margin-bottom: 15px;
`;
const Input = styled.TextInput`
	flex: 1;
	font-size: 16px;
	color: #9E0000;
	margin-left: 10px;
`;

export default ({ IconSvg, placeholder, value, onChangeText, password }) => {
	return (
		<InputArea>
			<IconSvg width='24' height='24' />
			<Input 
				placeholder={placeholder} 
				placeholderTextColor='#9E0000'
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={password}
			/>
		</InputArea>
	);
};